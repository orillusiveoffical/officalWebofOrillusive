// NoSQL Query Injection Sanitizer
export function sanitizeObject<T>(data: T): T {
  if (typeof data === 'string') {
    return data as unknown as T;
  }
  if (Array.isArray(data)) {
    return data.map(sanitizeObject) as unknown as T;
  }
  if (data !== null && typeof data === 'object') {
    const cleanObj: Record<string, any> = {};
    for (const key of Object.keys(data as Record<string, any>)) {
      if (!key.startsWith('$') && !key.includes('.')) {
        cleanObj[key] = sanitizeObject((data as Record<string, any>)[key]);
      }
    }
    return cleanObj as T;
  }
  return data;
}

// XSS HTML Escaper
export function escapeHtml(str: string): string {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Enterprise Password Complexity Regex (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character)
export function validatePasswordStrength(password: string): { valid: boolean; error?: string } {
  if (!password || password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters long.' };
  }
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecial = /[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  if (!hasUpper || !hasLower || !hasDigit || !hasSpecial) {
    return {
      valid: false,
      error: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    };
  }

  return { valid: true };
}

// In-Memory Rate Limiting Cache for Serverless IP Tracking
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkServerlessRateLimit(ip: string, limit: number = 10, windowMs: number = 15 * 60 * 1000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true; // allowed
  }

  if (record.count >= limit) {
    return false; // rate limited
  }

  record.count += 1;
  return true; // allowed
}
