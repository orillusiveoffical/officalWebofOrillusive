import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Sparkles, 
  FileText, 
  Copy, 
  Trash2, 
  Edit3, 
  Download, 
  CreditCard,
  History,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { CVData, CreditTransaction } from '../../types/cv';
import { useAuth } from '../../context/AuthContext';
import { CreditPurchaseModal } from '../../components/cv/CreditPurchaseModal';
import { printOrExportCV } from '../../utils/pdfExport';

export const CVDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, token, updateUserCredits } = useAuth();

  const [cvs, setCvs] = useState<CVData[]>([]);
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);
  const [filter, setFilter] = useState<'all' | 'draft' | 'generated'>('all');
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchUserCVs();
      fetchTransactions();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUserCVs = async () => {
    try {
      const res = await fetch('/api/cvs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.cvs) {
        setCvs(data.cvs);
      }
    } catch (err) {
      console.warn('Using local CV list');
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await fetch('/api/credits/transactions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.transactions) {
        setTransactions(data.transactions);
      }
    } catch (err) {
      console.warn('Failed to fetch transactions');
    }
  };

  const handleDuplicate = async (cvId: string) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/cvs/${cvId}/duplicate`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.cv) {
        setCvs((prev) => [data.cv, ...prev]);
      }
    } catch (err) {
      console.error('Failed to duplicate CV', err);
    }
  };

  const handleDelete = async (cvId: string) => {
    if (!token || !confirm('Are you sure you want to delete this CV draft?')) return;
    try {
      const res = await fetch(`/api/cvs/${cvId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setCvs((prev) => prev.filter((c) => c._id !== cvId));
      }
    } catch (err) {
      console.error('Failed to delete CV', err);
    }
  };

  const filteredCVs = cvs.filter((c) => {
    if (filter === 'draft') return c.status === 'draft';
    if (filter === 'generated') return c.status === 'generated';
    return true;
  });

  const userCredits = user?.credits ?? 25;

  return (
    <div className="pt-28 sm:pt-36 pb-20 px-4 sm:px-8 lg:px-16 bg-[#F7F7F5] text-[#111111] font-sans min-h-screen">
      <div className="mx-auto max-w-[1360px] space-y-10 sm:space-y-14">
        
        {/* Welcome Header & Credits Widget */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 sm:p-10 rounded-3xl bg-white border border-black/10 shadow-xs">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-[#4F6B85]/10 text-[#4F6B85] text-[10px] font-bold uppercase tracking-wider">
              Orillusive SaaS Product
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111]">
              Welcome back, {user?.name || 'Professional'}
            </h1>
            <p className="text-xs sm:text-sm text-[#555555]">
              Create, customize, preview, and generate job-ready professional CVs.
            </p>
          </div>

          {/* User Credits Card */}
          <div className="p-5 rounded-2xl bg-[#111111] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0 w-full lg:w-auto min-w-[320px]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]">Credits Balance</span>
              <div className="text-3xl font-black font-sans mt-0.5">
                {userCredits} <span className="text-xs font-semibold text-white/70">Credits</span>
              </div>
            </div>
            <button
              onClick={() => setPurchaseModalOpen(true)}
              className="btn-sheen px-5 py-2.5 rounded-full bg-[#C9A84C] text-[#111111] font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-sm shrink-0"
            >
              + Get More Credits
            </button>
          </div>
        </div>

        {/* Dashboard Main Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-black/10 text-xs font-semibold">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl transition-all ${filter === 'all' ? 'bg-[#111111] text-white shadow-2xs font-bold' : 'text-[#666666] hover:text-[#111111]'}`}
            >
              All CVs ({cvs.length})
            </button>
            <button
              onClick={() => setFilter('draft')}
              className={`px-4 py-2 rounded-xl transition-all ${filter === 'draft' ? 'bg-[#111111] text-white shadow-2xs font-bold' : 'text-[#666666] hover:text-[#111111]'}`}
            >
              Drafts ({cvs.filter((c) => c.status === 'draft').length})
            </button>
            <button
              onClick={() => setFilter('generated')}
              className={`px-4 py-2 rounded-xl transition-all ${filter === 'generated' ? 'bg-[#111111] text-white shadow-2xs font-bold' : 'text-[#666666] hover:text-[#111111]'}`}
            >
              Generated ({cvs.filter((c) => c.status === 'generated').length})
            </button>
          </div>

          <Link
            to="/cv-maker/builder"
            className="btn-sheen inline-flex min-h-12 items-center justify-center gap-2.5 px-6 rounded-full bg-[#111111] text-[#F7F7F5] font-bold text-xs uppercase tracking-wider hover:bg-[#2C1E16] hover:scale-105 active:scale-95 transition-all shadow-md"
          >
            <Plus className="size-4 text-[#C9A84C]" />
            <span>Create New CV</span>
          </Link>
        </div>

        {/* CV Grid Cards */}
        {filteredCVs.length > 0 ? (
          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredCVs.map((cv) => (
              <div
                key={cv._id || cv.title}
                className="p-6 rounded-3xl bg-white border border-black/10 shadow-xs flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-0.5 rounded-full bg-[#4F6B85]/10 text-[#4F6B85] text-[10px] font-bold uppercase tracking-wider">
                      {cv.templateId || 'minimal'}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      cv.status === 'generated' ? 'bg-emerald-500/10 text-emerald-700' : 'bg-black/5 text-[#777777]'
                    }`}>
                      {cv.status === 'generated' ? 'Generated' : 'Draft'}
                    </span>
                  </div>

                  <h3 className="font-bold text-xl text-[#111111] group-hover:text-[#4F6B85] transition-colors truncate">
                    {cv.title}
                  </h3>
                  <p className="text-xs text-[#666666] mt-1 truncate">
                    {cv.personalInfo?.name} • {cv.personalInfo?.title || 'No title'}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between gap-2">
                  <div className="text-[10px] font-mono text-[#888888] flex items-center gap-1">
                    <Clock className="size-3" />
                    <span>{cv.updatedAt ? new Date(cv.updatedAt).toLocaleDateString() : 'Recent'}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => navigate(`/cv-maker/builder/${cv._id}`)}
                      className="p-2 rounded-xl bg-[#F7F7F5] text-[#111111] hover:bg-[#4F6B85] hover:text-white transition-colors"
                      title="Edit CV"
                    >
                      <Edit3 className="size-3.5" />
                    </button>

                    <button
                      onClick={() => handleDuplicate(cv._id!)}
                      className="p-2 rounded-xl bg-[#F7F7F5] text-[#111111] hover:bg-[#4F6B85] hover:text-white transition-colors"
                      title="Duplicate CV"
                    >
                      <Copy className="size-3.5" />
                    </button>

                    <button
                      onClick={() => handleDelete(cv._id!)}
                      className="p-2 rounded-xl bg-[#F7F7F5] text-[#111111] hover:bg-red-600 hover:text-white transition-colors"
                      title="Delete CV"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-3xl bg-white border border-black/10 text-center space-y-4">
            <FileText className="size-10 text-[#4F6B85] mx-auto" />
            <h3 className="text-xl font-bold text-[#111111]">No CVs found</h3>
            <p className="text-xs text-[#666666]">Start your first professional resume in minutes using Orillusive CV Maker.</p>
            <Link
              to="/cv-maker/builder"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111111] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#4F6B85] transition-colors shadow-sm"
            >
              <Plus className="size-4" />
              <span>Create New CV</span>
            </Link>
          </div>
        )}

        {/* Transaction History Ledger Section */}
        {transactions.length > 0 && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/10 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-black/5 pb-3">
              <div className="flex items-center gap-2">
                <History className="size-4 text-[#4F6B85]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111]">Credit Transaction Ledger</h3>
              </div>
              <span className="text-[10px] font-mono text-[#888888]">Audit Trail ({transactions.length} entries)</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-black/5 text-[10px] uppercase font-bold text-[#777777]">
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-3">Description</th>
                    <th className="py-2.5 px-3 text-right">Amount</th>
                    <th className="py-2.5 px-3 text-right">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {transactions.slice(0, 10).map((tx) => (
                    <tr key={tx._id} className="hover:bg-[#F7F7F5]">
                      <td className="py-2.5 px-3 font-mono text-[11px] text-[#777777]">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          tx.amount > 0 ? 'bg-emerald-500/10 text-emerald-700' : 'bg-amber-500/10 text-amber-700'
                        }`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-[#333333] font-medium">{tx.description}</td>
                      <td className={`py-2.5 px-3 text-right font-mono font-bold ${tx.amount > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-[#111111] font-semibold">
                        {tx.balanceAfter}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      <CreditPurchaseModal
        isOpen={purchaseModalOpen}
        onClose={() => setPurchaseModalOpen(false)}
        onSuccess={(newBal) => updateUserCredits(newBal)}
      />
    </div>
  );
};
