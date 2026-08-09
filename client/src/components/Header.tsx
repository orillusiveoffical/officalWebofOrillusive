import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X, User, Calendar, LogOut, LogIn, ChevronDown, Layers, Sparkles, DollarSign, Mail, Info, Cpu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onOpenInquiry: () => void;
  onOpenAuth: () => void;
  onOpenMyBookings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenInquiry, onOpenAuth, onOpenMyBookings }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'about' | 'contact' | null>(null);
  const [mobileSubmenu, setMobileSubmenu] = useState<'about' | 'contact' | null>(null);
  
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

  const aboutSublinks = [
    { name: 'About Studio', href: '/about', desc: 'Our philosophy, engineering team & mission', icon: Info },
    { name: 'Engineering Process', href: '/process', desc: '7-step software build methodology', icon: Layers }
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
        <div className="hidden items-center gap-4 lg:gap-8 md:flex font-sans">
          <Link
            to="/"
            className={`text-[11px] lg:text-xs font-bold uppercase tracking-wider lg:tracking-widest transition-colors ${
              location.pathname === '/' ? 'text-[#4F6B85]' : 'text-[#555555] hover:text-[#111111]'
            }`}
          >
            Home
          </Link>

          <Link
            to="/projects"
            className={`text-[11px] lg:text-xs font-bold uppercase tracking-wider lg:tracking-widest transition-colors ${
              location.pathname === '/projects' ? 'text-[#4F6B85]' : 'text-[#555555] hover:text-[#111111]'
            }`}
          >
            Products
          </Link>

          {/* About Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('about')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
              className={`text-[11px] lg:text-xs font-bold uppercase tracking-wider lg:tracking-widest transition-colors flex items-center gap-1 py-1 ${
                ['/about', '/process'].includes(location.pathname) ? 'text-[#4F6B85]' : 'text-[#555555] hover:text-[#111111]'
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
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-72 z-50"
                >
                  <div className="rounded-2xl bg-white/95 backdrop-blur-2xl border border-black/10 p-2.5 shadow-2xl space-y-1">
                    {aboutSublinks.map((item) => {
                      const IconComp = item.icon;
                      const isSubActive = location.pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                            isSubActive ? 'bg-[#4F6B85]/10 text-[#4F6B85]' : 'hover:bg-[#F7F7F5] text-[#111111]'
                          }`}
                        >
                          <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${isSubActive ? 'bg-[#4F6B85] text-white' : 'bg-black/5 text-[#4F6B85]'}`}>
                            <IconComp className="size-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold font-sans">{item.name}</div>
                            <div className="text-[10px] text-[#777777] leading-snug mt-0.5">{item.desc}</div>
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
              className={`text-[11px] lg:text-xs font-bold uppercase tracking-wider lg:tracking-widest transition-colors flex items-center gap-1 py-1 ${
                ['/contact', '/services', '/pricing'].includes(location.pathname) ? 'text-[#4F6B85]' : 'text-[#555555] hover:text-[#111111]'
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
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 top-full pt-3 w-80 z-50"
                >
                  <div className="rounded-2xl bg-white/95 backdrop-blur-2xl border border-black/10 p-2.5 shadow-2xl space-y-1">
                    {contactSublinks.map((item) => {
                      const IconComp = item.icon;
                      const isSubActive = location.pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                            isSubActive ? 'bg-[#4F6B85]/10 text-[#4F6B85]' : 'hover:bg-[#F7F7F5] text-[#111111]'
                          }`}
                        >
                          <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${isSubActive ? 'bg-[#4F6B85] text-white' : 'bg-black/5 text-[#4F6B85]'}`}>
                            <IconComp className="size-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold font-sans">{item.name}</div>
                            <div className="text-[10px] text-[#777777] leading-snug mt-0.5">{item.desc}</div>
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
        <div className="hidden items-center gap-3 lg:gap-4 md:flex">
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenMyBookings}
                className="px-3.5 py-2 rounded-full bg-[#4F6B85]/10 text-[#4F6B85] hover:bg-[#4F6B85] hover:text-white transition-all text-[11px] font-bold flex items-center gap-1.5"
                title="View saved discovery calls"
              >
                <Calendar className="size-3.5" />
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
              className="px-4 py-2 rounded-full border border-black/10 text-[#111111] hover:bg-[#F7F7F5] text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
            >
              <LogIn className="size-3.5 text-[#4F6B85]" />
              <span>Sign In</span>
            </button>
          )}

          <button
            onClick={onOpenInquiry}
            className="btn-sheen group inline-flex min-h-10 lg:min-h-11 items-center justify-center gap-2 rounded-full bg-[#111111] px-4 lg:px-6 text-[11px] lg:text-xs font-bold uppercase tracking-wider text-[#F7F7F5] transition-all duration-300 hover:bg-[#2C1E16] hover:scale-[1.03] active:scale-[0.97] shadow-md hover:shadow-lg hover:shadow-black/20 focus-visible:ring-2 focus-visible:ring-[#4F6B85] focus-visible:outline-none"
          >
            <span>Book a Discovery Call</span>
            <ArrowUpRight className="size-3.5 lg:size-4 text-[#C9A84C] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
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

              <Link
                to="/projects"
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-xs font-bold uppercase tracking-widest py-2 border-b border-black/5 ${
                  location.pathname === '/projects' ? 'text-[#4F6B85]' : 'text-[#555555]'
                }`}
              >
                Products
              </Link>

              {/* Mobile About Collapsible */}
              <div className="border-b border-black/5 py-1">
                <button
                  onClick={() => setMobileSubmenu(mobileSubmenu === 'about' ? null : 'about')}
                  className="w-full flex items-center justify-between py-1 text-xs font-bold uppercase tracking-widest text-[#555555]"
                >
                  <span>About</span>
                  <ChevronDown className={`size-4 transition-transform ${mobileSubmenu === 'about' ? 'rotate-180 text-[#4F6B85]' : ''}`} />
                </button>
                {mobileSubmenu === 'about' && (
                  <div className="pl-4 pt-2 pb-1 space-y-2.5">
                    {aboutSublinks.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block text-xs font-medium ${
                          location.pathname === item.href ? 'text-[#4F6B85] font-bold' : 'text-[#666666]'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Contact Collapsible */}
              <div className="border-b border-black/5 py-1">
                <button
                  onClick={() => setMobileSubmenu(mobileSubmenu === 'contact' ? null : 'contact')}
                  className="w-full flex items-center justify-between py-1 text-xs font-bold uppercase tracking-widest text-[#555555]"
                >
                  <span>Contact</span>
                  <ChevronDown className={`size-4 transition-transform ${mobileSubmenu === 'contact' ? 'rotate-180 text-[#4F6B85]' : ''}`} />
                </button>
                {mobileSubmenu === 'contact' && (
                  <div className="pl-4 pt-2 pb-1 space-y-2.5">
                    {contactSublinks.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block text-xs font-medium ${
                          location.pathname === item.href ? 'text-[#4F6B85] font-bold' : 'text-[#666666]'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {user ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenMyBookings();
                  }}
                  className="w-full py-2.5 rounded-full border border-black/10 text-[#111111] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 mt-2"
                >
                  <Calendar className="size-4 text-[#4F6B85]" />
                  <span>My Saved Calls ({bookings.length})</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full py-2.5 rounded-full border border-black/10 text-[#111111] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 mt-2"
                >
                  <LogIn className="size-4 text-[#4F6B85]" />
                  <span>Sign In / Register</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="btn-sheen group w-full min-h-12 inline-flex items-center justify-center gap-2.5 rounded-full bg-[#111111] px-6 text-xs font-bold text-[#F7F7F5] uppercase tracking-wider transition-all duration-300 hover:bg-[#2C1E16] hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#4F6B85] focus-visible:outline-none"
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
