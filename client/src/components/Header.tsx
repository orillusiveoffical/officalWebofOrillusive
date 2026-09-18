import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onOpenInquiry?: () => void;
  onOpenAuth: () => void;
  onOpenMyBookings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAuth }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'categories' | 'more' | null>(null);

  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const categories = [
    { name: 'Navbars & Headers', href: '/designs?category=Navbar', desc: 'Minimalist bars, luxury pill menus & mega dropdowns' },
    { name: 'Dropdowns & Menus', href: '/designs?category=Dropdown', desc: 'Single select, mega menus, user profiles, filter dropdowns' },
    { name: 'UI Components', href: '/designs?category=UI%20Component', desc: 'Button controls, input validation groups, status alerts, modals' },
    { name: 'Hero Sections', href: '/designs?category=Hero', desc: 'Split conversion heroes & editorial showcases' },
    { name: 'Pricing Tables', href: '/designs?category=Pricing', desc: 'Multi-tier pricing cards & annual discount toggles' },
    { name: 'Cards & Bento Grids', href: '/designs?category=Cards', desc: 'Feature matrices & live statistic counters' },
    { name: 'Dashboards & Sidebars', href: '/designs?category=Dashboard', desc: 'Collapsible application sidebars & data headers' },
    { name: 'Auth & Forms', href: '/designs?category=Authentication', desc: 'Modern login cards & multi-step onboarding' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/90 transition-all font-sans">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group" aria-label="Go to Orillusive homepage">
          <div className="size-8 rounded-xl bg-[#111111] flex items-center justify-center text-white font-bold text-sm tracking-wider shadow-xs transition-transform group-hover:scale-105">
            O
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold uppercase tracking-[0.2em] font-sans text-[#111111]">
              ORILLUSIVE<span className="text-[#4F6B85]">.</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold leading-none hidden sm:inline">
              Build Beyond The Obvious
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-7 font-sans text-xs font-semibold text-gray-600">
          <Link
            to="/designs"
            className={`hover:text-black transition-colors ${
              location.pathname === '/' || location.pathname.startsWith('/design')
                ? 'text-black font-bold'
                : ''
            }`}
          >
            All Designs
          </Link>

          {/* Categories Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('categories')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              to="/categories"
              className="flex items-center gap-1 hover:text-black py-1 transition-colors"
            >
              Categories <ChevronDown size={13} />
            </Link>

            <AnimatePresence>
              {activeDropdown === 'categories' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl p-3 z-50"
                >
                  <div className="space-y-1">
                    {categories.map((cat, i) => (
                      <Link
                        key={i}
                        to={cat.href}
                        className="block p-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <p className="font-bold text-xs text-black">{cat.name}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">{cat.desc}</p>
                      </Link>
                    ))}
                    <div className="pt-2 border-t border-gray-100">
                      <Link
                        to="/categories"
                        className="block text-center text-[11px] font-bold text-[#4F6B85] hover:underline"
                      >
                        View All Categories →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/pricing"
            className={`hover:text-black transition-colors ${
              location.pathname === '/pricing' ? 'text-black font-bold' : ''
            }`}
          >
            Pricing & Pro ($9/mo)
          </Link>

          <Link
            to="/about"
            className={`hover:text-black transition-colors ${
              location.pathname === '/about' ? 'text-black font-bold' : ''
            }`}
          >
            About Studio
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-700 hidden sm:inline">
                {user.name}
              </span>
              <button
                onClick={logout}
                className="p-2 rounded-full border border-gray-200 text-gray-500 hover:text-black hover:bg-gray-50"
                title="Log out"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="text-xs font-semibold text-gray-600 hover:text-black px-2 py-1.5"
            >
              Sign in
            </button>
          )}

          <Link
            to="/pricing"
            className="px-4 py-2 rounded-xl bg-[#111111] text-white text-xs font-bold uppercase tracking-wider hover:opacity-90 shadow-sm transition-opacity flex items-center gap-1.5"
          >
            <Sparkles size={12} className="text-amber-400" />
            <span>Get Pro</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-gray-200 text-black hover:bg-black/5"
            aria-label="Toggle mobile navigation"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 bg-white px-6 py-4 space-y-4"
          >
            <div className="flex flex-col gap-3 text-sm font-semibold">
              <Link to="/designs" className="text-black py-1">All UI Designs</Link>
              <Link to="/categories" className="text-gray-600 py-1">UI Categories</Link>
              <Link to="/pricing" className="text-gray-600 py-1">Pricing & Pro Access</Link>
              <Link to="/about" className="text-gray-600 py-1">About Studio</Link>
              <Link to="/contact" className="text-gray-600 py-1">Contact</Link>
            </div>

            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              <Link
                to="/pricing"
                className="w-full py-2.5 rounded-xl bg-black text-white text-xs font-bold uppercase tracking-wider text-center"
              >
                Get All-Access Pro ($9/mo)
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
