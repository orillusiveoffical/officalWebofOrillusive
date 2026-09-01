import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X, User, Calendar, LogOut, LogIn, ChevronDown, Layers, Sparkles, DollarSign, Mail, Info, Smartphone, Building2, Package, LayoutDashboard, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { hasInternalRole } from '../utils/roles';

interface HeaderProps {
  onOpenInquiry: () => void;
  onOpenAuth: () => void;
  onOpenMyBookings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenInquiry, onOpenAuth, onOpenMyBookings }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'products' | 'about' | 'contact' | null>(null);
  const [mobileSubmenu, setMobileSubmenu] = useState<'products' | 'about' | 'contact' | null>(null);
  
  const location = useLocation();
  const { user, logout, bookings } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const productSublinks = [
    { 
      name: 'Resume Maker / CV Maker', 
      href: '/cv-maker', 
      desc: 'Monetized SaaS resume builder with live A4 preview & print PDF export', 
      icon: Sparkles,
      tag: 'SaaS Product'
    },
    { 
      name: 'All Studio Products', 
      href: '/projects', 
      desc: 'Browse complete catalog of in-house software products & platforms', 
      icon: Package,
      tag: 'Portfolio'
    },
    { 
      name: 'Hotel Management System', 
      href: '/projects', 
      desc: 'Integrated enterprise hospitality suite for reservation & property logistics', 
      icon: Building2,
      tag: 'Live App'
    }
  ];

  const aboutSublinks = [
    { name: 'About Studio', href: '/about', desc: 'Our philosophy, engineering team & mission', icon: Info },
    { name: 'Engineering Process', href: '/process', desc: '7-step software build methodology', icon: Layers },
    { name: 'Engineering Blog', href: '/blog', desc: 'Architecture, field notes & tech insights', icon: BookOpen }
  ];

  const contactSublinks = [
    { name: 'Contact Studio', href: '/contact', desc: 'Direct engagement & project consultation', icon: Mail },
    { name: 'Studio Services', href: '/services', desc: 'SaaS, Mobile Apps & Enterprise Systems', icon: Sparkles },
    { name: 'Investment & Pricing', href: '/pricing', desc: 'Predictable software investment models', icon: DollarSign }
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300 py-4 md:py-6 px-4 sm:px-8 lg:px-12">
      <nav
        aria-label="Primary navigation"
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full transition-all duration-500 px-4 sm:px-6 ${
          scrolled
            ? 'py-2.5 sm:py-3 bg-white/90 backdrop-blur-xl border border-black/10 shadow-md'
            : 'py-3 sm:py-4 bg-white/60 backdrop-blur-md border border-black/5 shadow-xs'
        }`}
      >
        {/* Logo — circular image */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group" aria-label="Go to Orillusive homepage">
          <div className="size-8 sm:size-9 rounded-full overflow-hidden border border-black/10 shadow-sm transition-transform group-hover:scale-105 shrink-0">
            <img
              src="/logo.jpg"
              alt="Orillusive"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.22em] font-sans text-[#111111]">
            ORILLUSIVE<span className="text-[#4F6B85]">.</span>
          </span>
        </Link>

        {/* Desktop Links with Dropdowns */}
        <div className="hidden items-center gap-2 lg:gap-6 md:flex font-sans">
          <Link
            to="/"
            className={`text-[11px] lg:text-xs font-bold uppercase tracking-wider lg:tracking-widest transition-all duration-200 px-3 py-1.5 rounded-full ${
              location.pathname === '/' ? 'text-[#4F6B85] bg-[#4F6B85]/10' : 'text-[#555555] hover:text-[#111111] hover:bg-black/5'
            }`}
          >
            Home
          </Link>

          {/* Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('products')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'products' ? null : 'products')}
              className={`text-[11px] lg:text-xs font-bold uppercase tracking-wider lg:tracking-widest transition-all duration-200 flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
                location.pathname === '/projects'
                  ? 'text-[#4F6B85] bg-[#4F6B85]/10'
                  : 'text-[#555555] hover:text-[#111111] hover:bg-black/5'
              }`}
            >
              <span>Products</span>
              <ChevronDown className={`size-3.5 transition-transform duration-300 ${activeDropdown === 'products' ? 'rotate-180 text-[#4F6B85]' : ''}`} />
            </button>

            <AnimatePresence>
              {activeDropdown === 'products' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-2.5 w-[360px] sm:w-[380px] z-50 font-sans"
                >
                  <div className="rounded-[28px] bg-white/95 backdrop-blur-2xl border border-black/10 p-4 sm:p-5 shadow-2xl shadow-black/15 space-y-2 ring-1 ring-black/5">
                    <div className="px-3 py-1.5 border-b border-black/5 mb-1.5 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4F6B85]">In-House Products</span>
                      <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider">2 Offerings</span>
                    </div>
                    {productSublinks.map((item) => {
                      const IconComp = item.icon;
                      const isSubActive = location.pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`group flex items-start gap-4 p-3.5 sm:p-4 rounded-2xl transition-all duration-300 ${
                            isSubActive 
                              ? 'bg-[#4F6B85]/10 text-[#4F6B85] border border-[#4F6B85]/20 shadow-xs' 
                              : 'hover:bg-[#F7F7F5] border border-transparent hover:border-black/5 text-[#111111]'
                          }`}
                        >
                          <div className={`p-3 rounded-2xl shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                            isSubActive ? 'bg-[#4F6B85] text-white shadow-xs' : 'bg-[#4F6B85]/10 text-[#4F6B85] group-hover:bg-[#111111] group-hover:text-white'
                          }`}>
                            <IconComp className="size-4 sm:size-4.5" />
                          </div>
                          <div className="space-y-0.5 flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <div className="text-xs sm:text-sm font-bold font-sans tracking-tight text-[#111111] group-hover:text-[#4F6B85] transition-colors truncate">
                                {item.name}
                              </div>
                              {item.tag && (
                                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0 ${
                                  item.tag === 'Live App' 
                                    ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20'
                                    : item.tag === 'In Dev'
                                    ? 'bg-amber-500/10 text-amber-700 border border-amber-500/20'
                                    : 'bg-[#4F6B85]/10 text-[#4F6B85]'
                                }`}>
                                  {item.tag}
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-[#666666] leading-relaxed font-sans font-normal">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* About Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('about')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
              className={`text-[11px] lg:text-xs font-bold uppercase tracking-wider lg:tracking-widest transition-all duration-200 flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
                ['/about', '/process', '/blog'].includes(location.pathname) || location.pathname.startsWith('/blog/')
                  ? 'text-[#4F6B85] bg-[#4F6B85]/10'
                  : 'text-[#555555] hover:text-[#111111] hover:bg-black/5'
              }`}
            >
              <span>About</span>
              <ChevronDown className={`size-3.5 transition-transform duration-300 ${activeDropdown === 'about' ? 'rotate-180 text-[#4F6B85]' : ''}`} />
            </button>

            <AnimatePresence>
              {activeDropdown === 'about' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-2.5 w-[340px] sm:w-[360px] z-50 font-sans"
                >
                  <div className="rounded-[28px] bg-white/95 backdrop-blur-2xl border border-black/10 p-4 sm:p-5 shadow-2xl shadow-black/15 space-y-2 ring-1 ring-black/5">
                    <div className="px-3 py-1.5 border-b border-black/5 mb-1.5 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4F6B85]">Studio Overview</span>
                      <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider">3 Offerings</span>
                    </div>
                    {aboutSublinks.map((item) => {
                      const IconComp = item.icon;
                      const isSubActive = location.pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`group flex items-start gap-4 p-3.5 sm:p-4 rounded-2xl transition-all duration-300 ${
                            isSubActive 
                              ? 'bg-[#4F6B85]/10 text-[#4F6B85] border border-[#4F6B85]/20 shadow-xs' 
                              : 'hover:bg-[#F7F7F5] border border-transparent hover:border-black/5 text-[#111111]'
                          }`}
                        >
                          <div className={`p-3 rounded-2xl shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                            isSubActive ? 'bg-[#4F6B85] text-white shadow-xs' : 'bg-[#4F6B85]/10 text-[#4F6B85] group-hover:bg-[#111111] group-hover:text-white'
                          }`}>
                            <IconComp className="size-4 sm:size-4.5" />
                          </div>
                          <div className="space-y-0.5">
                            <div className="text-xs sm:text-sm font-bold font-sans tracking-tight text-[#111111] group-hover:text-[#4F6B85] transition-colors">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-[#666666] leading-relaxed font-sans font-normal">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('contact')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'contact' ? null : 'contact')}
              className={`text-[11px] lg:text-xs font-bold uppercase tracking-wider lg:tracking-widest transition-all duration-200 flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
                ['/contact', '/services', '/pricing'].includes(location.pathname)
                  ? 'text-[#4F6B85] bg-[#4F6B85]/10'
                  : 'text-[#555555] hover:text-[#111111] hover:bg-black/5'
              }`}
            >
              <span>Contact</span>
              <ChevronDown className={`size-3.5 transition-transform duration-300 ${activeDropdown === 'contact' ? 'rotate-180 text-[#4F6B85]' : ''}`} />
            </button>

            <AnimatePresence>
              {activeDropdown === 'contact' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 top-full pt-2.5 w-[350px] sm:w-[370px] z-50 font-sans"
                >
                  <div className="rounded-[28px] bg-white/95 backdrop-blur-2xl border border-black/10 p-4 sm:p-5 shadow-2xl shadow-black/15 space-y-2 ring-1 ring-black/5">
                    <div className="px-3 py-1.5 border-b border-black/5 mb-1.5 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4F6B85]">Engagements & Offerings</span>
                      <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider">3 Options</span>
                    </div>
                    {contactSublinks.map((item) => {
                      const IconComp = item.icon;
                      const isSubActive = location.pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`group flex items-start gap-4 p-3.5 sm:p-4 rounded-2xl transition-all duration-300 ${
                            isSubActive 
                              ? 'bg-[#4F6B85]/10 text-[#4F6B85] border border-[#4F6B85]/20 shadow-xs' 
                              : 'hover:bg-[#F7F7F5] border border-transparent hover:border-black/5 text-[#111111]'
                          }`}
                        >
                          <div className={`p-3 rounded-2xl shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                            isSubActive ? 'bg-[#4F6B85] text-white shadow-xs' : 'bg-[#4F6B85]/10 text-[#4F6B85] group-hover:bg-[#111111] group-hover:text-white'
                          }`}>
                            <IconComp className="size-4 sm:size-4.5" />
                          </div>
                          <div className="space-y-0.5">
                            <div className="text-xs sm:text-sm font-bold font-sans tracking-tight text-[#111111] group-hover:text-[#4F6B85] transition-colors">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-[#666666] leading-relaxed font-sans font-normal">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Action & Auth Buttons */}
        <div className="hidden items-center gap-3 lg:gap-4 md:flex font-sans">
          {user ? (
            <div className="flex items-center gap-2">
              {hasInternalRole(user.role) && (
                <Link
                  to="/admin"
                  className="btn-sheen inline-flex min-h-10 lg:min-h-11 items-center justify-center gap-2 rounded-full bg-[#4F6B85] px-4 lg:px-5 text-[11px] lg:text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#3B5268] hover:scale-[1.03] active:scale-[0.97] shadow-md"
                  title="Access Internal Operations Control Center"
                >
                  <LayoutDashboard className="size-3.5 text-[#C9A84C]" />
                  <span>Dashboard</span>
                </Link>
              )}

              <button
                onClick={onOpenMyBookings}
                className="btn-sheen group inline-flex min-h-10 lg:min-h-11 items-center justify-center gap-2 rounded-full bg-[#111111] px-4 lg:px-6 text-[11px] lg:text-xs font-bold uppercase tracking-wider text-[#F7F7F5] transition-all duration-300 hover:bg-[#2C1E16] hover:scale-[1.03] active:scale-[0.97] shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#4F6B85] focus-visible:outline-none"
                title="View saved discovery calls"
              >
                <Calendar className="size-3.5 text-[#C9A84C]" />
                <span>My Calls ({bookings.length})</span>
              </button>
              <button
                onClick={logout}
                className="p-2.5 rounded-full border border-black/10 text-[#555555] hover:text-[#111111] hover:bg-[#F7F7F5] transition-all"
                title="Sign out"
              >
                <LogOut className="size-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="btn-sheen group inline-flex min-h-10 lg:min-h-11 items-center justify-center gap-2 rounded-full bg-[#111111] px-5 lg:px-6 text-[11px] lg:text-xs font-bold uppercase tracking-wider text-[#F7F7F5] transition-all duration-300 hover:bg-[#2C1E16] hover:scale-[1.03] active:scale-[0.97] shadow-md hover:shadow-lg hover:shadow-black/20 focus-visible:ring-2 focus-visible:ring-[#4F6B85] focus-visible:outline-none"
            >
              <LogIn className="size-3.5 lg:size-4 text-[#C9A84C] transition-transform duration-300 group-hover:translate-x-0.5" />
              <span>Sign In / Login</span>
            </button>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          className="grid size-9 sm:size-10 place-items-center rounded-full border border-black/10 bg-white/80 text-[#111111] md:hidden"
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
            className="mx-auto mt-3 max-w-7xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white/95 backdrop-blur-2xl border border-black/10 p-6 sm:p-7 shadow-2xl md:hidden font-sans"
          >
            <div className="flex flex-col space-y-3 text-sm">
              {user && (
                <div className="p-3 rounded-2xl bg-[#F7F7F5] border border-black/5 flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center space-x-2">
                    <User className="size-4 text-[#4F6B85]" />
                    <span className="font-bold text-[#111111] truncate">{user.name}</span>
                  </div>
                  <button onClick={logout} className="text-[#888888] hover:text-red-600 text-[10px] font-bold uppercase">
                    Logout
                  </button>
                </div>
              )}

              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-xs font-bold uppercase tracking-widest py-2 border-b border-black/5 ${
                  location.pathname === '/' ? 'text-[#4F6B85]' : 'text-[#555555]'
                }`}
              >
                Home
              </Link>

              {/* Mobile Products Collapsible */}
              <div className="border-b border-black/5 py-2">
                <button
                  onClick={() => setMobileSubmenu(mobileSubmenu === 'products' ? null : 'products')}
                  className="w-full flex items-center justify-between py-2 text-xs font-bold uppercase tracking-widest text-[#555555] hover:text-[#111111]"
                >
                  <span className={location.pathname === '/projects' ? 'text-[#4F6B85]' : ''}>Products</span>
                  <ChevronDown className={`size-4 transition-transform duration-300 ${mobileSubmenu === 'products' ? 'rotate-180 text-[#4F6B85]' : ''}`} />
                </button>
                {mobileSubmenu === 'products' && (
                  <div className="pt-2 pb-1 space-y-2">
                    {productSublinks.map((item) => {
                      const IconComp = item.icon;
                      const isSubActive = location.pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-start gap-3 p-3 rounded-2xl transition-all ${
                            isSubActive ? 'bg-[#4F6B85]/10 border border-[#4F6B85]/20 text-[#4F6B85]' : 'bg-[#F7F7F5] text-[#111111]'
                          }`}
                        >
                          <div className={`p-2 rounded-xl shrink-0 ${isSubActive ? 'bg-[#4F6B85] text-white' : 'bg-black/5 text-[#4F6B85]'}`}>
                            <IconComp className="size-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <div className="text-xs font-bold truncate">{item.name}</div>
                              {item.tag && (
                                <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#4F6B85]/10 text-[#4F6B85]">
                                  {item.tag}
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-[#777777] leading-tight mt-0.5">{item.desc}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Mobile About Collapsible */}
              <div className="border-b border-black/5 py-2">
                <button
                  onClick={() => setMobileSubmenu(mobileSubmenu === 'about' ? null : 'about')}
                  className="w-full flex items-center justify-between py-2 text-xs font-bold uppercase tracking-widest text-[#555555] hover:text-[#111111]"
                >
                  <span>About Studio</span>
                  <ChevronDown className={`size-4 transition-transform duration-300 ${mobileSubmenu === 'about' ? 'rotate-180 text-[#4F6B85]' : ''}`} />
                </button>
                {mobileSubmenu === 'about' && (
                  <div className="pt-2 pb-1 space-y-2">
                    {aboutSublinks.map((item) => {
                      const IconComp = item.icon;
                      const isSubActive = location.pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-start gap-3 p-3 rounded-2xl transition-all ${
                            isSubActive ? 'bg-[#4F6B85]/10 border border-[#4F6B85]/20 text-[#4F6B85]' : 'bg-[#F7F7F5] text-[#111111]'
                          }`}
                        >
                          <div className={`p-2 rounded-xl shrink-0 ${isSubActive ? 'bg-[#4F6B85] text-white' : 'bg-black/5 text-[#4F6B85]'}`}>
                            <IconComp className="size-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold">{item.name}</div>
                            <div className="text-[10px] text-[#777777] leading-tight mt-0.5">{item.desc}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Mobile Contact Collapsible */}
              <div className="border-b border-black/5 py-2">
                <button
                  onClick={() => setMobileSubmenu(mobileSubmenu === 'contact' ? null : 'contact')}
                  className="w-full flex items-center justify-between py-2 text-xs font-bold uppercase tracking-widest text-[#555555] hover:text-[#111111]"
                >
                  <span>Contact & Engagements</span>
                  <ChevronDown className={`size-4 transition-transform duration-300 ${mobileSubmenu === 'contact' ? 'rotate-180 text-[#4F6B85]' : ''}`} />
                </button>
                {mobileSubmenu === 'contact' && (
                  <div className="pt-2 pb-1 space-y-2">
                    {contactSublinks.map((item) => {
                      const IconComp = item.icon;
                      const isSubActive = location.pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-start gap-3 p-3 rounded-2xl transition-all ${
                            isSubActive ? 'bg-[#4F6B85]/10 border border-[#4F6B85]/20 text-[#4F6B85]' : 'bg-[#F7F7F5] text-[#111111]'
                          }`}
                        >
                          <div className={`p-2 rounded-xl shrink-0 ${isSubActive ? 'bg-[#4F6B85] text-white' : 'bg-black/5 text-[#4F6B85]'}`}>
                            <IconComp className="size-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold">{item.name}</div>
                            <div className="text-[10px] text-[#777777] leading-tight mt-0.5">{item.desc}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {user ? (
                <div className="space-y-2 pt-2">
                  {hasInternalRole(user.role) && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="btn-sheen group w-full min-h-12 inline-flex items-center justify-center gap-2.5 rounded-full bg-[#4F6B85] px-6 text-xs font-bold text-white uppercase tracking-wider transition-all duration-300 hover:bg-[#3B5268] active:scale-[0.98] shadow-md"
                    >
                      <LayoutDashboard className="size-4 text-[#C9A84C]" />
                      <span>Internal Dashboard ({user.role})</span>
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenMyBookings();
                    }}
                    className="btn-sheen group w-full min-h-12 inline-flex items-center justify-center gap-2.5 rounded-full bg-[#111111] px-6 text-xs font-bold text-[#F7F7F5] uppercase tracking-wider transition-all duration-300 hover:bg-[#2C1E16] active:scale-[0.98] shadow-md"
                  >
                    <Calendar className="size-4 text-[#C9A84C]" />
                    <span>My Saved Calls ({bookings.length})</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="btn-sheen group w-full min-h-12 inline-flex items-center justify-center gap-2.5 rounded-full bg-[#111111] px-6 text-xs font-bold text-[#F7F7F5] uppercase tracking-wider transition-all duration-300 hover:bg-[#2C1E16] active:scale-[0.98] shadow-md mt-2"
                >
                  <LogIn className="size-4 text-[#C9A84C]" />
                  <span>Sign In / Login</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

