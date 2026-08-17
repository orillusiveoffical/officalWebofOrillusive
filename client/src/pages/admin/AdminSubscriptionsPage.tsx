import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CreditCard, CheckCircle, Clock, ShieldCheck, RefreshCw } from 'lucide-react';

export const AdminSubscriptionsPage: React.FC = () => {
  const { token } = useAuth();
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, [token]);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/overview', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPayments(data.recentUsers || []);
      }
    } catch (err) {
      console.error('[ADMIN SUBSCRIPTIONS ERROR]', err);
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
      </div>

      <div className="rounded-3xl bg-[#141414] border border-white/10 p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white">Credit Package Transactions</h3>
        <p className="text-xs text-[#888888]">All payment sessions and credit deposits are verified via 256-bit encrypted backend ledger.</p>
      </div>
    </div>
  );
};

export default AdminSubscriptionsPage;
