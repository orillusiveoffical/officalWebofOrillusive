import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FileCheck, ShieldCheck, Loader2 } from 'lucide-react';

export const AdminAuditLogsPage: React.FC = () => {
  const { token } = useAuth();
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, [token]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/audit-logs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLogs(data.logs || []);
      }
    } catch (err) {
      console.error('[AUDIT LOGS ERROR]', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <FileCheck className="size-6 text-[#4F6B85]" />
            <span>Audit Trail & Activity Logs</span>
          </h1>
          <p className="text-xs text-[#888888] mt-1">
            Immutable system activity log recording all user role assignments, credit adjustments, and administrative changes.
          </p>
        </div>
      </div>

      <div className="rounded-3xl bg-[#141414] border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 text-[10px] font-mono uppercase text-[#888888] border-b border-white/10">
              <tr>
                <th className="p-4">Action</th>
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Details</th>
                <th className="p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[#CCCCCC]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#888888] font-mono">
                    <Loader2 className="size-6 animate-spin mx-auto mb-2 text-[#4F6B85]" />
                    Loading audit trail...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#888888] font-mono">
                    No audit logs recorded yet.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log._id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold text-white font-mono">{log.action}</td>
                    <td className="p-4">
                      <div className="font-semibold text-white">{log.userName}</div>
                      <div className="text-[10px] text-[#888888] font-mono">{log.userEmail}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-[#4F6B85]/20 text-[#6B90B5] text-[10px] font-mono font-bold uppercase">
                        {log.userRole}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-[#A0A0A0]">{log.details}</td>
                    <td className="p-4 text-[11px] font-mono text-[#888888]">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAuditLogsPage;
