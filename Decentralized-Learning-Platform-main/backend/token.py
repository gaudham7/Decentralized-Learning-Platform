import hashlib
from backend.modules import TOPIC_NAMES

def verify_token(token: str, topic_bucket: int, level_bucket: int, timestamp: int, nonce: str) -> dict:
    topic_name = TOPIC_NAMES[topic_bucket] if 0 <= topic_bucket < len(TOPIC_NAMES) else "unknown"
    inp   = f"{topic_name}:{level_bucket}:{nonce}:{timestamp}"
    part1 = hashlib.sha256(inp.encode()).hexdigest()[:8]
    part2 = hashlib.sha256((inp + "salt").encode()).hexdigest()[:8]
    part3 = hashlib.sha256(f"{nonce}{timestamp}".encode()).hexdigest()[:8]
    expected = (part1 + part2 + part3)[:26]
    match = token[:26] == expected
    return {
        "valid":         match,
        "reconstructed": expected,
        "received":      token[:26],
        "match":         match,
        "algorithm":     "SHA-256 (3-part hash chain)"
    }

def hash_token_for_log(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()[:20]