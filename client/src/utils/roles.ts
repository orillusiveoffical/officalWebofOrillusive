/**
 * Role-Based Access Control (RBAC) Role Helpers
 */

export const INTERNAL_ROLES = ['SUPER_ADMIN', 'DEVELOPER', 'ANALYTICS', 'admin'];

export const hasInternalRole = (role?: string): boolean => {
  if (!role) return false;
  return INTERNAL_ROLES.includes(role);
};

export const isSuperAdmin = (role?: string): boolean => {
  return role === 'SUPER_ADMIN' || role === 'admin';
};

export const isDeveloper = (role?: string): boolean => {
  return role === 'DEVELOPER' || isSuperAdmin(role);
};

export const isAnalytics = (role?: string): boolean => {
  return role === 'ANALYTICS' || isSuperAdmin(role);
};
