import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  Search,
  Plus,
  Shield,
  Sparkles,
  Ban,
  CheckCircle,
  RefreshCw,
  Edit,
  Sliders,
  DollarSign,
  Loader2,
  X
} from 'lucide-react';

export const AdminUsersPage: React.FC = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  // Modals state
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [creditModalOpen, setCreditModalOpen] = useState(false);
  const [newRole, setNewRole] = useState('client');
  const [creditAmount, setCreditAmount] = useState('50');
  const [creditReason, setCreditReason] = useState('Promotional Bonus');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [token, search, roleFilter]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (search) query.append('search', search);
      if (roleFilter) query.append('role', roleFilter);

      const res = await fetch(`/api/admin/users?${query.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error('[ADMIN USERS ERROR]', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async () => {
    if (!selectedUser) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/users/${selectedUser._id}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ role: newRole })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRoleModalOpen(false);
        fetchUsers();
      } else {
        alert(data.error || 'Failed to update role');
      }
    } catch (err: any) {
      alert(err.message || 'Error updating role');
    } finally {
      setUpdating(false);
    }
  };

  const handleToggleStatus = async (userObj: any) => {
    const nextStatus = userObj.status === 'suspended' ? 'active' : 'suspended';
    if (!confirm(`Are you sure you want to set account status for ${userObj.email} to ${nextStatus.toUpperCase()}?`)) return;

    try {
      const res = await fetch(`/api/admin/users/${userObj._id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: nextStatus })
      });
      if (res.ok) {
        fetchUsers();
      }
    } catch (err) {
      alert('Failed to change user status');
    }
  };

  const handleAdjustCredits = async () => {
    if (!selectedUser) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/users/${selectedUser._id}/credits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: Number(creditAmount),
          reason: creditReason
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCreditModalOpen(false);
        fetchUsers();
      } else {
        alert(data.error || 'Failed to adjust credits');
      }
    } catch (err: any) {
      alert(err.message || 'Credit adjustment error');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Users className="size-6 text-[#4F6B85]" />
            <span>User Accounts & Permissions</span>
          </h1>
          <p className="text-xs text-[#888888] mt-1">
            Manage client accounts, internal team roles (Super Admin, Developer, Analytics), credit balances, and suspensions.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#141414] border border-white/10">
        <div className="flex items-center gap-3 flex-1 min-w-[240px]">
          <Search className="size-4 text-[#888888]" />
          <input
            type="text"
            placeholder="Search by user name or email address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-xs text-white placeholder-[#666666] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-[#1C1C1C] border border-white/10 text-xs font-semibold text-white px-3 py-2 rounded-xl focus:outline-none"
          >
            <option value="">All Roles</option>
            <option value="SUPER_ADMIN">SUPER ADMIN</option>
            <option value="DEVELOPER">DEVELOPER</option>
            <option value="ANALYTICS">ANALYTICS</option>
            <option value="client">Client User</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-3xl bg-[#141414] border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 text-[10px] font-mono uppercase tracking-wider text-[#888888] border-b border-white/10">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Credits</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[#CCCCCC]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#888888] font-mono">
                    <Loader2 className="size-6 animate-spin mx-auto mb-2 text-[#4F6B85]" />
                    Loading user records...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#888888] font-mono">
                    No users matching criteria.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u._id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white">{u.name}</div>
                      <div className="text-[11px] text-[#888888] font-mono">{u.email}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        u.role === 'SUPER_ADMIN' || u.role === 'admin'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : u.role === 'DEVELOPER'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : u.role === 'ANALYTICS'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-white/10 text-[#AAAAAA]'
                      }`}>
                        {u.role || 'client'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        u.status === 'suspended'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {u.status || 'active'}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-bold text-white">
                      <span className="flex items-center gap-1">
                        <Sparkles className="size-3.5 text-[#C9A84C]" />
                        <span>{u.credits ?? 25}</span>
                      </span>
                    </td>
                    <td className="p-4 text-[11px] font-mono text-[#888888]">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setSelectedUser(u);
                          setNewRole(u.role || 'client');
                          setRoleModalOpen(true);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white text-[11px] font-semibold transition-all border border-white/10"
                        title="Change Role"
                      >
                        Role
                      </button>

                      <button
                        onClick={() => {
                          setSelectedUser(u);
                          setCreditModalOpen(true);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#C9A84C]/20 hover:bg-[#C9A84C]/30 text-[#C9A84C] border border-[#C9A84C]/40 text-[11px] font-semibold transition-all"
                        title="Adjust Credits"
                      >
                        + Credits
                      </button>

                      <button
                        onClick={() => handleToggleStatus(u)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all border ${
                          u.status === 'suspended'
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                            : 'bg-red-500/20 text-red-400 border-red-500/40'
                        }`}
                      >
                        {u.status === 'suspended' ? 'Activate' : 'Suspend'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Change Modal */}
      {roleModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl bg-[#161616] border border-white/15 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white">Assign Role to {selectedUser.name}</h3>
              <button onClick={() => setRoleModalOpen(false)} className="text-[#888888] hover:text-white">
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-3">
              <label className="block text-xs text-[#888888] uppercase font-mono">Select Internal Dashboard Role:</label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full bg-[#222222] border border-white/15 text-xs text-white p-3 rounded-xl focus:outline-none"
              >
                <option value="client">Client User (NO INTERNAL ROLE)</option>
                <option value="SUPER_ADMIN">SUPER ADMIN (Full Unrestricted Access)</option>
                <option value="DEVELOPER">DEVELOPER (Tech Issues, Logs, CMS)</option>
                <option value="ANALYTICS">ANALYTICS (Traffic, DB Health, Reports)</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setRoleModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 text-xs text-[#AAAAAA] hover:text-white"
              >
                Cancel
              </button>
              <button
                disabled={updating}
                onClick={handleUpdateRole}
                className="px-5 py-2 rounded-xl bg-[#4F6B85] text-xs font-bold text-white hover:bg-[#3B5268] flex items-center gap-2"
              >
                {updating ? <Loader2 className="size-3.5 animate-spin" /> : 'Save Role'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Credit Adjustment Modal */}
      {creditModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl bg-[#161616] border border-white/15 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white">Adjust Credits — {selectedUser.name}</h3>
              <button onClick={() => setCreditModalOpen(false)} className="text-[#888888] hover:text-white">
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#888888] uppercase font-mono mb-1">Credit Amount (+ to add, - to deduct):</label>
                <input
                  type="number"
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(e.target.value)}
                  className="w-full bg-[#222222] border border-white/15 text-white p-3 rounded-xl focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[#888888] uppercase font-mono mb-1">Audit Log Reason:</label>
                <input
                  type="text"
                  value={creditReason}
                  onChange={(e) => setCreditReason(e.target.value)}
                  className="w-full bg-[#222222] border border-white/15 text-white p-3 rounded-xl focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setCreditModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 text-xs text-[#AAAAAA] hover:text-white"
              >
                Cancel
              </button>
              <button
                disabled={updating}
                onClick={handleAdjustCredits}
                className="px-5 py-2 rounded-xl bg-[#C9A84C] text-xs font-bold text-[#111111] hover:bg-[#b0913e] flex items-center gap-2"
              >
                {updating ? <Loader2 className="size-3.5 animate-spin" /> : 'Confirm Adjustment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
