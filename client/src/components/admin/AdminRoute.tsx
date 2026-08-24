import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { hasInternalRole } from '../../utils/roles';
import { Loader2, ShieldAlert, ShieldCheck, Lock, ArrowRight } from 'lucide-react';

interface AdminRouteProps {
  allowedRoles?: string[];
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ allowedRoles }) => {
  const { user, token, loading, login } = useAuth();
  const [email, setEmail] = useState('admin@orillusive.com');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col items-center justify-center p-4 font-sans">
        <Loader2 className="size-8 animate-spin text-[#C9A84C] mb-3" />
        <p className="text-xs font-mono tracking-widest text-[#888888] uppercase">Authenticating Internal Session...</p>
      </div>
    );
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setSubmitting(true);
    try {
      const res = await login(email.trim(), password);
      if (!res.success) {
        setAuthError(res.error || 'Invalid administrator credentials');
      }
    } catch (err: any) {
      setAuthError(err.message || 'Authentication error');
    } finally {
      setSubmitting(false);
    }
  };

  // Not logged in or logged in as a normal client user without internal roles
  if (!token || !user || !hasInternalRole(user.role)) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#141414] border border-white/10 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="size-12 rounded-2xl bg-gradient-to-br from-[#4F6B85] to-[#161616] border border-white/20 flex items-center justify-center mx-auto shadow-lg">
              <ShieldCheck className="size-6 text-[#C9A84C]" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white uppercase font-mono">
              Orillusive<span className="text-[#4F6B85]">.</span> Control Center
            </h1>
            <p className="text-xs text-[#888888]">
              {user && !hasInternalRole(user.role)
                ? `Logged in as ${user.email} (${user.role}). Administrator role authorization is required to access the internal control center.`
                : 'Please authenticate with your administrator account to access platform telemetry and database control.'}
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <ShieldAlert className="size-4 shrink-0 text-red-400" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#888888] font-mono uppercase mb-1">Admin Email:</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@orillusive.com"
                className="w-full bg-[#1C1C1C] border border-white/10 text-white p-3 rounded-xl focus:outline-none focus:border-[#4F6B85]"
              />
            </div>

            <div>
              <label className="block text-[#888888] font-mono uppercase mb-1">Password:</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#1C1C1C] border border-white/10 text-white p-3 rounded-xl focus:outline-none focus:border-[#4F6B85]"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-[#4F6B85] hover:bg-[#3B5268] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin text-[#C9A84C]" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Lock className="size-3.5" />
                  <span>Enter Control Center</span>
                  <ArrowRight className="size-3.5" />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-white/5">
            <a href="/" className="text-[11px] text-[#888888] hover:text-white transition-colors">
              ← Return to public website
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Check specific sub-role restrictions if specified
  if (allowedRoles && allowedRoles.length > 0) {
    const isSuperAdminUser = user.role === 'SUPER_ADMIN' || user.role === 'admin';
    const isAllowed = isSuperAdminUser || allowedRoles.includes(user.role);

    if (!isAllowed) {
      return (
        <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col items-center justify-center p-6 font-sans text-center">
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
