import threading
import hashlib
from datetime import datetime

request_log = []
log_lock    = threading.Lock()
MAX_LOG     = 500

def sha256_hex(data: str) -> str:
    return hashlib.sha256(data.encode()).hexdigest()

def add_entry(token: str, topic_bucket: int, level_bucket: int,
              timestamp: int, nonce: str, node_id: str, modules_sent: int):
    entry = {
        "id":                 sha256_hex(f"{token}{timestamp}{nonce}")[:12],
        "token_sha256":       hashlib.sha256(token.encode()).hexdigest()[:20],
        "topic_bucket":       topic_bucket,
        "level_bucket":       level_bucket,
        "timestamp":          timestamp,
        "iso_time":           datetime.utcfromtimestamp(timestamp/1000).strftime("%H:%M:%S UTC"),
        "node_id":            node_id,
        "modules_sent":       modules_sent,
        "student_identity":   "❌ NOT AVAILABLE",
        "raw_score":          "❌ NOT AVAILABLE",
        "assessment_details": "❌ NOT AVAILABLE",
    }
    with log_lock:
        request_log.append(entry)
        if len(request_log) > MAX_LOG:
            request_log.pop(0)
    return entry

def get_log() -> list:
    with log_lock:
        return list(request_log)

def clear_log() -> int:
    with log_lock:
        count = len(request_log)
        request_log.clear()
        return count

def get_log_count() -> int:
    with log_lock:
        return len(request_log)