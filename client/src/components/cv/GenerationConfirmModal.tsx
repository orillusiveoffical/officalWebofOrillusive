import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, X, Loader2, FileCheck } from 'lucide-react';

interface Props {
  isOpen: boolean;
  cost: number;
  currentBalance: number;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const GenerationConfirmModal: React.FC<Props> = ({
  isOpen,
  cost,
  currentBalance,
  onClose,
  onConfirm,
  loading
}) => {
  if (!isOpen) return null;

  const remaining = currentBalance - cost;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-black/10 text-[#111111] text-center space-y-5"
        >
          <button
            onClick={onClose}
            disabled={loading}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#F7F7F5] text-[#888888] disabled:opacity-50"
          >
            <X className="size-4" />
          </button>

          <div className="size-14 rounded-2xl bg-[#4F6B85]/10 border border-[#4F6B85]/20 text-[#4F6B85] flex items-center justify-center mx-auto shadow-sm">
            <FileCheck className="size-7" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#111111]">Generate Professional CV</h3>
            <p className="text-xs text-[#666666] leading-relaxed mt-1">
              Ready to produce your final print-safe PDF document?
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-black/5 space-y-2 text-xs">
            <div className="flex justify-between items-center text-[#555555]">
              <span>Generation Cost:</span>
              <span className="font-bold text-[#111111] font-mono">{cost} Credits</span>
            </div>
            <div className="flex justify-between items-center text-[#555555]">
              <span>Current Balance:</span>
              <span className="font-bold text-[#4F6B85] font-mono">{currentBalance} Credits</span>
            </div>
            <div className="pt-2 border-t border-black/5 flex justify-between items-center font-bold text-[#111111]">
              <span>Remaining Balance:</span>
              <span className="font-mono text-emerald-600">{remaining} Credits</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              type="button"
              disabled={loading}
              onClick={onConfirm}
              className="btn-sheen w-full py-3.5 bg-[#111111] text-[#F7F7F5] font-bold text-xs rounded-full hover:bg-[#2C1E16] transition-all inline-flex items-center justify-center gap-2 uppercase tracking-wider shadow-md disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin text-[#C9A84C]" />
                  <span>Deducting & Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="size-4 text-[#C9A84C]" />
                  <span>Confirm & Deduct {cost} Credits</span>
                </>
              )}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className="w-full py-2 bg-transparent text-[#555555] hover:text-[#111111] font-semibold text-xs rounded-full transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
