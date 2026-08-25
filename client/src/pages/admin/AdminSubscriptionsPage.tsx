import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CreditCard, CheckCircle, Clock, ShieldCheck, RefreshCw, Loader2, Sparkles, DollarSign } from 'lucide-react';

export const AdminSubscriptionsPage: React.FC = () => {
  const { token } = useAuth();
  const [payments, setPayments] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({ totalRevenue: 0, totalTransactions: 0, completedTransactions: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, [token]);

  const [error, setError] = useState<string | null>(null);

  const fetchPayments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/subscriptions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPayments(data.payments || []);
        setTransactions(data.creditTransactions || []);
        if (data.stats) setStats(data.stats);
      } else {
        setError(data.error || 'Failed to load subscription metrics');
      }
    } catch (err: any) {
      console.error('[ADMIN SUBSCRIPTIONS ERROR]', err);
      setError(err?.message || 'Network error fetching subscription data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <CreditCard className="size-6 text-[#C9A84C]" />
            <span>Subscriptions & Payment Telemetry</span>
          </h1>
          <p className="text-xs text-[#888888] mt-1">
            Real-time transaction log monitoring, package sales, and payment verification auditing.
          </p>
        </div>

        <button
          onClick={fetchPayments}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-all flex items-center gap-2 border border-white/10"
        >
          <RefreshCw className="size-3.5" />
          <span>Refresh Telemetry</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-between gap-4 text-xs">
          <span>{error}</span>
          <button
            onClick={fetchPayments}
            className="px-3 py-1.5 rounded-xl bg-amber-500 text-[#111111] font-bold hover:bg-amber-400 transition-all"
          >
            Retry
          </button>
        </div>
      )}

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#141414] border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#888888]">
            <span className="text-[10px] font-mono uppercase">Verified Revenue</span>
            <DollarSign className="size-4 text-emerald-400" />
          </div>
          <div className="mt-3 text-3xl font-black text-white font-mono">
            ${(stats.totalRevenue || 0).toFixed(2)}
          </div>
          <div className="text-[10px] text-emerald-400 mt-1 font-mono">256-bit Encrypted Ledger</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#141414] border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#888888]">
            <span className="text-[10px] font-mono uppercase">Completed Purchases</span>
            <CheckCircle className="size-4 text-blue-400" />
          </div>
          <div className="mt-3 text-3xl font-black text-white font-mono">
            {stats.completedTransactions || 0}
          </div>
          <div className="text-[10px] text-[#888888] mt-1 font-mono">Out of {stats.totalTransactions || 0} initiated</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#141414] border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#888888]">
            <span className="text-[10px] font-mono uppercase">Active Credit Packages</span>
            <Sparkles className="size-4 text-[#C9A84C]" />
          </div>
          <div className="mt-3 text-3xl font-black text-white font-mono">3 Tiers</div>
          <div className="text-[10px] text-[#C9A84C] mt-1 font-mono">Starter, Popular, Pro Studio</div>
        </div>
      </div>

      {/* Payment Ledger Table */}
      <div className="rounded-3xl bg-[#141414] border border-white/10 overflow-hidden shadow-xl space-y-4">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Payment Checkout Transactions</h3>
          <span className="text-[10px] font-mono text-[#888888]">{payments.length} Sessions Logged</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 text-[10px] font-mono uppercase text-[#888888]">
              <tr>
                <th className="p-4">Transaction ID</th>
                <th className="p-4">Package</th>
                <th className="p-4">Provider</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[#CCCCCC]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#888888] font-mono">
                    <Loader2 className="size-6 animate-spin mx-auto mb-2 text-[#C9A84C]" />
                    Loading payment telemetry...
                  </td>
                </tr>
              ) : payments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#888888] font-mono">
                    No payment transactions recorded yet.
                  </td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr key={p._id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono font-bold text-white text-[11px]">{p.transactionId}</td>
                    <td className="p-4 uppercase font-semibold text-white">{p.packageId} (+{p.credits} credits)</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[10px] uppercase">
                        {p.paymentProvider || 'stripe'}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-bold text-white">${p.amount?.toFixed(2)} {p.currency || 'USD'}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        p.paymentStatus === 'Completed'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {p.paymentStatus}
                      </span>
                    </td>
                    <td className="p-4 text-[11px] font-mono text-[#888888]">
                      {new Date(p.createdAt).toLocaleString()}
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

export default AdminSubscriptionsPage;
