/**
 * Role-Based Access Control (RBAC) Role Helpers
 */

export const INTERNAL_ROLES = [
  'SUPER_ADMIN',
  'DEVELOPER',
  'ANALYTICS',
  'ADMIN',
  'super_admin',
  'developer',
  'analytics',
  'admin'
];

export const hasInternalRole = (role?: string): boolean => {
  if (!role) return false;
  const upper = role.trim().toUpperCase();
  return (
    upper === 'SUPER_ADMIN' ||
    upper === 'DEVELOPER' ||
    upper === 'ANALYTICS' ||
    upper === 'ADMIN'
  );
};

export const isSuperAdmin = (role?: string): boolean => {
  if (!role) return false;
  const upper = role.trim().toUpperCase();
  return upper === 'SUPER_ADMIN' || upper === 'ADMIN';
};

export const isDeveloper = (role?: string): boolean => {
  if (!role) return false;
  const upper = role.trim().toUpperCase();
  return upper === 'DEVELOPER' || isSuperAdmin(role);
};

export const isAnalytics = (role?: string): boolean => {
  if (!role) return false;
  const upper = role.trim().toUpperCase();
  return upper === 'ANALYTICS' || isSuperAdmin(role);
};
