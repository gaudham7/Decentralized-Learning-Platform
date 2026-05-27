/**
 * server.js — Server dashboard page renderer
 * - Master password gate
 * - All stats fetched live from the server
 * - Accurate real-time log with correct field display
 */

const SERVER_MASTER_PASSWORD = 'admin';  
const SERVER_SESSION_KEY     = 'edulift_server_auth';

// ── Auth helpers ──────────────────────────────────────────────────
function isServerAuthed() {
  return sessionStorage.getItem(SERVER_SESSION_KEY) === 'true';
}

function setServerAuthed() {
  sessionStorage.setItem(SERVER_SESSION_KEY, 'true');
}

function clearServerAuthed() {
  sessionStorage.removeItem(SERVER_SESSION_KEY);
}

// ── Password gate ─────────────────────────────────────────────────
function renderServerPasswordGate(container, onSuccess) {
  const wrap = el('div', { class: 'auth-wrap' });
  const card = el('div', { class: 'auth-card' });

  card.appendChild(el('div', { class: 'auth-title' }, 'SERVER ACCESS'));
  card.appendChild(el('div', { class: 'auth-sub' }, '// enter master password to view dashboard'));

  const errBox = el('div', { class: 'auth-error', id: 'srv-err' }, '');
  card.appendChild(errBox);

  const pField = el('div', { class: 'auth-field' });
  pField.appendChild(el('label', { class: 'auth-label' }, 'Master Password'));
  pField.appendChild(el('input', {
    class: 'auth-input', type: 'password',
    placeholder: 'enter master password', id: 'srv-pass'
  }));
  card.appendChild(pField);

  const btn = el('button', { class: 'btn btn-p w100', style: { marginTop: '.5rem' } }, '▶ UNLOCK DASHBOARD');
  btn.addEventListener('click', () => {
    const val = document.getElementById('srv-pass').value;
    const err = document.getElementById('srv-err');
    if (val === SERVER_MASTER_PASSWORD) {
      setServerAuthed();
      onSuccess();
    } else {
      err.textContent = 'Incorrect password.';
      err.classList.add('show');
      document.getElementById('srv-pass').value = '';
    }
  });
  document.getElementById('srv-pass')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') btn.click();
  });
  // keydown won't work before appending — attach after
  card.appendChild(btn);
  card.addEventListener('keydown', (e) => { if (e.key === 'Enter') btn.click(); });

  wrap.appendChild(card);
  container.appendChild(wrap);
}

// ── Main dashboard ────────────────────────────────────────────────
async function renderServerPage(container) {

  // ── Password gate ───────────────────────────────────────────────
  if (!isServerAuthed()) {
    renderServerPasswordGate(container, () => {
      container.innerHTML = '';
      renderServerPage(container);
    });
    return;
  }

  const page    = el('div', { class: 'page' });
  const topics  = TOPIC_NAMES;
  const tnames  = TOPIC_LABELS;
  const ticons  = TOPIC_ICONS;
  const diffs   = [1, 2, 3, 4, 5];

  // ── Fetch live data from server ─────────────────────────────────
  let serverLog    = [];
  let nodeDetail   = null;
  let serverOnline = false;

  // Wait for ping if not yet online
  if (!API.isOnline()) {
    await API.ping();
  }

  if (API.isOnline()) {
    try {
      const logData = await API.getLog();
      if (logData) {
        serverLog  = logData.log   || [];
        serverOnline = true;
        state.serverLog = serverLog;
      }
    } catch(e) {}

    try {
      nodeDetail = await API.getNodeInfo();
    } catch(e) {}
  } else {
    // Fall back to last cached log
    serverLog = state.serverLog || [];
  }

  // ── Header ─────────────────────────────────────────────────────
  page.appendChild(el('div', { class: 'sh' },
    el('div', { class: 'flex sb ac' },
      el('div', null,
        el('h1', null, 'SERVER DASHBOARD'),
        el('p',  null, '// Central node — zero knowledge of student identities or scores')
      ),
      el('div', { class: 'flex gap1 ac' },
        el('span', {
          class: `badge ${serverOnline ? 'bg pulse' : 'br'}`
        }, serverOnline ? '● ONLINE' : '● OFFLINE'),
        el('span', { class: 'badge bd' }, `${serverLog.length} REQUESTS LOGGED`),
        el('button', {
          class: 'btn btn-sm',
          style: { marginLeft: '.5rem' },
          onClick: () => {
            clearServerAuthed();
            container.innerHTML = '';
            renderServerPage(container);
          }
        }, '🔒 LOCK')
      )
    )
  ));

  // ── Live stats grid ─────────────────────────────────────────────
  // Use server-reported values where available, fall back to local
  const liveModuleCount = nodeDetail?.module_count ?? MODULES.length;
  const liveTotalKB     = nodeDetail?.total_kb      ?? TOTAL_KB;
  const livePeerCount   = nodeDetail?.peer_count    ?? 0;
  const liveLogCount    = nodeDetail?.log_count     ?? serverLog.length;

  // Compute real unique topic buckets seen in log
  const uniqueBuckets = [...new Set(serverLog.map(e => e.topic_bucket ?? e.topicBucket))].filter(b => b !== undefined);

  
  // ── Node identity card ──────────────────────────────────────────
  const onlineNodes = API.getOnlineNodes();
  if (onlineNodes.length > 0) {
    const nodesCard = el('div', { class: 'card mb4' });
    nodesCard.appendChild(el('div', { class: 'card-title' }, '🔐 ACTIVE NODE IDENTITIES'));
    const term = el('div', { class: 'term' });

    onlineNodes.forEach((ni, idx) => {
      if (idx > 0) {
        term.appendChild(el('div', {
          style: { borderTop: '1px solid var(--border)', margin: '.5rem 0' }
        }));
      }
      [
        { l: `Node ${idx + 1} ID`,  v: ni.node_id    || ni.node_id    || '—' },
        { l: 'Port',                 v: String(ni.port || '—') },
        { l: 'Status',               v: ni.status     || 'ONLINE' },
        { l: 'Algorithm',            v: ni.algorithm  || 'SHA-256' },
        { l: 'Started',              v: ni.started    || '—' },
        { l: 'PII Stored',           v: 'NONE — guaranteed by protocol' },
        { l: 'Log Method',           v: 'SHA-256(token) only — original not stored' },
      ].forEach(r => {
        term.appendChild(el('div', { class: 'crypto-row' },
          el('span', { class: 'crypto-label' }, r.l + ':'),
          el('span', { class: 'crypto-value' },  r.v)
        ));
      });
    });

    nodesCard.appendChild(term);
    page.appendChild(nodesCard);
  }

  // ── Privacy guarantee banner ────────────────────────────────────
  

  // ── Module catalog table ────────────────────────────────────────
  const cat = el('div', { class: 'card mb4' });
  cat.appendChild(el('div', { class: 'card-title' },
    `◈ MODULE CATALOG  (${topics.length} TOPICS × 5 DIFFICULTY LEVELS = ${liveModuleCount} MODULES / ${liveTotalKB} KB)`
  ));

  const tscroll = el('div', { style: { overflowX: 'auto' } });
  const table   = el('table', { class: 'ltbl', style: { minWidth: '700px' } });
  table.appendChild(el('thead', null, el('tr', null,
    el('th', null, 'TOPIC'),
    ...diffs.map(d => el('th', null, `D${d}  ${'★'.repeat(d)}`))
  )));

  const tbody = el('tbody', null);
  topics.forEach((topic, ti) => {
    const tr = el('tr', null);
    tr.appendChild(el('td', null,
      el('div', { class: 'flex ac gap1' },
        el('span', { style: { fontSize: '1.1rem' } }, ticons[ti]),
        el('div', null,
          el('div', { style: { color: 'var(--text-bright)', textTransform: 'uppercase', letterSpacing: '.05em', fontSize: '.75rem' } }, topic),
          el('span', { class: 'badge bd', style: { fontSize: '.65rem', marginTop: '.3rem' } }, `bucket #${ti}`)
        )
      )
    ));
    diffs.forEach(d => {
      const mod = MODULES.find(m => m.topic === topic && m.difficulty === d);
      tr.appendChild(el('td', null,
        mod
          ? el('div', null,
              el('div', { style: { color: 'var(--text-bright)', fontSize: '.75rem', marginBottom: '.2rem' } }, mod.title),
              el('div', { style: { color: 'var(--text-dim)', fontSize: '.7rem' } }, mod.sizeKB + ' KB')
            )
          : el('span', { style: { color: 'var(--text-dim)', opacity: '.3' } }, '—')
      ));
    });
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  tscroll.appendChild(table);
  cat.appendChild(tscroll);
  page.appendChild(cat);

  // ── Request log ─────────────────────────────────────────────────
  const logcard = el('div', { class: 'card' });
  const loghead = el('div', { class: 'card-title flex sb ac' });
  loghead.appendChild(el('span', null,
    `◈ REQUEST LOG — ${serverLog.length} ENTRIES (SHA-256 hashes only)`
  ));

  const btnGroup = el('div', { class: 'flex gap1' });

  if (serverLog.length > 0) {
    btnGroup.appendChild(el('button', {
      class: 'btn btn-sm',
      onClick: async () => {
        await API.clearLog();
        state.serverLog = [];
        container.innerHTML = '';
        renderServerPage(container);
      }
    }, 'CLEAR LOG'));
  }

  btnGroup.appendChild(el('button', {
    class: 'btn btn-sm',
    onClick: async () => {
      container.innerHTML = '';
      renderServerPage(container);
    }
  }, '↺ REFRESH'));

  loghead.appendChild(btnGroup);
  logcard.appendChild(loghead);

  if (serverLog.length === 0) {
    logcard.appendChild(el('div', {
      style: { textAlign: 'center', padding: '3rem', fontFamily: 'var(--mono)', color: 'var(--text-dim)' }
    },
      el('div', { style: { fontSize: '2rem', marginBottom: '.5rem' } }, '⬡'),
      el('div', null, state.nodeOnline ? 'No requests yet.' : 'Node offline — showing cached log.'),
      el('div', { style: { fontSize: '.75rem', marginTop: '.3rem' } },
        'Complete a quiz on the Notes page to see requests appear here.')
    ));
  } else {
    const lscroll = el('div', { style: { overflowX: 'auto' } });
    const ltbl    = el('table', { class: 'ltbl' });

    ltbl.appendChild(el('thead', null, el('tr', null,
      ...['#', 'TIME (UTC)', 'TOKEN SHA-256', 'TOPIC', 'LEVEL', 'MODULES SENT', 'STUDENT ID', 'RAW SCORE']
        .map(h => el('th', null, h))
    )));

    const lb = el('tbody', null);
    [...serverLog].reverse().forEach((entry, idx) => {
      const topicBucket = entry.topic_bucket  ?? entry.topicBucket;
      const levelBucket = entry.level_bucket  ?? entry.levelBucket;
      const tokenHash   = entry.token_sha256  || entry.token || '—';
      const isoTime     = entry.iso_time      || (entry.timestamp ? new Date(entry.timestamp).toISOString().substring(11, 19) + ' UTC' : '—');
      const modulesSent = entry.modules_sent  ?? '—';
      const entryId     = entry.id            || String(serverLog.length - idx);

      lb.appendChild(el('tr', { class: 'ani' },
        el('td', { style: { color: 'var(--text-dim)', fontSize: '.7rem' } }, entryId),
        el('td', { style: { color: 'var(--text-dim)' } }, isoTime),
        el('td', null,
          el('span', { style: { color: 'var(--yellow)', fontFamily: 'var(--mono)', fontSize: '.7rem' } },
            tokenHash.substring(0, 16) + '...'
          )
        ),
        el('td', null,
          el('span', { class: 'badge bg' },
            `#${topicBucket} ${tnames[topicBucket] || '?'}`
          )
        ),
        el('td', null,
          el('span', { class: 'badge bg' }, diffToLevel(levelBucket))
        ),
        el('td', { style: { textAlign: 'center', color: 'var(--green)', fontFamily: 'var(--mono)', fontSize: '.78rem' } },
          String(modulesSent)
        ),
        el('td', null,
          el('span', { class: 'glow-r mono', style: { fontSize: '.75rem' } },
            entry.student_identity || entry.studentIdentity || '❌ N/A'
          )
        ),
        el('td', null,
          el('span', { class: 'glow-r mono', style: { fontSize: '.75rem' } },
            entry.raw_score || entry.rawScore || '❌ N/A'
          )
        ),
      ));
    });

    ltbl.appendChild(lb);
    lscroll.appendChild(ltbl);
    logcard.appendChild(lscroll);
  }

  page.appendChild(logcard);
  container.appendChild(page);

  // ── Poll every 5s while on server page ─────────────────────────
  logPollTimer = setInterval(async () => {
    if (state.route !== 'server') { clearInterval(logPollTimer); return; }
    if (!API.isOnline()) return;
    try {
      const d = await API.getLog();
      if (d && d.log.length !== state.serverLog.length) {
        container.innerHTML = '';
        renderServerPage(container);
      }
    } catch(e) {}
  }, 5000);
}