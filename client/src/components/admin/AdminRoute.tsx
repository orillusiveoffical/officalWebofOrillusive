import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { hasInternalRole } from '../../utils/roles';
import { Loader2, ShieldAlert } from 'lucide-react';

interface AdminRouteProps {
  allowedRoles?: string[];
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ allowedRoles }) => {
  const { user, token, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111111] text-white flex flex-col items-center justify-center p-4 font-sans">
        <Loader2 className="size-8 animate-spin text-[#C9A84C] mb-3" />
        <p className="text-xs font-mono tracking-widest text-[#888888] uppercase">Authenticating Internal Session...</p>
      </div>
    );
  }

  // Not logged in or no valid auth token
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // Check general internal role requirement
  const isInternal = hasInternalRole(user.role);
  if (!isInternal) {
    return <Navigate to="/" replace />;
  }

  // Check specific sub-role restrictions if specified
  if (allowedRoles && allowedRoles.length > 0) {
    const isSuperAdmin = user.role === 'SUPER_ADMIN' || user.role === 'admin';
    const isAllowed = isSuperAdmin || allowedRoles.includes(user.role);

    if (!isAllowed) {
      return (
        <div className="min-h-screen bg-[#111111] text-white flex flex-col items-center justify-center p-6 font-sans text-center">
          <div className="size-16 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center mb-4">
            <ShieldAlert className="size-8" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Access Restricted</h2>
          <p className="text-xs text-[#888888] max-w-md mt-2 leading-relaxed">
            Your role (<strong className="text-white uppercase">{user.role}</strong>) does not have authorization to view this section of the Orillusive internal dashboard.
          </p>
          <a
            href="/admin"
            className="mt-6 px-6 py-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 text-xs font-bold uppercase tracking-wider transition-all"
          >
            Return to Dashboard Overview
          </a>
        </div>
      );
    }
  }

  return <Outlet />;
};

export default AdminRoute;
