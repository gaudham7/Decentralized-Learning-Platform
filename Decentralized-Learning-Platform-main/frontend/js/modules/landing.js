/**
 * landing.js — Home / landing page renderer
 */

function renderLanding(container) {
  container.appendChild(el('div', { class: 'hero' },
    el('div', {
      style: { fontFamily: 'var(--mono)', fontSize: '.75rem', color: 'var(--green-dim)', letterSpacing: '.2em', marginBottom: '1rem', textTransform: 'uppercase' }
    }, '◈ ADAPTIVE LEARNING SYSTEM v2.0 — SHA-256 ◈'),
    el('h1', null, 'LIFT YOUR\u00a0', el('span', { style: { color: 'var(--text)', textShadow: 'none' } }, 'KNOWLEDGE '), 'HIGHER'),
    el('p', { class: 'hero-sub' },
      'A privacy-preserving adaptive learning system. Your edge device computes your ability level locally, ' +
      'masks it into an SHA-256 token, and requests only the content you need — without revealing who you are.'),
    el('div', { class: 'hacts' },
      el('button', { class: 'btn btn-p', onClick: () => navigate('register') }, '▶ Start Learning'),
      el('button', { class: 'btn',       onClick: () => navigate('server')  }, '⬡ View Server Dashboard'),
    ),
  ));

  const page = el('div', { class: 'page', style: { paddingTop: '0' } });

  // ── Feature cards ───────────────────────────────────────────────
  const features = [
    {
      icon: '🔒', title: 'SHA-256 Privacy', badge: 'SHA-256',
      desc: 'Tokens are SHA-256 hash chains. The server learns only bucket classifications — never raw scores, student identity, or details.',
    },
    {
      icon: '📡', title: 'Minimal Bandwidth', badge: '~48 BYTES/REQUEST',
      desc: 'Only ~48 bytes exchanged per request: a hashed token, topic bucket, and difficulty level. No profiles, no history, no tracking.',
    },
    {
      icon: '⚡', title: 'Edge Computing', badge: 'LOCAL-FIRST',
      desc: "Assessment computation happens entirely on the client device. SHA-256 hashing, difficulty scoring, and bucket mapping never leave your machine.",
    },
  ];



  // ── How it works ────────────────────────────────────────────────
  const steps = [
    { n: '01', t: 'Study Your Notes',  d: 'Read subject notes matched to your grade level and school level.' },
    { n: '02', t: 'Take the Quiz',     d: 'Answer questions based on what you just studied. Score computed locally.' },
    { n: '03', t: 'SHA-256 Token',     d: 'Three-part SHA-256 hash chain obscures topic+level into an opaque 26-char token.' },
    { n: '04', t: 'Minimal Request',   d: 'Only token + 2 buckets (~48B) sent. No identity, no raw data.' },
    { n: '05', t: 'Server Matches',    d: 'Server matches buckets to catalog entries and returns appropriate modules.' },
    { n: '06', t: 'Zero Knowledge',    d: 'Server never learns who asked, what they scored, or any personal details.' },
  ];

  

  
  container.appendChild(page);
}