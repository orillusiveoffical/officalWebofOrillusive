import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Sparkles, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  requiredCredits: number;
  availableCredits: number;
  onClose: () => void;
  onOpenGetCredits: () => void;
}

export const LowCreditModal: React.FC<Props> = ({
  isOpen,
  requiredCredits,
  availableCredits,
  onClose,
  onOpenGetCredits
}) => {
  if (!isOpen) return null;

  const needed = Math.max(0, requiredCredits - availableCredits);

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
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#F7F7F5] text-[#888888]"
          >
            <X className="size-4" />
          </button>

          <div className="size-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
            <AlertCircle className="size-7" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#111111]">Not Enough Credits</h3>
            <p className="text-xs text-[#666666] leading-relaxed mt-2">
              You need <strong className="text-[#111111] font-mono">{needed} more credit{needed === 1 ? '' : 's'}</strong> to generate this professional CV.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F7F7F5] border border-black/5 flex justify-around text-xs font-semibold">
            <div>
              <span className="block text-[10px] text-[#777777] uppercase font-bold tracking-wider">Cost</span>
              <span className="text-[#111111]">{requiredCredits} Credits</span>
            </div>
            <div className="border-r border-black/10" />
            <div>
              <span className="block text-[10px] text-[#777777] uppercase font-bold tracking-wider">Your Balance</span>
              <span className="text-[#4F6B85]">{availableCredits} Credits</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenGetCredits();
              }}
              className="btn-sheen w-full py-3.5 bg-[#111111] text-[#F7F7F5] font-bold text-xs rounded-full hover:bg-[#2C1E16] transition-all inline-flex items-center justify-center gap-2 uppercase tracking-wider shadow-md"
            >
              <Sparkles className="size-4 text-[#C9A84C]" />
              <span>Get Credits Now</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 bg-transparent text-[#555555] hover:text-[#111111] font-semibold text-xs rounded-full transition-colors"
            >
              Continue Editing CV
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
