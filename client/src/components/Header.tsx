import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenInquiry: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenInquiry }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Process', href: '/process' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300 py-5 md:py-7 px-6 sm:px-12">
      <nav
        aria-label="Primary navigation"
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full transition-all duration-500 px-6 ${
          scrolled
            ? 'py-3 bg-white/90 backdrop-blur-xl border border-black/10 shadow-md'
            : 'py-4 bg-white/60 backdrop-blur-md border border-black/5 shadow-xs'
        }`}
      >
        {/* Logo — circular image */}
        <Link to="/" className="flex items-center gap-3 group" aria-label="Go to Orillusive homepage">
          <div className="size-9 rounded-full overflow-hidden border border-black/10 shadow-sm transition-transform group-hover:scale-105 shrink-0">
            <img
              src="/logo.jpg"
              alt="Orillusive"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm font-bold uppercase tracking-[0.22em] font-sans text-[#111111]">
            ORILLUSIVE<span className="text-[#4F6B85]">.</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                  isActive ? 'text-[#4F6B85]' : 'text-[#555555] hover:text-[#111111]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="hidden items-center gap-4 md:flex">
          <button
            onClick={onOpenInquiry}
            className="btn-sheen group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full bg-[#111111] px-6 text-xs font-bold uppercase tracking-wider text-[#F7F7F5] transition-all duration-300 hover:bg-[#2C1E16] hover:scale-[1.03] active:scale-[0.97] shadow-md hover:shadow-lg hover:shadow-black/20 focus-visible:ring-2 focus-visible:ring-[#4F6B85] focus-visible:outline-none"
          >
            <span>Book a Discovery Call</span>
            <ArrowUpRight className="size-4 text-[#C9A84C] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          className="grid size-10 place-items-center rounded-full border border-black/10 bg-white/80 text-[#111111] md:hidden"
        >
          {mobileMenuOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-3 max-w-7xl rounded-3xl bg-white/95 backdrop-blur-2xl border border-black/10 p-7 shadow-2xl md:hidden"
          >
            <div className="flex flex-col space-y-5 font-sans text-sm">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-xs font-bold uppercase tracking-widest py-2.5 border-b border-black/5 ${
                      isActive ? 'text-[#4F6B85]' : 'text-[#555555] hover:text-[#111111]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="btn-sheen group w-full mt-4 min-h-12 inline-flex items-center justify-center gap-2.5 rounded-full bg-[#111111] px-6 text-xs font-bold text-[#F7F7F5] uppercase tracking-wider transition-all duration-300 hover:bg-[#2C1E16] hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#4F6B85] focus-visible:outline-none"
              >
                <span>Book a Discovery Call</span>
                <ArrowUpRight className="size-4 text-[#C9A84C] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
