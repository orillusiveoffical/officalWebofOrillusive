// NoSQL Query Injection Defense: Remove keys starting with '$' or containing '.'
function sanitizeInput(data) {
  if (typeof data === 'string') {
    return data;
  }
  if (Array.isArray(data)) {
    return data.map(sanitizeInput);
  }
  if (data !== null && typeof data === 'object') {
    const cleanObj = {};
    for (const key of Object.keys(data)) {
      if (!key.startsWith('$') && !key.includes('.')) {
        cleanObj[key] = sanitizeInput(data[key]);
      } else {
        console.warn(`🛡️ [SECURITY SANITIZER] Stripped suspicious NoSQL operator key: ${key}`);
      }
    }
    return cleanObj;
  }
  return data;
}

// Express middleware to sanitize req.body, req.query, and req.params
export function mongoSanitizeMiddleware(req, res, next) {
  if (req.body) req.body = sanitizeInput(req.body);
  if (req.query) req.query = sanitizeInput(req.query);
  if (req.params) req.params = sanitizeInput(req.params);
  next();
}

// XSS HTML Escaper for String Inputs
export function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
