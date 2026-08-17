import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Check, ShieldCheck, CreditCard, ArrowRight, Loader2 } from 'lucide-react';
import { CreditPackage } from '../../types/cv';
import { useAuth } from '../../context/AuthContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (newBalance: number) => void;
}

export const CreditPurchaseModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const { user, token } = useAuth();

  const [packages, setPackages] = useState<CreditPackage[]>([]);
  const [selectedPkg, setSelectedPkg] = useState<CreditPackage | null>(null);
  const [step, setStep] = useState<'select' | 'review' | 'payment' | 'success'>('select');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{ creditsAdded: number; newBalance: number } | null>(null);

  // Payment form mock fields
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardHolder, setCardHolder] = useState(user?.name || 'Alex Mercer');

  useEffect(() => {
    if (isOpen) {
      fetchPackages();
      setStep('select');
      setErrorMsg(null);
    }
  }, [isOpen]);

  const fetchPackages = async () => {
    try {
      const res = await fetch('/api/packages');
      const data = await res.json();
      if (res.ok && data.packages) {
        setPackages(data.packages);
        const popular = data.packages.find((p: CreditPackage) => p.popular) || data.packages[0];
        setSelectedPkg(popular);
      }
    } catch (err) {
      console.warn('Fallback packages used');
    }
  };

  const handleCheckout = async () => {
    if (!selectedPkg || !user || !token) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      // 1. Create Checkout Session
      const checkoutRes = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          packageId: selectedPkg.packageId,
          paymentProvider: 'stripe'
        })
      });
      const checkoutData = await checkoutRes.json();

      if (!checkoutRes.ok || !checkoutData.success) {
        throw new Error(checkoutData.error || 'Failed to initialize payment checkout');
      }

      // 2. Verify Payment Securely on Backend
      const verifyRes = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          transactionId: checkoutData.payment.transactionId
        })
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok || !verifyData.success) {
        throw new Error(verifyData.error || 'Payment verification failed');
      }

      setSuccessInfo({
        creditsAdded: verifyData.creditsAdded,
        newBalance: verifyData.newBalance
      });
      setStep('success');

      if (onSuccess) {
        onSuccess(verifyData.newBalance);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Payment processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-black/10 text-[#111111] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#4F6B85]/10 text-[#4F6B85]">
                <Sparkles className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight text-[#111111]">Get Credits</h3>
                <p className="text-xs text-[#666666]">Purchase credits to generate professional CVs</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#F7F7F5] text-[#888888] hover:text-[#111111] transition-colors"
            >
              <X className="size-4.5" />
            </button>
          </div>

          {/* Error Notice */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {/* STEP 1 & 2: Package Select & Review */}
          {(step === 'select' || step === 'review') && (
            <div className="space-y-6">
              {/* Credit Packages List */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {packages.map((pkg) => {
                  const isSelected = selectedPkg?.packageId === pkg.packageId;
                  const pricePerCredit = (pkg.price / pkg.credits).toFixed(2);

                  return (
                    <div
                      key={pkg.packageId}
                      onClick={() => setSelectedPkg(pkg)}
                      className={`cursor-pointer p-4 rounded-2xl border text-left transition-all duration-300 relative flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#111111] text-white border-[#111111] shadow-lg scale-[1.02]'
                          : 'bg-[#F7F7F5] text-[#111111] border-black/10 hover:border-black/20 hover:bg-white'
                      }`}
                    >
                      {pkg.popular && (
                        <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#C9A84C] text-[#111111] shadow-xs">
                          Most Popular
                        </span>
                      )}

                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider">{pkg.name}</h4>
                        <div className="text-2xl font-black font-sans mt-2">
                          {pkg.credits} <span className="text-xs font-medium opacity-80">Credits</span>
                        </div>
                        <p className={`text-[10px] mt-1 line-clamp-2 ${isSelected ? 'text-white/80' : 'text-[#666666]'}`}>
                          {pkg.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-current/10 flex items-end justify-between">
                        <div>
                          <div className="text-base font-extrabold">${pkg.price}</div>
                          <div className={`text-[9px] font-mono ${isSelected ? 'text-white/70' : 'text-[#888888]'}`}>
                            ${pricePerCredit}/credit
                          </div>
                        </div>
                        <div className={`size-5 rounded-full border flex items-center justify-center ${isSelected ? 'bg-[#4F6B85] border-white text-white' : 'border-black/20'}`}>
                          {isSelected && <Check className="size-3" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Summary & Checkout Action */}
              {selectedPkg && (
                <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-black/10 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#555555]">Selected Package:</span>
                    <span className="font-bold text-[#111111]">{selectedPkg.name} ({selectedPkg.credits} Credits)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#555555]">Total Price:</span>
                    <span className="text-base font-bold text-[#111111]">${selectedPkg.price} USD</span>
                  </div>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleCheckout}
                    className="btn-sheen w-full min-h-12 py-3 bg-[#111111] text-[#F7F7F5] font-bold text-xs rounded-full hover:bg-[#2C1E16] hover:scale-[1.02] active:scale-[0.98] transition-all inline-flex items-center justify-center gap-2 uppercase tracking-wider shadow-md disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="size-4 animate-spin text-[#C9A84C]" />
                        <span>Verifying & Adding Credits...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="size-4 text-[#C9A84C]" />
                        <span>Complete Purchase — ${selectedPkg.price}</span>
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </button>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#777777]">
                <ShieldCheck className="size-3.5 text-[#4F6B85]" />
                <span>256-bit Encrypted Backend Verification • Instant Credit Deposit</span>
              </div>
            </div>
          )}

          {/* STEP 3: Success Confirmation */}
          {step === 'success' && successInfo && (
            <div className="text-center py-6 space-y-4 font-sans">
              <div className="size-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <Check className="size-8 stroke-[3]" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#111111]">Payment Successful!</h3>
                <p className="text-sm font-semibold text-[#4F6B85] mt-1">
                  You received +{successInfo.creditsAdded} Credits
                </p>
                <p className="text-xs text-[#666666] mt-2">
                  New Total Balance: <strong className="text-[#111111]">{successInfo.newBalance} Credits</strong>
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="btn-sheen px-8 py-3.5 bg-[#111111] text-white font-bold text-xs rounded-full hover:bg-[#2C1E16] transition-all uppercase tracking-wider shadow-md"
              >
                Continue Creating CV
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
