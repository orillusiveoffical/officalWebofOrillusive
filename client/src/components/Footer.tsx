import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [newsletterMsg, setNewsletterMsg] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;

    setSubmitting(true);
    setNewsletterMsg(null);
    setIsError(false);

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
        setIsError(true);
        setNewsletterMsg(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (err) {
      setIsError(true);
      setNewsletterMsg('Network error. Unable to subscribe.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#111111] text-[#F7F7F5] px-4 sm:px-8 lg:px-16 py-16 sm:py-20 md:py-24 font-sans border-t border-white/10">
      <div className="mx-auto max-w-[1400px]">

        <div className="grid gap-10 sm:gap-14 md:grid-cols-2 lg:grid-cols-4 pb-12 sm:pb-16 border-b border-white/10">

          {/* Col 1 — Brand */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-3 group" aria-label="Go to Orillusive homepage">
              {/* Circular logo image */}
              <div className="size-9 rounded-full overflow-hidden border border-white/20 shadow-sm shrink-0 transition-transform group-hover:scale-105">
                <img
                  src="/logo.jpg"
                  alt="Orillusive"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-bold uppercase tracking-[0.22em] font-sans text-[#F7F7F5]">
                ORILLUSIVE<span className="text-[#C9A84C]">.</span>
              </span>
            </Link>
            <p className="max-w-xs text-xs sm:text-sm leading-relaxed text-[#888888]">
              Premium Software Engineering Studio crafting long-term digital products that matter.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#888888]">
              Navigation
            </p>
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-xs sm:text-sm text-[#CCCCCC] hover:text-[#F7F7F5] transition-colors">Home</Link>
              <Link to="/services" className="text-xs sm:text-sm text-[#CCCCCC] hover:text-[#F7F7F5] transition-colors">Services</Link>
              <Link to="/projects" className="text-xs sm:text-sm text-[#CCCCCC] hover:text-[#F7F7F5] transition-colors">Products</Link>
              <Link to="/about" className="text-xs sm:text-sm text-[#CCCCCC] hover:text-[#F7F7F5] transition-colors">About Studio</Link>
              <Link to="/process" className="text-xs sm:text-sm text-[#CCCCCC] hover:text-[#F7F7F5] transition-colors">Engineering Process</Link>
              <Link to="/pricing" className="text-xs sm:text-sm text-[#CCCCCC] hover:text-[#F7F7F5] transition-colors">Pricing & Engagements</Link>
              <Link to="/contact" className="text-xs sm:text-sm text-[#CCCCCC] hover:text-[#F7F7F5] transition-colors">Start Project / Contact</Link>
            </div>
          </div>

          {/* Col 3 */}
          <div className="space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#888888]">
              Contact
            </p>
            <div className="space-y-3">
              <a
                href="mailto:info@orillusive.com"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#CCCCCC] hover:text-[#C9A84C] transition-colors font-medium"
              >
                <span>info@orillusive.com</span>
                <ArrowUpRight className="size-3.5" />
              </a>
              <p className="text-xs text-[#888888] leading-relaxed">
                Global operations & remote engineering
              </p>
            </div>
          </div>

          {/* Col 4 — Field Notes & Newsletter Subscription */}
          <div className="space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#888888]">
              Field Notes Newsletter
            </p>
            <p className="text-xs text-[#888888] leading-relaxed">
              Subscribe to senior engineering insights, architectural patterns, and studio updates.
            </p>

            {submitted ? (
              <div className="p-3.5 rounded-xl bg-[#4F6B85]/20 border border-[#4F6B85]/40 text-xs text-[#F7F7F5] flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[#C9A84C] shrink-0" />
                <span>{newsletterMsg}</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative flex items-center">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-[#666666] focus:border-[#4F6B85] focus:ring-1 focus:ring-[#4F6B85] focus:outline-none transition-all"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    aria-label="Subscribe to newsletter"
                    className="absolute right-1.5 p-1.5 rounded-lg bg-white/10 text-white hover:bg-[#C9A84C] hover:text-[#111111] transition-all disabled:opacity-50"
                  >
                    {submitting ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <ArrowRight className="size-3.5" />
                    )}
                  </button>
                </div>
                {newsletterMsg && isError && (
                  <p className="text-[10px] text-red-400 font-sans">{newsletterMsg}</p>
                )}
              </form>
            )}

            <div className="pt-2 border-t border-white/5">
              <p className="text-[10px] text-[#666666]">
                React • Node.js • TypeScript • Flutter • MongoDB Atlas
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col gap-5 text-[11px] text-[#777777] sm:flex-row sm:items-center sm:justify-between font-mono">
          <p>© 2026 Orillusive. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="https://github.com" target="_blank" rel="https://github.com/orillusiveoffical" aria-label="Visit Orillusive on GitHub" className="hover:text-[#F7F7F5] transition-colors">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="https://www.linkedin.com/company/orillusive/" aria-label="Visit Orillusive on LinkedIn" className="hover:text-[#F7F7F5] transition-colors">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Visit Orillusive on X / Twitter" className="hover:text-[#F7F7F5] transition-colors">X / Twitter</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

