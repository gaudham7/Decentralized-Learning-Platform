/**
 * crypto.js — SHA-256 based privacy protocol utilities
 * 
 * Uses the Web Crypto API (SubtleCrypto) for real SHA-256
 * with a synchronous fallback SHA-256 for token generation.
 * 
 * Decentralised design: all computation runs on the client (edge device).
 * No raw data ever leaves this module to the network.
 */

const PrivacyCrypto = (() => {
  // ── SHA-256 via Web Crypto API (async) ──────────────────────────
  async function sha256(str) {
    const msgBuffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2,'0')).join('');
  }

  // ── Synchronous SHA-256 (pure-JS) ───────────────────────────────
  function sha256Sync(str) {
    function rightRotate(value, amount) {
      return (value >>> amount) | (value << (32 - amount));
    }
    const mathPow = Math.pow;
    const maxWord = mathPow(2, 32);
    const lengthProperty = 'length';
    let i, j;
    let result = '';

    const words = [];
    const asciiBitLength = str[lengthProperty] * 8;

    let hash = sha256Sync.h = sha256Sync.h || [];
    const k = sha256Sync.k = sha256Sync.k || [];
    let primeCounter = k[lengthProperty];
    const isComposite = {};
    for (let candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (i = 0; i < 313; i += candidate) {
          isComposite[i] = candidate;
        }
        hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
        k[primeCounter++] = (mathPow(candidate, 1/3) * maxWord) | 0;
      }
    }

    str += '\x80';
    while (str[lengthProperty] % 64 - 56) str += '\x00';
    for (i = 0; i < str[lengthProperty]; i++) {
      j = str.charCodeAt(i);
      if (j >> 8) return;
      words[i >> 2] |= j << ((3 - i) % 4) * 8;
    }
    words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
    words[words[lengthProperty]] = (asciiBitLength);

    for (j = 0; j < words[lengthProperty];) {
      const w = words.slice(j, j += 16);
      const oldHash = hash.slice(0);
      hash = hash.slice(0, 8);

      for (i = 0; i < 64; i++) {
        const w15 = w[i - 15], w2 = w[i - 2];
        const a = hash[0], e = hash[4];
        const temp1 = hash[7]
          + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
          + ((e & hash[5]) ^ (~e & hash[6]))
          + k[i]
          + (w[i] = (i < 16) ? w[i] : (
              w[i - 16]
              + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3))
              + w[i - 7]
              + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))
            ) | 0);
        const temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22))
          + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
        hash = [(temp1 + temp2) | 0].concat(hash);
        hash[4] = (hash[4] + temp1) | 0;
      }

      for (i = 0; i < 8; i++) {
        hash[i] = (hash[i] + oldHash[i]) | 0;
      }
    }

    for (i = 0; i < 8; i++) {
      for (j = 3; j + 1; j--) {
        const b = (hash[i] >> (j * 8)) & 255;
        result += ((b < 16) ? '0' : '') + b.toString(16);
      }
    }
    return result;
  }
  sha256Sync.h = null;
  sha256Sync.k = null;

  function sha256Hex(str) {
    return sha256Sync(str);
  }

  // ── Nonce generation ─────────────────────────────────────────────
  function nonce() {
    const arr = new Uint8Array(3);
    crypto.getRandomValues(arr);
    return Array.from(arr).map(b => b.toString(16).padStart(2,'0')).join('');
  }

  // ── Topic → bucket mapping ───────────────────────────────────────
  const TOPIC_MAP = { mathematics:0, science:1, language:2, history:3, computing:4 };
  function topicToBucket(t) { return TOPIC_MAP[t.toLowerCase()] ?? 0; }

  // ── Score → difficulty bucket ────────────────────────────────────
  function assessToBucket(correct, total) {
    const a = total === 0 ? 0 : correct / total;
    if (a >= 0.9) return 5;
    if (a >= 0.7) return 4;
    if (a >= 0.5) return 3;
    if (a >= 0.3) return 2;
    return 1;
  }

  // ── Accurately measure UTF-8 byte length of a string ────────────
  function byteLength(str) {
    return new TextEncoder().encode(str).length;
  }

  // ── Measure actual JSON payload bytes ────────────────────────────
  function measurePayloadBytes(payload) {
    return byteLength(JSON.stringify(payload));
  }

  // ── Build a realistic "full profile" object for comparison ───────
  function buildFullProfile(assessment) {
    return {
      student_id:           "usr_" + sha256Hex(String(Date.now())).substring(0, 16),
      username:             "student_example",
      email:                "student@example.com",
      grade:                10,
      school:               "Example High School",
      topic:                assessment.topic,
      questions_attempted:  assessment.questionsAttempted,
      correct_answers:      assessment.correctAnswers,
      wrong_answers:        assessment.questionsAttempted - assessment.correctAnswers,
      accuracy_percent:     ((assessment.correctAnswers / assessment.questionsAttempted) * 100).toFixed(2),
      time_spent_seconds:   assessment.timeSpentSeconds,
      difficulty_level:     assessToBucket(assessment.correctAnswers, assessment.questionsAttempted),
      session_id:           sha256Hex(String(Date.now())).substring(0, 32),
      device_fingerprint:   sha256Hex(navigator.userAgent || "unknown").substring(0, 32),
      ip_address:           "192.168.1." + Math.floor(Math.random() * 255),
      learning_history:     Array.from({length: 10}, (_, i) => ({
        date:     new Date(Date.now() - i * 86400000).toISOString(),
        topic:    ["mathematics","science","language","history","computing"][i % 5],
        score:    Math.floor(Math.random() * 100),
        duration: Math.floor(Math.random() * 300),
      })),
      preferences:          { language: "en", theme: "dark", notifications: true },
      created_at:           new Date(Date.now() - 30 * 86400000).toISOString(),
      last_active:          new Date().toISOString(),
    };
  }

  /**
   * generateMaskedRequest
   * 
   * Runs entirely on the client. Uses SHA-256 to hash topic:level:nonce:ts.
   * Server receives ONLY: token, topicBucket, levelBucket, timestamp, nonce.
   * 
   * _byteSize is now the REAL measured size of the JSON payload in UTF-8 bytes.
   */
  function generateMaskedRequest(assessment) {
    const nc  = nonce();
    const ts  = Date.now();
    const tb  = topicToBucket(assessment.topic);
    const lb  = assessToBucket(assessment.correctAnswers, assessment.questionsAttempted);

    // SHA-256 token chain
    const inp   = `${assessment.topic}:${lb}:${nc}:${ts}`;
    const part1 = sha256Hex(inp).substring(0, 8);
    const part2 = sha256Hex(inp + 'salt').substring(0, 8);
    const part3 = sha256Hex(nc + ts).substring(0, 8);
    const token = (part1 + part2 + part3).substring(0, 26);

    // Full SHA-256 of entire payload for display
    const payloadHash = sha256Hex(`${token}:${tb}:${lb}:${ts}:${nc}`);

    // ── Measure REAL byte sizes ───────────────────────────────────
    const wirePayload = { token, topicBucket: tb, levelBucket: lb, timestamp: ts, nonce: nc };
    const realBytes   = measurePayloadBytes(wirePayload);

    // HTTP overhead: POST line + headers (Content-Type, Content-Length, X-Node-ID)
    // Estimated conservatively: ~180 bytes of HTTP headers
    const httpHeaderBytes  = 180;
    const totalRequestBytes = realBytes + httpHeaderBytes;

    // Full profile that would otherwise be sent
    const fullProfile      = buildFullProfile(assessment);
    const fullProfileBytes = measurePayloadBytes(fullProfile);

    return {
      token,
      topicBucket:  tb,
      levelBucket:  lb,
      timestamp:    ts,
      nonce:        nc,
      payloadHash,
      sha256Parts: { part1, part2, part3, inp: inp.substring(0,30)+'...' },

      // Real byte measurements
      _byteSize:          realBytes,           // JSON body only
      _httpHeaderBytes:   httpHeaderBytes,     // estimated HTTP headers
      _totalRequestBytes: totalRequestBytes,   // full HTTP request
      _fullProfileBytes:  fullProfileBytes,    // what a naive server would demand
      _wirePayload:       wirePayload,         // the actual object sent

      algorithm: 'SHA-256 (3-part hash chain)',
    };
  }

  function calculateBandwidthSavings(masked, totalKB) {
    const rb  = masked._byteSize          || 48;   // JSON body
    const trb = masked._totalRequestBytes || rb + 180;
    const fb  = masked._fullProfileBytes  || 1200;
    const cb  = totalKB * 1024;

    const savingsPct = ((fb - rb) / fb * 100).toFixed(1);

    return {
      // JSON body
      requestBytes:        rb,
      requestBytesDisplay: rb + ' B',

      // Full HTTP request
      totalRequestBytes:        trb,
      totalRequestBytesDisplay: trb + ' B',

      // What a naive system would send
      fullProfileBytes:   fb,
      fullProfileDisplay: fb >= 1024 ? (fb/1024).toFixed(1) + ' KB' : fb + ' B',

      // Whole catalog
      catalogBytes:   cb,
      catalogDisplay: totalKB + ' KB',

      // Savings
      savingsPercent:        savingsPct,
      savingsPercentDisplay: savingsPct + '%',

      // HTTP headers breakdown
      httpHeaderBytes: masked._httpHeaderBytes || 180,
    };
  }

  async function hashPassword(password) {
    const salted = `edulift:${password}:sha256`;
    return await sha256(salted);
  }

  return {
    sha256,
    sha256Hex,
    hashPassword,
    nonce,
    topicToBucket,
    assessToBucket,
    byteLength,
    measurePayloadBytes,
    generateMaskedRequest,
    calculateBandwidthSavings,
  };
})();