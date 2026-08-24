import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, Users, UserCheck, Plus, Loader2, RotateCcw, ShieldAlert } from 'lucide-react';

export const AdminTeamPage: React.FC = () => {
  const { token } = useAuth();
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTeam();
  }, [token]);

  const fetchTeam = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/team', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTeam(data.team || []);
      } else {
        setError(data.error || 'Failed to fetch team members');
      }
    } catch (err: any) {
      console.error('[ADMIN TEAM ERROR]', err);
      setError(err?.message || 'Network error fetching team data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Shield className="size-6 text-[#4F6B85]" />
            <span>Internal Team & Operations Roles</span>
          </h1>
          <p className="text-xs text-[#888888] mt-1">
            Overview of internal team accounts with Super Admin, Developer, or Analytics role authorizations.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <ShieldAlert className="size-5 text-amber-400 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchTeam}
            className="px-3 py-1.5 rounded-xl bg-amber-500 text-[#111111] font-bold text-xs hover:bg-amber-400 transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="size-3" />
            <span>Retry</span>
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full py-16 text-center text-xs font-mono text-[#888888]">
            <Loader2 className="size-6 animate-spin mx-auto mb-2 text-[#4F6B85]" />
            Loading team roster...
          </div>
        ) : team.length === 0 ? (
          <div className="col-span-full p-8 text-center text-xs font-mono text-[#888888] rounded-3xl bg-[#141414] border border-white/10">
            No active internal team members found. Assign roles from Users page.
          </div>
        ) : (
          team.map((member) => (
            <div key={member._id} className="p-5 rounded-2xl bg-[#141414] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="font-bold text-white text-sm">{member.name}</div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                  member.role === 'SUPER_ADMIN' || member.role === 'admin'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : member.role === 'DEVELOPER'
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {member.role}
                </span>
              </div>
              <div className="text-xs font-mono text-[#888888]">{member.email}</div>
              <div className="pt-2 text-[10px] font-mono text-[#666666] border-t border-white/5">
                Joined: {new Date(member.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminTeamPage;
