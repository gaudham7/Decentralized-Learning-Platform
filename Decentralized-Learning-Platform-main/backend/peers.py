import threading
import time
import hashlib

peers     = []
peer_lock = threading.Lock()

def sha256_hex(data: str) -> str:
    return hashlib.sha256(data.encode()).hexdigest()

def register_peer(peer_id: str, host: str, port: int) -> list:
    new_peer = {
        "id":          peer_id,
        "host":        host,
        "port":        port,
        "last_seen":   int(time.time()),
        "fingerprint": sha256_hex(f"{peer_id}:{host}:{port}")[:16]
    }
    with peer_lock:
        existing = next((p for p in peers if p["id"] == peer_id), None)
        if existing:
            existing.update(new_peer)
        else:
            peers.append(new_peer)
        return list(peers)

def get_peers() -> list:
    with peer_lock:
        return list(peers)

def get_peer_count() -> int:
    with peer_lock:
        return len(peers)