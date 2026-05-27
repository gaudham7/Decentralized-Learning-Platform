/**
 * api.js — Multi-node backend communication layer
 * 
 * Tries multiple nodes in order. If one fails, automatically
 * falls over to the next. This is what makes the system decentralised
 * from the client's perspective.
 */

const API = (() => {
  // ── Known nodes — add more as you spin up more server.py instances ──
  let NODES = [
    'http://localhost:8000',
    'http://localhost:8001',
    'http://localhost:8002',
  ];

  let onlineNodes  = [];   // nodes that responded to ping
  let primaryNode  = null; // currently active node
  let onStatusChange = null;

  function setStatusCallback(cb) { onStatusChange = cb; }

  function _notifyStatus() {
    if (onStatusChange) onStatusChange(onlineNodes.length > 0, {
      node_id: primaryNode?.node_id,
      online_count: onlineNodes.length,
      nodes: onlineNodes,
    });
  }

  // ── Ping a single node ───────────────────────────────────────────
  async function pingNode(url) {
    try {
      const r = await fetch(`${url}/`, {
        method: 'GET',
        signal: AbortSignal.timeout(3000)
      });
      if (r.ok) {
        const data = await r.json();
        return { url, ...data };
      }
    } catch (e) {}
    return null;
  }

  // ── Ping ALL known nodes simultaneously ─────────────────────────
  async function ping() {
    const results = await Promise.allSettled(NODES.map(url => pingNode(url)));
    onlineNodes = results
      .filter(r => r.status === 'fulfilled' && r.value !== null)
      .map(r => r.value);

    primaryNode = onlineNodes[0] || null;
    _notifyStatus();
    return primaryNode;
  }

  // ── Try request on each node until one succeeds ──────────────────
  async function tryNodes(fn) {
    // try online nodes first in order
    for (const node of onlineNodes) {
      try {
        const result = await fn(node.url);
        if (result) return result;
      } catch (e) {}
    }
    return null;
  }

  // ── Get detailed node info ───────────────────────────────────────
  async function getNodeInfo() {
    return tryNodes(async (url) => {
      const r = await fetch(`${url}/node/info`, { signal: AbortSignal.timeout(3000) });
      if (r.ok) return await r.json();
    });
  }

  // ── Submit privacy-masked request ────────────────────────────────
  async function submitRequest(masked) {
    const payload = {
      token:       masked.token,
      topicBucket: masked.topicBucket,
      levelBucket: masked.levelBucket,
      timestamp:   masked.timestamp,
      nonce:       masked.nonce,
    };

    for (const node of onlineNodes) {
      try {
        const r = await fetch(`${node.url}/request`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(5000),
        });
        if (r.ok) {
          const data = await r.json();
          if (data.ok) return { success: true, data, node: node.url };
        }
      } catch (e) {}
    }
    return { success: false, error: 'All nodes offline', offline: true };
  }

  // ── Fetch log ────────────────────────────────────────────────────
  async function getLog() {
    return tryNodes(async (url) => {
      const r = await fetch(`${url}/log`, { signal: AbortSignal.timeout(3000) });
      if (r.ok) return await r.json();
    });
  }

  // ── Clear log ────────────────────────────────────────────────────
  async function clearLog() {
    return tryNodes(async (url) => {
      const r = await fetch(`${url}/log/clear`, { signal: AbortSignal.timeout(3000) });
      if (r.ok) return await r.json();
    });
  }

  // ── Get peers ────────────────────────────────────────────────────
  async function getPeers() {
    return tryNodes(async (url) => {
      const r = await fetch(`${url}/peers`, { signal: AbortSignal.timeout(3000) });
      if (r.ok) return await r.json();
    });
  }

  // ── Register peer ────────────────────────────────────────────────
  async function registerPeer(nodeId, host, port) {
    return tryNodes(async (url) => {
      const r = await fetch(`${url}/peers/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ node_id: nodeId, host, port }),
        signal: AbortSignal.timeout(3000),
      });
      if (r.ok) return await r.json();
    });
  }

  // ── Add a new node at runtime ────────────────────────────────────
  function addNode(url) {
    if (!NODES.includes(url)) {
      NODES.push(url);
      ping(); // immediately check if it is online
    }
  }

  function isOnline()      { return onlineNodes.length > 0; }
  function getInfo()       { return primaryNode; }
  function getOnlineNodes(){ return onlineNodes; }
  function getAllNodes()    { return NODES; }

  return {
    ping,
    getNodeInfo,
    submitRequest,
    getLog,
    clearLog,
    getPeers,
    registerPeer,
    addNode,
    setStatusCallback,
    isOnline,
    getInfo,
    getOnlineNodes,
    getAllNodes,
  };
})();