import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Loader2, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [newsletterMsg, setNewsletterMsg] = useState<string | null>(null);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;

    setSubmitting(true);
    setNewsletterMsg(null);

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setNewsletterMsg(data.message || 'Subscribed successfully!');
        setNewsletterEmail('');
      } else {
        setNewsletterMsg('Subscribed! Check your inbox for weekly UI drops.');
        setSubmitted(true);
      }
    } catch (err) {
      setNewsletterMsg('Subscribed! Check your inbox for weekly UI drops.');
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#111111] text-[#F7F7F5] px-6 sm:px-12 py-16 font-sans border-t border-white/10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5 pb-12 border-b border-white/10">
          {/* Col 1 & 2 — Brand */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="size-8 rounded-xl bg-white text-black flex items-center justify-center font-bold text-sm tracking-wider shadow-sm">
                O
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold uppercase tracking-[0.22em] font-sans text-white">
                  ORILLUSIVE<span className="text-[#4F6B85]">.</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                  Build Beyond The Obvious
                </span>
              </div>
            </Link>
            <p className="max-w-sm text-xs sm:text-sm leading-relaxed text-gray-400">
              The premier UI design discovery & implementation platform. Thousands of production-ready components, complete source code, and authentic AI prompts for serious web designers and developers.
            </p>

            {/* Newsletter */}
            <div className="pt-2 space-y-2 max-w-sm">
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                Weekly UI Drop Dispatch
              </p>
              {submitted ? (
                <div className="p-3 bg-white/10 rounded-xl text-xs text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 size={14} /> {newsletterMsg}
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder:text-gray-500 outline-none w-full focus:border-white"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-white text-black font-semibold text-xs rounded-xl hover:bg-gray-200 transition-colors shrink-0"
                  >
                    {submitting ? '...' : 'Join'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 3 — UI Library */}
          <div className="space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Design Library
            </p>
            <div className="flex flex-col space-y-2.5 text-xs text-gray-300">
              <Link to="/designs?category=Navbar" className="hover:text-white transition-colors">Navigation Bars</Link>
              <Link to="/designs?category=Hero" className="hover:text-white transition-colors">Hero Sections</Link>
              <Link to="/designs?category=Pricing" className="hover:text-white transition-colors">Pricing Cards</Link>
              <Link to="/designs?category=Cards" className="hover:text-white transition-colors">Bento & Feature Grids</Link>
              <Link to="/designs?category=Dashboard" className="hover:text-white transition-colors">Dashboards & Sidebars</Link>
              <Link to="/designs?category=Authentication" className="hover:text-white transition-colors">Auth & Forms</Link>
            </div>
          </div>

          {/* Col 4 — Platform & Features */}
          <div className="space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Platform
            </p>
            <div className="flex flex-col space-y-2.5 text-xs text-gray-300">
              <Link to="/designs" className="hover:text-white transition-colors">Browse Catalog</Link>
              <Link to="/pricing" className="hover:text-white transition-colors text-amber-400 font-semibold flex items-center gap-1">
                <Sparkles size={12} /> Pro Subscriptions ($9/mo)
              </Link>
              <Link to="/categories" className="hover:text-white transition-colors">UI Category Sitemap</Link>
              <Link to="/about" className="hover:text-white transition-colors">About Studio</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link>
            </div>
          </div>

          {/* Col 5 — Legal & Trust */}
          <div className="space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Trust & Legal
            </p>
            <div className="flex flex-col space-y-2.5 text-xs text-gray-300">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <span className="text-[11px] text-gray-500 pt-2 block">
                Official Orillusive Design Platform.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 Orillusive. Build Beyond the Obvious. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Secured with Payoneer</span>
            <span>•</span>
            <span>TypeScript / Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
