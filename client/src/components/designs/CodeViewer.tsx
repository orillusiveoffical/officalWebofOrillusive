import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, Lock, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CodeViewerProps {
  reactCode?: string;
  htmlCode?: string;
  cssCode?: string;
  isLocked?: boolean;
  slug: string;
  onOpenUpgrade?: () => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  reactCode,
  htmlCode,
  cssCode,
  isLocked = false,
  slug,
  onOpenUpgrade
}) => {
  const [activeTab, setActiveTab] = useState<'react' | 'html'>('react');
  const [copied, setCopied] = useState(false);

  const getActiveCode = () => {
    if (activeTab === 'react') return reactCode || '';
    return `${htmlCode || ''}\n\n/* ================= CSS STYLES ================= */\n${cssCode || ''}`;
  };

  const handleCopy = () => {
    if (isLocked) return;
    const code = getActiveCode();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (isLocked) return;
    const code = getActiveCode();
    const filename = activeTab === 'react' ? `${slug}.tsx` : `${slug}.html`;
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="code" className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-2xs">
      {/* Top Code Bar */}
      <div className="bg-[#FAF9F7] border-b border-gray-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Language Tabs */}
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('react')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'react'
                ? 'bg-black text-white'
                : 'text-gray-600 hover:text-black hover:bg-gray-50'
            }`}
          >
            <FileCode size={13} /> React + Tailwind
          </button>

          <button
            onClick={() => setActiveTab('html')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'html'
                ? 'bg-black text-white'
                : 'text-gray-600 hover:text-black hover:bg-gray-50'
            }`}
          >
            <FileCode size={13} /> HTML5 + CSS3
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {!isLocked && (
            <>
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Download source file"
              >
                <Download size={13} /> Download .{activeTab === 'react' ? 'tsx' : 'html'}
              </button>

              <button
                onClick={handleCopy}
                className="px-3.5 py-1.5 bg-black hover:bg-gray-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                {copied ? 'Copied to Clipboard!' : 'Copy Code'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Code Display or Locked Paywall Gate */}
      {isLocked ? (
        <div className="py-16 px-6 text-center bg-[#0D0F12] text-white flex flex-col items-center justify-center space-y-4">
          <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-400">
            <Lock size={22} />
          </div>
          <h3 className="text-xl font-bold tracking-tight">
            Premium Production Code Locked
          </h3>
          <p className="text-xs text-gray-400 max-w-md leading-relaxed">
            The complete React component, HTML structure, and token mappings are protected for active subscribers.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <Link
              to="/pricing"
              className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-gray-100 shadow-md transition-colors"
            >
              Upgrade Subscription ($9/mo)
            </Link>
            {onOpenUpgrade && (
              <button
                onClick={onOpenUpgrade}
                className="px-5 py-2.5 rounded-xl border border-white/20 text-white font-semibold text-xs hover:bg-white/10 transition-colors"
              >
                View Plans
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="p-4 bg-[#181A1F] text-gray-200 font-mono text-xs overflow-x-auto max-h-[500px] leading-relaxed">
          <pre>
            <code>{getActiveCode()}</code>
          </pre>
        </div>
      )}
    </div>
  );
};
