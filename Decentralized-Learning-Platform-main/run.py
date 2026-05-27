#!/usr/bin/env python3
"""
EduLift — Entry Point
Run this file to start the server: python3 run.py [port]
"""
from http.server import HTTPServer
from backend.handler import EduLiftHandler
from backend.node import NODE_PORT, NODE_ID, NODE_STARTED, sha256_hex, NODE_SECRET
from backend.modules import MODULES, TOTAL_KB
from backend.peers import get_peer_count
from backend.log import get_log_count

def print_banner():
    fingerprint = sha256_hex(f"{NODE_ID}:{NODE_STARTED}:{NODE_PORT}")
    secret_hash = sha256_hex(NODE_SECRET)
    print()
    print("  ╔══════════════════════════════════════════════════════════╗")
    print("  ║              EDULIFT — Decentralised Node                ║")
    print("  ╚══════════════════════════════════════════════════════════╝")
    print()
    print(f"  Node ID        : {NODE_ID}")
    print(f"  Fingerprint    : {fingerprint[:32]}...")
    print(f"  Secret Hash    : {secret_hash[:32]}...")
    print(f"  Algorithm      : SHA-256")
    print(f"  Port           : {NODE_PORT}")
    print(f"  Started        : {NODE_STARTED}")
    print(f"  Modules        : {len(MODULES)} ({TOTAL_KB} KB total)")
    print()
    print(f"  Privacy Model  : Zero-Knowledge")
    print(f"  PII Stored     : NONE")
    print(f"  Log stores     : SHA-256(token) only")
    print()
    print(f"  Server ready ➜  http://localhost:{NODE_PORT}")
    print(f"  Open frontend  :  http://localhost:{NODE_PORT}/index.html")
    print()
    print("  ──────────────────────────────────────────────────────────")
    print("  Endpoints:")
    print("    GET  /              — node health / info")
    print("    GET  /node/info     — detailed node info + fingerprint")
    print("    GET  /modules       — full module catalog")
    print("    GET  /log           — privacy-safe request log")
    print("    GET  /log/clear     — clear request log")
    print("    GET  /peers         — known peer nodes")
    print("    POST /request       — main protocol endpoint")
    print("    POST /peers/register — register a peer node")
    print("    POST /peers/sync    — sync state with peers")
    print("  ──────────────────────────────────────────────────────────")
    print()

def run():
    print_banner()
    server = HTTPServer(("", NODE_PORT), EduLiftHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n  Node shutting down...")
        server.server_close()

if __name__ == "__main__":
    run()