/**
 * Security utilities for input sanitization and injection prevention
 */

// Escape all special characters for safe usage in Regular Expressions (prevents ReDoS and syntax crashes)
export function escapeRegex(string) {
  if (typeof string !== 'string') return '';
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Escape HTML entities to prevent HTML injection / XSS in emails and rendered templates
export function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export default {
  escapeRegex,
  escapeHtml
};
