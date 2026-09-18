import React from 'react';
import { X, Lock, Check, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PremiumPaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  designTitle?: string;
}

export const PremiumPaywallModal: React.FC<PremiumPaywallModalProps> = ({
  isOpen,
  onClose,
  designTitle
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white border border-gray-200 rounded-3xl max-w-lg w-full p-8 shadow-2xl relative space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="size-12 rounded-2xl bg-black mx-auto flex items-center justify-center text-white">
            <Lock size={20} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#4F6B85]">
            Orillusive Pro Access
          </span>
          <h3 className="text-2xl font-bold tracking-tight text-black">
            Unlock Full Production Code & AI Prompts
          </h3>
          {designTitle && (
            <p className="text-xs text-gray-500 font-medium">
              Target design: <span className="text-black font-semibold">{designTitle}</span>
            </p>
          )}
        </div>

        {/* Benefits */}
        <div className="space-y-2.5 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs">
          <div className="flex items-center gap-2.5 text-gray-800">
            <Check size={15} className="text-emerald-600 shrink-0" />
            <span>Full React (TypeScript + Tailwind) source code</span>
          </div>
          <div className="flex items-center gap-2.5 text-gray-800">
            <Check size={15} className="text-emerald-600 shrink-0" />
            <span>Matching clean HTML5 + CSS3 markup</span>
          </div>
          <div className="flex items-center gap-2.5 text-gray-800">
            <Check size={15} className="text-emerald-600 shrink-0" />
            <span>Authentic prompt engineering specs for AI models</span>
          </div>
          <div className="flex items-center gap-2.5 text-gray-800">
            <Check size={15} className="text-emerald-600 shrink-0" />
            <span>Live Token Palette Studio with real-time editing</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-2 pt-2">
          <Link
            to="/pricing"
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-gray-800 flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            Choose Subscription Plan (From $9/mo) <ArrowRight size={14} />
          </Link>
          <button
            onClick={onClose}
            className="w-full py-2.5 text-xs font-semibold text-gray-500 hover:text-black"
          >
            Continue with Free Catalog
          </button>
        </div>
      </div>
    </div>
  );
};
