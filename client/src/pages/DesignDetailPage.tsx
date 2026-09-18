import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UIDesign } from '../types/design';
import { INITIAL_DESIGNS } from '../data/designsData';
import { ViewportFrame } from '../components/designs/ViewportFrame';
import { TokenPaletteEditor } from '../components/designs/TokenPaletteEditor';
import { CodeViewer } from '../components/designs/CodeViewer';
import { PromptViewer } from '../components/designs/PromptViewer';
import { PremiumPaywallModal } from '../components/designs/PremiumPaywallModal';
import { DesignCard } from '../components/designs/DesignCard';
import {
  ArrowLeft,
  Lock,
  Heart,
  Eye,
  Share2,
  Sparkles,
  Layers,
  ChevronRight,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export const DesignDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [design, setDesign] = useState<UIDesign | null>(null);
  const [liveViews, setLiveViews] = useState<number>(0);
  const [isLiked, setIsLiked] = useState(false);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const viewTrackedRef = useRef<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = INITIAL_DESIGNS.find((d) => d.slug === slug) || INITIAL_DESIGNS[0];
    setDesign(found);
    setLiveViews(found.metrics?.views || 0);

    // Track real view with deduplication guard
    if (slug && viewTrackedRef.current !== slug) {
      viewTrackedRef.current = slug;
      const sessionKey = `viewed_design_${slug}`;
      const alreadyViewed = sessionStorage.getItem(sessionKey);

      if (!alreadyViewed) {
        sessionStorage.setItem(sessionKey, '1');
        const visitorId = localStorage.getItem('orillusive_vid') || (() => {
          const newId = 'vid_' + Math.random().toString(36).substring(2, 15);
          localStorage.setItem('orillusive_vid', newId);
          return newId;
        })();

        fetch(`/api/designs/${slug}/view`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            anonymousVisitorId: visitorId,
            sessionId: sessionStorage.getItem('orillusive_sid') || 'ses_' + Math.random().toString(36).substring(2, 15),
            source: 'web_detail'
          })
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success && data.currentViews) {
              setLiveViews(data.currentViews);
            }
          })
          .catch(() => {
            // Quiet fallback
          });
      }
    }
  }, [slug]);

  if (!design) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#FBFBFA]">
        <div className="size-8 rounded-full border-2 border-black/20 border-t-black animate-spin" />
      </div>
    );
  }

  const relatedDesigns = INITIAL_DESIGNS.filter(
    (d) => d.slug !== design.slug && d.category === design.category
  ).slice(0, 2);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#111111] pb-24 font-sans">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/designs"
              className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:text-black hover:bg-gray-50 transition-colors shadow-2xs"
              title="Back to Catalog"
            >
              <ArrowLeft size={16} />
            </Link>

            <nav className="flex items-center gap-2 text-xs font-medium text-gray-400">
              <Link to="/designs" className="hover:text-black transition-colors">Catalog</Link>
              <ChevronRight size={12} />
              <Link to={`/designs?category=${design.category}`} className="hover:text-black transition-colors">{design.category}</Link>
              <ChevronRight size={12} />
              <span className="text-black font-semibold truncate max-w-xs">{design.title}</span>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Real View Counter Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs">
              <Eye size={13} className="text-gray-400" />
              <span>{liveViews.toLocaleString()} views</span>
            </div>

            <button
              onClick={handleShare}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 shadow-2xs"
            >
              <Share2 size={13} /> {copiedLink ? 'Link Copied!' : 'Share'}
            </button>

            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-xl border transition-colors shadow-2xs ${
                isLiked ? 'bg-red-50 border-red-200 text-red-600' : 'border-gray-200 text-gray-500 hover:text-black hover:bg-gray-50'
              }`}
              title="Save to My Designs"
            >
              <Heart size={15} fill={isLiked ? 'currentColor' : 'none'} />
            </button>

            {design.isPremium && (
              <button
                onClick={() => setUpgradeModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-black text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-gray-800 shadow-xs"
              >
                <Sparkles size={13} className="text-amber-400" /> Unlock Pro Source
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-6 pt-8 space-y-10">
        {/* Title Header */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-black/5 text-black border border-gray-200">
              {design.category}
            </span>
            {design.isPremium ? (
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-black text-white flex items-center gap-1">
                <Lock size={11} /> Pro Tier
              </span>
            ) : (
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Free Library
              </span>
            )}
            <span className="text-xs text-gray-400 font-mono">
              Style: <span className="capitalize font-semibold text-black">{design.style}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black">
            {design.title}
          </h1>

          <p className="text-sm text-gray-600 max-w-3xl leading-relaxed">
            {design.description}
          </p>
        </div>

        {/* 1. Live Interactive Responsive Sandbox */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-black flex items-center gap-2">
              <Eye size={15} /> 1. Live Responsive Preview Sandbox
            </h2>
            <span className="text-xs text-gray-400">Reflow-accurate viewport simulation</span>
          </div>
          <ViewportFrame componentKey={design.componentKey} title={design.title} />
        </section>

        {/* 2. Real-Time Token Palette Editor */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-black flex items-center gap-2">
            <Layers size={15} /> 2. Color Palette & Token Customizer
          </h2>
          <TokenPaletteEditor />
        </section>

        {/* 3. Production Code Implementation */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-black flex items-center gap-2">
            <ShieldCheck size={15} /> 3. Verified Production Source Code
          </h2>
          <CodeViewer
            reactCode={design.reactCode}
            htmlCode={design.htmlCode}
            cssCode={design.cssCode}
            isLocked={design.isPremium}
            slug={design.slug}
            onOpenUpgrade={() => setUpgradeModalOpen(true)}
          />
        </section>

        {/* 4. Authentic AI Generation Prompts */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-black flex items-center gap-2">
            <Sparkles size={15} className="text-amber-500" /> 4. Authentic AI Generation Prompt Recipe
          </h2>
          <PromptViewer
            reactPrompt={design.reactPrompt}
            htmlPrompt={design.htmlPrompt}
            isLocked={design.isPremium}
            onOpenUpgrade={() => setUpgradeModalOpen(true)}
          />
        </section>

        {/* Related Designs */}
        {relatedDesigns.length > 0 && (
          <section className="space-y-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-bold text-black">
              More {design.category} Patterns
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedDesigns.map((rel) => (
                <DesignCard key={rel.slug} design={rel} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Paywall Upgrade Modal */}
      <PremiumPaywallModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        designTitle={design.title}
      />
    </div>
  );
};
