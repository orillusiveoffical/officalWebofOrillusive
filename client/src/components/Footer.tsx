import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111111] text-[#F7F7F5] px-8 py-24 md:px-14 lg:px-24 font-sans border-t border-white/10">
      <div className="mx-auto max-w-[1400px]">
        
        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-4 pb-16 border-b border-white/10">
          
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
                href="mailto:hello@orillusive.com" 
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#CCCCCC] hover:text-[#C9A84C] transition-colors font-medium"
              >
                <span>hello@orillusive.com</span>
                <ArrowUpRight className="size-3.5" />
              </a>
              <p className="text-xs text-[#888888] leading-relaxed">
                Global operations & remote engineering
              </p>
            </div>
          </div>

          {/* Col 4 */}
          <div className="space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#888888]">
              Engineering Focus
            </p>
            <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
              React • Node.js • TypeScript • Flutter • Supabase • Enterprise Architecture
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col gap-5 text-[11px] text-[#777777] sm:flex-row sm:items-center sm:justify-between font-mono">
          <p>© 2026 Orillusive. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="Visit Orillusive on GitHub" className="hover:text-[#F7F7F5] transition-colors">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Visit Orillusive on LinkedIn" className="hover:text-[#F7F7F5] transition-colors">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Visit Orillusive on X / Twitter" className="hover:text-[#F7F7F5] transition-colors">X / Twitter</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
