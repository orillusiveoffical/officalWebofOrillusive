import React, { useState, useEffect } from 'react';
import { Sparkles, Check, ShieldCheck, CreditCard, ArrowRight, History } from 'lucide-react';
import { CreditPackage, CreditTransaction } from '../../types/cv';
import { useAuth } from '../../context/AuthContext';
import { CreditPurchaseModal } from '../../components/cv/CreditPurchaseModal';

export const CVCreditsPage: React.FC = () => {
  const { user, token, updateUserCredits } = useAuth();
  const [packages, setPackages] = useState<CreditPackage[]>([]);
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);

  useEffect(() => {
    fetchPackages();
    if (token) {
      fetchTransactions();
    }
  }, [token]);

  const fetchPackages = async () => {
    try {
      const res = await fetch('/api/packages');
      const data = await res.json();
      if (res.ok && data.packages) {
        setPackages(data.packages);
      }
    } catch (err) {
      console.warn('Failed to load packages');
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
      console.warn('Failed to load transactions');
    }
  };

  const userCredits = user?.credits ?? 25;

  return (
    <div className="pt-28 sm:pt-36 pb-20 px-4 sm:px-8 lg:px-16 bg-[#F7F7F5] text-[#111111] font-sans min-h-screen">
      <div className="mx-auto max-w-[1200px] space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3 py-1 rounded-full bg-[#4F6B85]/10 text-[#4F6B85] text-[10px] font-bold uppercase tracking-wider">
            SaaS Monetization & Credit Packages
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111111]">
            CV Maker Credits
          </h1>
          <p className="text-xs sm:text-sm text-[#555555]">
            Build, edit, and preview all your resumes for free. Spend credits only when you generate and export professional PDF documents.
          </p>
        </div>

        {/* Current Balance Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#111111] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-[#C9A84C]/20 text-[#C9A84C]">
              <Sparkles className="size-8" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C9A84C]">Current Balance</span>
              <div className="text-3xl font-black">{userCredits} Credits</div>
            </div>
          </div>

          <button
            onClick={() => setPurchaseModalOpen(true)}
            className="btn-sheen px-8 py-3.5 rounded-full bg-[#C9A84C] text-[#111111] font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-md"
          >
            + Get Credits Now
          </button>
        </div>

        {/* Credit Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => {
            const pricePerCredit = (pkg.price / pkg.credits).toFixed(2);
            return (
              <div
                key={pkg.packageId}
                className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between relative transition-all duration-300 ${
                  pkg.popular
                    ? 'bg-white border-[#111111] ring-2 ring-[#111111]/20 shadow-xl scale-[1.03]'
                    : 'bg-white border-black/10 hover:border-black/20 hover:shadow-md'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3.5 right-6 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C9A84C] text-[#111111] shadow-xs">
                    Most Popular Choice
                  </span>
                )}

                <div className="space-y-4">
                  <h3 className="text-lg font-bold uppercase tracking-wider text-[#111111]">{pkg.name}</h3>
                  <div className="text-4xl font-black text-[#111111]">
                    {pkg.credits} <span className="text-xs font-semibold text-[#666666]">Credits</span>
                  </div>
                  <p className="text-xs text-[#555555] leading-relaxed">{pkg.description}</p>
                </div>

                <div className="mt-8 pt-6 border-t border-black/5 space-y-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-bold text-[#111111]">${pkg.price}</span>
                    <span className="text-xs font-mono text-[#888888]">${pricePerCredit}/credit</span>
                  </div>

                  <button
                    onClick={() => setPurchaseModalOpen(true)}
                    className={`w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-xs ${
                      pkg.popular
                        ? 'bg-[#111111] text-white hover:bg-[#2C1E16]'
                        : 'bg-[#F7F7F5] text-[#111111] hover:bg-[#4F6B85] hover:text-white'
                    }`}
                  >
                    Select {pkg.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transaction History Ledger */}
        {transactions.length > 0 && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/10 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-black/5 pb-3">
              <div className="flex items-center gap-2">
                <History className="size-4 text-[#4F6B85]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111]">Transaction History Ledger</h3>
              </div>
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
                  {transactions.map((tx) => (
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
