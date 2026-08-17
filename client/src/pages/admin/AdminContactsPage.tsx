import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Mail,
  Search,
  MessageSquare,
  Send,
  User,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  X
} from 'lucide-react';

export const AdminContactsPage: React.FC = () => {
  const { token, user } = useAuth();
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [replyType, setReplyType] = useState<'REPLY' | 'NOTE'>('REPLY');
  const [replying, setReplying] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, [token]);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/contacts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setInquiries(data.inquiries || []);
      }
    } catch (err) {
      console.error('[ADMIN CONTACTS ERROR]', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) fetchInquiries();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleSendReply = async () => {
    if (!selectedInquiry || !replyMessage) return;
    setReplying(true);
    try {
      const res = await fetch(`/api/admin/contacts/${selectedInquiry._id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          message: replyMessage,
          type: replyType
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSelectedInquiry(data.inquiry);
        setReplyMessage('');
        fetchInquiries();
      }
    } catch (err) {
      alert('Failed to send reply');
    } finally {
      setReplying(false);
    }
  };

  const filtered = inquiries.filter((i) => !statusFilter || i.status === statusFilter);

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Mail className="size-6 text-purple-400" />
            <span>Contact & Discovery Calls CRM</span>
          </h1>
          <p className="text-xs text-[#888888] mt-1">
            Manage website project inquiries, discovery call bookings, team assignments, and response timelines.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#141414] border border-white/10">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#1C1C1C] border border-white/10 text-xs font-semibold text-white px-3 py-2 rounded-xl focus:outline-none"
        >
          <option value="">All Inquiry Statuses</option>
          <option value="NEW">NEW</option>
          <option value="PENDING">PENDING</option>
          <option value="CONTACTED">CONTACTED</option>
          <option value="CALL_SCHEDULED">CALL SCHEDULED</option>
          <option value="CONVERTED">CONVERTED</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="SPAM">SPAM</option>
        </select>
      </div>

      {/* Pipeline Table */}
      <div className="rounded-3xl bg-[#141414] border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 text-[10px] font-mono uppercase tracking-wider text-[#888888] border-b border-white/10">
              <tr>
                <th className="p-4">Client Contact</th>
                <th className="p-4">Service</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[#CCCCCC]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#888888] font-mono">
                    <Loader2 className="size-6 animate-spin mx-auto mb-2 text-purple-400" />
                    Loading contact inquiries...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#888888] font-mono">
                    No inquiries recorded yet.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item._id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white">{item.name}</div>
                      <div className="text-[11px] text-[#888888] font-mono">{item.email}</div>
                    </td>
                    <td className="p-4 font-medium text-white">{item.service}</td>
                    <td className="p-4">
                      <select
                        value={item.status}
                        onChange={(e) => handleUpdateStatus(item._id, e.target.value)}
                        className="bg-white/10 border border-white/20 text-[10px] font-bold text-white px-2.5 py-1 rounded-xl uppercase focus:outline-none"
                      >
                        <option value="NEW">NEW</option>
                        <option value="PENDING">PENDING</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="CALL_SCHEDULED">CALL SCHEDULED</option>
                        <option value="CONVERTED">CONVERTED</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="SPAM">SPAM</option>
                      </select>
                    </td>
                    <td className="p-4 text-[11px] font-mono text-[#888888]">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedInquiry(item)}
                        className="px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold hover:bg-purple-500/30 transition-all"
                      >
                        View & Reply
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Drawer & Reply Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="w-full max-w-2xl rounded-3xl bg-[#161616] border border-white/15 p-6 shadow-2xl space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{selectedInquiry.name}</h3>
                <div className="text-xs font-mono text-[#888888]">{selectedInquiry.email}</div>
              </div>
              <button onClick={() => setSelectedInquiry(null)} className="text-[#888888] hover:text-white">
                <X className="size-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs space-y-2">
              <div className="font-bold text-[#888888] uppercase font-mono">Message:</div>
              <p className="text-white leading-relaxed whitespace-pre-wrap">{selectedInquiry.message}</p>
            </div>

            {/* Reply History */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#888888]">Timeline & Responses</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                {(selectedInquiry.responseHistory || []).map((r: any, idx: number) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#888888]">
                      <span>{r.author} ({r.type})</span>
                      <span>{new Date(r.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="text-white">{r.message}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Send Reply / Internal Note Form */}
            <div className="space-y-3 pt-3 border-t border-white/10 text-xs">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setReplyType('REPLY')}
                  className={`px-3 py-1 rounded-lg font-bold text-[11px] ${
                    replyType === 'REPLY' ? 'bg-[#4F6B85] text-white' : 'bg-white/5 text-[#888888]'
                  }`}
                >
                  Reply to Client
                </button>
                <button
                  type="button"
                  onClick={() => setReplyType('NOTE')}
                  className={`px-3 py-1 rounded-lg font-bold text-[11px] ${
                    replyType === 'NOTE' ? 'bg-purple-500/30 text-purple-300' : 'bg-white/5 text-[#888888]'
                  }`}
                >
                  Internal Note
                </button>
              </div>

              <textarea
                rows={3}
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder={replyType === 'REPLY' ? 'Write email response to client...' : 'Add private team note...'}
                className="w-full bg-[#222222] border border-white/15 text-white p-3 rounded-xl focus:outline-none"
              />

              <div className="flex justify-end">
                <button
                  disabled={replying}
                  onClick={handleSendReply}
                  className="px-5 py-2 rounded-xl bg-[#4F6B85] text-xs font-bold text-white hover:bg-[#3B5268] flex items-center gap-2"
                >
                  {replying ? <Loader2 className="size-4 animate-spin" /> : <><Send className="size-3.5" /> Submit</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContactsPage;
