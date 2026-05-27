import hashlib
import uuid
import os
import sys
from datetime import datetime

NODE_ID      = hashlib.sha256(uuid.uuid4().bytes).hexdigest()[:16]
NODE_PORT    = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
NODE_STARTED = datetime.utcnow().isoformat() + "Z"
NODE_SECRET  = os.environ.get("NODE_SECRET", hashlib.sha256(NODE_ID.encode()).hexdigest())

def sha256_hex(data: str) -> str:
    return hashlib.sha256(data.encode()).hexdigest()

def sha256_bytes(b: bytes) -> str:
    return hashlib.sha256(b).hexdigest()

def get_fingerprint() -> str:
    return sha256_hex(f"{NODE_ID}:{NODE_STARTED}:{NODE_PORT}")

def get_node_info(peer_count: int, log_count: int, module_count: int, total_kb: int) -> dict:
    return {
        "node_id":       NODE_ID,
        "status":        "ONLINE",
        "started":       NODE_STARTED,
        "algorithm":     "SHA-256",
        "privacy":       "zero-knowledge",
        "total_modules": module_count,
        "total_kb":      total_kb,
        "peer_count":    peer_count,
        "log_count":     log_count,
        "message":       "EduLift Node — no student data stored here"
    }

def get_node_detail(peer_count: int, module_count: int, total_kb: int) -> dict:
    return {
        "node_id":       NODE_ID,
        "fingerprint":   get_fingerprint(),
        "port":          NODE_PORT,
        "started":       NODE_STARTED,
        "encryption":    "SHA-256",
        "token_algo":    "SHA-256 3-part hash chain",
        "log_storage":   "token_hash only (SHA-256 truncated), no PII",
        "decentralised": True,
        "peer_count":    peer_count,
        "module_count":  module_count,
        "secret_hash":   sha256_hex(NODE_SECRET)[:16] + "...",
        "privacy_model": "zero-knowledge: server cannot reconstruct student identity or score",
    }