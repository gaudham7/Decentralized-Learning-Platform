import os
import json
import mimetypes
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse
from datetime import datetime

from backend import node, modules, token, peers, log

FRONTEND_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "frontend")


def utf8_bytes(obj) -> int:
    """Return the real UTF-8 byte length of a JSON-serialised object."""
    return len(json.dumps(obj, separators=(',', ':')).encode('utf-8'))


def build_full_profile_size(topic: str, level: int) -> int:
    """
    Build a realistic student profile object and measure its actual byte size.
    This is what a naive (non-privacy-preserving) system would transmit.
    """
    import hashlib, time
    fake_profile = {
        "student_id":           "usr_" + hashlib.sha256(str(time.time()).encode()).hexdigest()[:16],
        "username":             "student_example",
        "email":                "student@example.com",
        "grade":                10,
        "school":               "Example High School",
        "topic":                topic,
        "questions_attempted":  5,
        "correct_answers":      level,
        "wrong_answers":        5 - level,
        "accuracy_percent":     round((level / 5) * 100, 2),
        "time_spent_seconds":   142,
        "difficulty_level":     level,
        "session_id":           hashlib.sha256(b"session").hexdigest()[:32],
        "device_fingerprint":   hashlib.sha256(b"device").hexdigest()[:32],
        "ip_address":           "192.168.1.42",
        "learning_history":     [
            {
                "date":     "2025-01-{:02d}T10:00:00Z".format(i + 1),
                "topic":    ["mathematics","science","language","history","computing"][i % 5],
                "score":    60 + i * 4,
                "duration": 180 + i * 12,
            }
            for i in range(10)
        ],
        "preferences":  {"language": "en", "theme": "dark", "notifications": True},
        "created_at":   "2024-09-01T00:00:00Z",
        "last_active":  datetime.utcnow().isoformat() + "Z",
    }
    return utf8_bytes(fake_profile)


# Estimated HTTP request headers overhead (method line + common headers)
HTTP_HEADER_OVERHEAD = 180


class EduLiftHandler(BaseHTTPRequestHandler):

    def log_message(self, format, *args):
        ts = datetime.now().strftime("%H:%M:%S")
        print(f"  [{ts}] {args[0]} {args[1]} {args[2]}")

    def _send_cors(self):
        self.send_header("Access-Control-Allow-Origin",  "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, X-Node-ID")
        self.send_header("X-Node-ID",   node.NODE_ID)
        self.send_header("X-Node-Port", str(node.NODE_PORT))

    def _json(self, status: int, payload: dict):
        body = json.dumps(payload, indent=2).encode()
        self.send_response(status)
        self.send_header("Content-Type",   "application/json")
        self.send_header("Content-Length", str(len(body)))
        self._send_cors()
        self.end_headers()
        self.wfile.write(body)

    def _read_body(self) -> dict:
        length = int(self.headers.get("Content-Length", 0))
        if length == 0:
            return {}
        raw = self.rfile.read(length)
        try:
            return json.loads(raw)
        except Exception:
            return {}

    def _serve_static(self, path) -> bool:
        file_path = os.path.join(FRONTEND_DIR, "index.html") if path in ("", "/") else os.path.join(FRONTEND_DIR, path.lstrip("/"))
        if os.path.isfile(file_path):
            mime, _ = mimetypes.guess_type(file_path)
            mime = mime or "application/octet-stream"
            with open(file_path, "rb") as f:
                body = f.read()
            self.send_response(200)
            self.send_header("Content-Type",   mime)
            self.send_header("Content-Length", str(len(body)))
            self._send_cors()
            self.end_headers()
            self.wfile.write(body)
            return True
        return False

    def do_OPTIONS(self):
        self.send_response(204)
        self._send_cors()
        self.end_headers()

    def do_GET(self):
        path = urlparse(self.path).path
        api_prefixes = ("/request", "/modules", "/log", "/peers", "/node")
        is_api = any(path.rstrip("/") == p or path.startswith(p + "/") for p in api_prefixes)

        if path.rstrip("/") == "":
            self._json(200, node.get_node_info(
                peers.get_peer_count(),
                log.get_log_count(),
                len(modules.MODULES),
                modules.TOTAL_KB
            ))
            return

        if not is_api:
            if self._serve_static(path):
                return

        path = path.rstrip("/")

        if path == "":
            self._json(200, node.get_node_info(
                peers.get_peer_count(),
                log.get_log_count(),
                len(modules.MODULES),
                modules.TOTAL_KB
            ))

        elif path == "/modules":
            self._json(200, {
                "modules":  modules.MODULES,
                "total_kb": modules.TOTAL_KB,
                "node_id":  node.NODE_ID
            })

        elif path == "/log":
            self._json(200, {
                "log":       log.get_log(),
                "count":     log.get_log_count(),
                "node_id":   node.NODE_ID,
                "guarantee": "no student identity, raw score, or assessment detail is stored"
            })

        elif path == "/log/clear":
            cleared = log.clear_log()
            self._json(200, {"cleared": cleared, "node_id": node.NODE_ID})

        elif path == "/peers":
            self._json(200, {
                "this_node": node.NODE_ID,
                "peers":     peers.get_peers(),
                "count":     peers.get_peer_count()
            })

        elif path == "/node/info":
            self._json(200, node.get_node_detail(
                peers.get_peer_count(),
                len(modules.MODULES),
                modules.TOTAL_KB
            ))

        else:
            self._json(404, {"error": "not found", "path": path})

    def do_POST(self):
        path = urlparse(self.path).path.rstrip("/")

        # ── Measure the REAL incoming request body size ──────────────
        raw_content_length = int(self.headers.get("Content-Length", 0))

        body = self._read_body()

        if path == "/request":
            tok          = body.get("token",       "")
            topic_bucket = int(body.get("topicBucket", -1))
            level_bucket = int(body.get("levelBucket", -1))
            timestamp    = int(body.get("timestamp",    0))
            nonce        = body.get("nonce",        "")

            if not (0 <= topic_bucket <= 4 and 1 <= level_bucket <= 5):
                self._json(400, {"error": "invalid bucket values"})
                return
            if not tok:
                self._json(400, {"error": "missing token"})
                return

            # ── Real byte measurements ─────────────────────────────
            # The exact wire payload the server received (JSON body only)
            received_payload = {
                "token":       tok,
                "topicBucket": topic_bucket,
                "levelBucket": level_bucket,
                "timestamp":   timestamp,
                "nonce":       nonce,
            }
            request_json_bytes  = utf8_bytes(received_payload)   # compact JSON
            request_total_bytes = raw_content_length if raw_content_length > 0 else request_json_bytes

            # Full profile a naive system would require
            full_profile_bytes = build_full_profile_size(
                modules.TOPIC_NAMES[topic_bucket] if 0 <= topic_bucket < len(modules.TOPIC_NAMES) else "unknown",
                level_bucket
            )

            savings_pct = round((full_profile_bytes - request_json_bytes) / full_profile_bytes * 100, 1)

            verification = token.verify_token(tok, topic_bucket, level_bucket, timestamp, nonce)
            matched      = modules.get_modules(topic_bucket, level_bucket)

            entry = log.add_entry(tok, topic_bucket, level_bucket, timestamp, nonce, node.NODE_ID, len(matched))

            print(f"  [PROTOCOL] bucket={topic_bucket}/{level_bucket} "
                  f"token={tok[:10]}... modules={len(matched)} "
                  f"body={request_json_bytes}B full_profile={full_profile_bytes}B "
                  f"savings={savings_pct}% "
                  f"token_sha256={entry['token_sha256']}")

            self._json(200, {
                "ok":           True,
                "node_id":      node.NODE_ID,
                "modules":      matched,
                "module_count": len(matched),
                "verification": verification,
                "bandwidth": {
                    # JSON body bytes (what actually travelled as payload)
                    "request_json_bytes":    request_json_bytes,
                    "request_json_display":  f"{request_json_bytes} B",

                    # Full HTTP request including headers
                    "request_total_bytes":   request_total_bytes + HTTP_HEADER_OVERHEAD,
                    "request_total_display": f"{request_total_bytes + HTTP_HEADER_OVERHEAD} B",

                    # Raw Content-Length from the actual HTTP request
                    "raw_content_length":    raw_content_length,

                    # What a naive system would send
                    "full_profile_bytes":    full_profile_bytes,
                    "full_profile_display":  (
                        f"{full_profile_bytes} B"
                        if full_profile_bytes < 1024
                        else f"{full_profile_bytes / 1024:.1f} KB"
                    ),

                    # Catalog
                    "catalog_kb":      modules.TOTAL_KB,
                    "catalog_display": f"{modules.TOTAL_KB} KB",

                    # Savings
                    "savings_percent":        savings_pct,
                    "savings_percent_display": f"{savings_pct}%",
                },
                "privacy_guarantee": {
                    "student_identity":    None,
                    "raw_score":           None,
                    "time_spent":          None,
                    "device_info":         None,
                    "learning_history":    None,
                    "questions_attempted": None,
                }
            })

        elif path == "/peers/register":
            peer_id   = body.get("node_id", "")
            peer_host = body.get("host",    "localhost")
            peer_port = body.get("port",    8001)

            if not peer_id:
                self._json(400, {"error": "missing node_id"})
                return

            peers_snapshot = peers.register_peer(peer_id, peer_host, peer_port)
            print(f"  [PEER] registered {peer_id[:12]}... @ {peer_host}:{peer_port}")
            self._json(200, {
                "ok":          True,
                "this_node":   node.NODE_ID,
                "known_peers": peers_snapshot,
                "fingerprint": node.sha256_hex(f"{node.NODE_ID}:{node.NODE_PORT}")[:16],
            })

        elif path == "/peers/sync":
            self._json(200, {
                "this_node":   node.NODE_ID,
                "synced_with": peers.get_peer_count(),
                "peers":       peers.get_peers()
            })

        else:
            self._json(404, {"error": "unknown endpoint", "path": path})