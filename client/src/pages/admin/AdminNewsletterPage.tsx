import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Send, Download, Plus, Mail, CheckCircle2, Loader2 } from 'lucide-react';
import { safeFetch } from '../../utils/api';

export const AdminNewsletterPage: React.FC = () => {
  const { token } = useAuth();
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'subscribers' | 'campaigns'>('subscribers');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [subRes, campRes] = await Promise.all([
        safeFetch<any>('/api/admin/newsletter/subscribers', { headers: { Authorization: `Bearer ${token}` } }),
        safeFetch<any>('/api/admin/newsletter/campaigns', { headers: { Authorization: `Bearer ${token}` } })
      ]);

      if (subRes.ok && subRes.data?.success) {
        setSubscribers(subRes.data.subscribers || []);
      } else {
        setError(subRes.error || 'Failed to fetch newsletter subscribers');
      }

      if (campRes.ok && campRes.data?.success) {
        setCampaigns(campRes.data.campaigns || []);
      }
    } catch (err: any) {
      console.error('[NEWSLETTER ERROR]', err);
      setError(err?.message || 'Network error fetching newsletter data');
    } finally {
      setLoading(false);
    }
  };

  const exportSubscribersCSV = () => {
    const csvContent = 'data:text/csv;charset=utf-8,Email,Signup Date\n' +
      subscribers.map((s) => `"${s.email}","${new Date(s.createdAt).toISOString()}"`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `orillusive_subscribers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Mail className="size-6 text-blue-400" />
            <span>Newsletter Audience & Campaigns</span>
          </h1>
          <p className="text-xs text-[#888888] mt-1">
            Audience subscriber base export, campaign broadcasts, and distribution analytics.
          </p>
        </div>

        <button
          onClick={exportSubscribersCSV}
          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-2"
        >
          <Download className="size-4 text-[#C9A84C]" />
          <span>Export CSV</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-between gap-4 text-xs">
          <span>{error}</span>
          <button
            onClick={fetchData}
            className="px-3 py-1.5 rounded-xl bg-amber-500 text-[#111111] font-bold hover:bg-amber-400 transition-all"
          >
            Retry
          </button>
        </div>
      )}

      <div className="rounded-3xl bg-[#141414] border border-white/10 overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Subscribers ({subscribers.length})</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 text-[10px] font-mono uppercase text-[#888888]">
              <tr>
                <th className="p-4">Email</th>
                <th className="p-4">Subscribed Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[#CCCCCC]">
              {loading ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-[#888888] font-mono">
                    <Loader2 className="size-6 animate-spin mx-auto mb-2 text-blue-400" />
                    Loading subscriber records...
                  </td>
                </tr>
              ) : subscribers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-[#888888] font-mono">
                    No subscribers found.
                  </td>
                </tr>
              ) : (
                subscribers.map((s) => (
                  <tr key={s._id}>
                    <td className="p-4 font-mono text-white">{s.email}</td>
                    <td className="p-4 text-[11px] font-mono text-[#888888]">{new Date(s.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">SUBSCRIBED</span>
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

export default AdminNewsletterPage;
