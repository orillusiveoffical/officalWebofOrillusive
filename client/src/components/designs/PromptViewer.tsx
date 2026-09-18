import React, { useState } from 'react';
import { Copy, Check, Sparkles, Lock, Bot, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PromptViewerProps {
  reactPrompt?: string;
  htmlPrompt?: string;
  isLocked?: boolean;
  onOpenUpgrade?: () => void;
}

export const PromptViewer: React.FC<PromptViewerProps> = ({
  reactPrompt,
  htmlPrompt,
  isLocked = false,
  onOpenUpgrade
}) => {
  const [activeTab, setActiveTab] = useState<'react' | 'html'>('react');
  const [copied, setCopied] = useState(false);

  const getActivePrompt = () => {
    if (activeTab === 'react') return reactPrompt || '';
    return htmlPrompt || '';
  };

  const handleCopy = () => {
    if (isLocked) return;
    navigator.clipboard.writeText(getActivePrompt());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-2xs space-y-4">
      {/* Top Bar */}
      <div className="bg-[#FAF9F7] border-b border-gray-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('react')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'react'
                ? 'bg-black text-white'
                : 'text-gray-600 hover:text-black hover:bg-gray-50'
            }`}
          >
            <Sparkles size={13} className="text-amber-400" /> React AI Prompt
          </button>

          <button
            onClick={() => setActiveTab('html')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'html'
                ? 'bg-black text-white'
                : 'text-gray-600 hover:text-black hover:bg-gray-50'
            }`}
          >
            <Sparkles size={13} className="text-blue-400" /> HTML/CSS AI Prompt
          </button>
        </div>

        {!isLocked && (
          <button
            onClick={handleCopy}
            className="px-3.5 py-1.5 bg-black hover:bg-gray-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            {copied ? 'Prompt Copied!' : 'Copy AI Prompt'}
          </button>
        )}
      </div>

      {/* Prompt Body */}
      {isLocked ? (
        <div className="py-14 px-6 text-center bg-[#0D0F12] text-white flex flex-col items-center justify-center space-y-4 rounded-xl mx-4 mb-4">
          <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-400">
            <Lock size={22} />
          </div>
          <h3 className="text-xl font-bold tracking-tight">
            Authentic AI Prompt Locked
          </h3>
          <p className="text-xs text-gray-400 max-w-md leading-relaxed">
            The exact AI generation prompt describing layout, tokens, responsive behavior, and animation rules is available for subscribed members.
          </p>
          <div className="pt-2">
            <Link
              to="/pricing"
              className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-gray-100 shadow-md transition-colors"
            >
              Unlock All Prompts ($9/mo)
            </Link>
          </div>
        </div>
      ) : (
        <div className="p-5 space-y-4">
          <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-gray-800 whitespace-pre-wrap font-mono leading-relaxed">
            {getActivePrompt()}
          </div>

          <div className="p-3.5 bg-amber-50/60 border border-amber-200/80 rounded-xl flex items-start gap-3">
            <Lightbulb size={16} className="text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <span className="font-bold">Model Tip:</span> Paste this prompt directly into Claude 3.7, GPT-4o, or Gemini 2.0 Pro along with your framework preference to reproduce this exact UI design.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
