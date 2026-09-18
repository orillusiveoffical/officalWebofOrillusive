import React, { useState } from 'react';
import {
  ChevronDown,
  ArrowRight,
  Check,
  Star,
  Search,
  Sliders,
  Layers,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Users,
  Eye,
  Lock,
  Mail,
  Zap,
  CheckCircle2,
  X,
  Bell,
  Command,
  LayoutGrid,
  FileCode2,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Menu,
  AlertCircle,
  Info,
  AlertTriangle,
  Copy,
  Trash2,
  Edit,
  ExternalLink,
  Grid,
  List,
  Home,
  Plus,
  User,
  Key,
  Shield,
  SlidersHorizontal
} from 'lucide-react';

/* =========================================================================
   1. NAVBARS
   ========================================================================= */

export const MinimalNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[var(--ui-card,#ffffff)] border-b border-[var(--ui-border,#e5e7eb)] px-6 py-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-[var(--ui-primary,#111111)] flex items-center justify-center text-white font-bold text-sm tracking-wider">
            O
          </div>
          <span className="font-semibold text-lg tracking-tight text-[var(--ui-fg,#111111)]">
            Orillusive
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--ui-muted,#6b7280)]">
          <a href="#overview" className="text-[var(--ui-fg,#111111)] transition-colors hover:text-[var(--ui-accent,#4f6b85)]">
            Overview
          </a>
          <a href="#systems" className="hover:text-[var(--ui-fg,#111111)] transition-colors">
            Design Systems
          </a>
          <a href="#patterns" className="hover:text-[var(--ui-fg,#111111)] transition-colors">
            Patterns
          </a>
          <a href="#pricing" className="hover:text-[var(--ui-fg,#111111)] transition-colors">
            Pricing
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button className="text-sm font-medium text-[var(--ui-muted,#6b7280)] hover:text-[var(--ui-fg,#111111)]">
            Sign in
          </button>
          <button className="px-4 py-2 rounded-lg bg-[var(--ui-primary,#111111)] text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-sm">
            Get Access
          </button>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[var(--ui-fg,#111111)] hover:bg-black/5"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-2 border-t border-[var(--ui-border,#e5e7eb)] mt-3 flex flex-col gap-3 text-sm">
          <a href="#overview" className="text-[var(--ui-fg,#111111)] font-medium">Overview</a>
          <a href="#systems" className="text-[var(--ui-muted,#6b7280)]">Design Systems</a>
          <a href="#patterns" className="text-[var(--ui-muted,#6b7280)]">Patterns</a>
          <a href="#pricing" className="text-[var(--ui-muted,#6b7280)]">Pricing</a>
          <div className="pt-2 flex flex-col gap-2">
            <button className="w-full py-2 text-center font-medium border border-[var(--ui-border,#e5e7eb)] rounded-lg">Sign in</button>
            <button className="w-full py-2 text-center font-medium bg-[var(--ui-primary,#111111)] text-white rounded-lg">Get Access</button>
          </div>
        </div>
      )}
    </header>
  );
};

export const SaaSNavbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="w-full bg-[var(--ui-card,#ffffff)]/90 backdrop-blur-md border-b border-[var(--ui-border,#e5e7eb)] px-6 py-3.5 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2.5">
            <div className="size-7 rounded-md bg-[var(--ui-primary,#111111)] flex items-center justify-center text-white text-xs font-mono font-bold">
              //
            </div>
            <span className="font-semibold text-[15px] tracking-tight text-[var(--ui-fg,#111111)]">
              HyperScale
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-[var(--ui-border,#e5e7eb)] text-[var(--ui-muted,#6b7280)]">
              v2.4
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[var(--ui-muted,#6b7280)]">
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 hover:text-[var(--ui-fg,#111111)] py-1 transition-colors"
              >
                Products <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] rounded-xl shadow-xl p-3 z-30 animate-in fade-in slide-in-from-top-2">
                  <div className="p-2 hover:bg-black/5 rounded-lg cursor-pointer transition-colors">
                    <p className="font-semibold text-xs text-[var(--ui-fg,#111111)]">Edge Architecture</p>
                    <p className="text-[11px] text-[var(--ui-muted,#6b7280)] mt-0.5">Ultra low latency routing infrastructure</p>
                  </div>
                  <div className="p-2 hover:bg-black/5 rounded-lg cursor-pointer transition-colors mt-1">
                    <p className="font-semibold text-xs text-[var(--ui-fg,#111111)]">Dynamic Pipelines</p>
                    <p className="text-[11px] text-[var(--ui-muted,#6b7280)] mt-0.5">Automated visual regression tests</p>
                  </div>
                  <div className="p-2 hover:bg-black/5 rounded-lg cursor-pointer transition-colors mt-1 border-t border-[var(--ui-border,#e5e7eb)] pt-2">
                    <p className="text-[11px] font-medium text-[var(--ui-accent,#4f6b85)] flex items-center justify-between">
                      View all products <ChevronRight size={12} />
                    </p>
                  </div>
                </div>
              )}
            </div>
            <a href="#solutions" className="hover:text-[var(--ui-fg,#111111)] transition-colors">Solutions</a>
            <a href="#docs" className="hover:text-[var(--ui-fg,#111111)] transition-colors">Documentation</a>
            <a href="#pricing" className="hover:text-[var(--ui-fg,#111111)] transition-colors">Pricing</a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-flex text-xs font-semibold text-[var(--ui-muted,#6b7280)] hover:text-[var(--ui-fg,#111111)] px-3 py-2">
            Log in
          </button>
          <button className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--ui-primary,#111111)] text-white text-xs font-medium hover:opacity-90 transition-all shadow-sm">
            Start Free Trial <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </header>
  );
};

export const LuxuryGlassNavbar: React.FC = () => {
  return (
    <div className="w-full p-4 flex justify-center bg-[var(--ui-bg,#f7f7f5)]">
      <header className="max-w-4xl w-full bg-[var(--ui-card,#ffffff)]/80 backdrop-blur-xl border border-[var(--ui-border,#e5e7eb)] rounded-full px-6 py-3 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex items-center gap-3">
          <div className="size-6 rounded-full bg-[var(--ui-primary,#111111)] flex items-center justify-center text-[10px] text-white font-serif">
            ✦
          </div>
          <span className="font-serif tracking-widest text-xs uppercase font-semibold text-[var(--ui-fg,#111111)]">
            Atelier
          </span>
        </div>

        <nav className="hidden sm:flex items-center gap-7 text-xs tracking-wider uppercase font-medium text-[var(--ui-muted,#6b7280)]">
          <a href="#creations" className="text-[var(--ui-fg,#111111)] hover:text-[var(--ui-accent,#4f6b85)]">Creations</a>
          <a href="#exhibits" className="hover:text-[var(--ui-fg,#111111)]">Exhibits</a>
          <a href="#archive" className="hover:text-[var(--ui-fg,#111111)]">Archive</a>
          <a href="#journal" className="hover:text-[var(--ui-fg,#111111)]">Journal</a>
        </nav>

        <button className="px-4 py-1.5 rounded-full bg-[var(--ui-primary,#111111)] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[var(--ui-secondary,#4f6b85)] transition-colors">
          Inquire
        </button>
      </header>
    </div>
  );
};

export const EnterpriseNav: React.FC = () => {
  return (
    <header className="w-full bg-[var(--ui-card,#ffffff)] border-b border-[var(--ui-border,#e5e7eb)] px-6 py-2.5 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded bg-[var(--ui-primary,#111111)] flex items-center justify-center text-white font-bold text-xs">
            E
          </div>
          <span className="font-semibold text-sm text-[var(--ui-fg,#111111)]">Enterprise Core</span>
        </div>

        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-black/5 rounded-md text-xs text-[var(--ui-muted,#6b7280)] w-64 border border-transparent focus-within:border-[var(--ui-accent,#4f6b85)]">
          <Search size={14} />
          <input
            type="text"
            placeholder="Search resources, users, logs..."
            className="bg-transparent outline-none w-full text-xs text-[var(--ui-fg,#111111)]"
          />
          <span className="text-[10px] font-mono px-1 bg-white border border-gray-200 rounded">⌘K</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-1.5 rounded-md text-[var(--ui-muted,#6b7280)] hover:text-[var(--ui-fg,#111111)] hover:bg-black/5">
          <Bell size={16} />
          <span className="absolute top-1 right-1 size-2 rounded-full bg-red-500" />
        </button>
        <div className="h-4 w-px bg-[var(--ui-border,#e5e7eb)]" />
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-full bg-[var(--ui-accent,#4f6b85)] text-white font-semibold text-xs flex items-center justify-center">
            AD
          </div>
          <div className="hidden sm:block text-left text-xs leading-none">
            <p className="font-semibold text-[var(--ui-fg,#111111)]">Alex Drake</p>
            <p className="text-[10px] text-[var(--ui-muted,#6b7280)] mt-0.5">Admin Org</p>
          </div>
        </div>
      </div>
    </header>
  );
};

/* =========================================================================
   2. HERO SECTIONS
   ========================================================================= */

export const SaaSSplitHero: React.FC = () => {
  return (
    <section className="w-full bg-[var(--ui-bg,#f7f7f5)] py-16 px-6 sm:px-12 transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] shadow-xs">
            <Sparkles size={13} className="text-[var(--ui-accent,#4f6b85)]" />
            <span className="text-xs font-semibold text-[var(--ui-fg,#111111)]">
              Next-Gen UI Architecture 3.0
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--ui-fg,#111111)] leading-[1.08]">
            Craft interfaces that command <span className="text-[var(--ui-accent,#4f6b85)]">authority.</span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--ui-muted,#6b7280)] leading-relaxed max-w-xl">
            A production-ready design catalog engineered for serious digital products. High contrast, precise tokens, and zero boilerplate.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <div className="flex items-center gap-2 bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] rounded-lg px-3 py-2 shadow-xs focus-within:border-[var(--ui-accent,#4f6b85)]">
              <Mail size={16} className="text-[var(--ui-muted,#6b7280)]" />
              <input
                type="email"
                placeholder="name@company.com"
                className="outline-none text-sm w-full sm:w-56 bg-transparent text-[var(--ui-fg,#111111)]"
              />
            </div>
            <button className="px-6 py-2.5 rounded-lg bg-[var(--ui-primary,#111111)] text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm">
              Start Free Trial <ArrowRight size={14} />
            </button>
          </div>

          <div className="flex items-center gap-6 pt-4 text-xs font-medium text-[var(--ui-muted,#6b7280)]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>Full source code</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--ui-border,#e5e7eb)]">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-red-400" />
                <div className="size-3 rounded-full bg-amber-400" />
                <div className="size-3 rounded-full bg-emerald-400" />
              </div>
              <span className="text-[11px] font-mono text-[var(--ui-muted,#6b7280)]">production-manifest.json</span>
            </div>

            <div className="space-y-4 pt-4">
              <div className="p-3.5 rounded-xl bg-black/5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[var(--ui-fg,#111111)]">System Status</p>
                  <p className="text-[11px] text-[var(--ui-muted,#6b7280)]">Operational infrastructure</p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-600">99.99%</span>
              </div>

              <div className="p-3.5 rounded-xl bg-black/5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[var(--ui-fg,#111111)]">Edge Latency</p>
                  <p className="text-[11px] text-[var(--ui-muted,#6b7280)]">Global acceleration</p>
                </div>
                <span className="text-xs font-mono font-bold text-[var(--ui-accent,#4f6b85)]">14ms</span>
              </div>

              <div className="p-3.5 rounded-xl border border-[var(--ui-border,#e5e7eb)] flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--ui-fg,#111111)]">Component Nodes</span>
                <span className="text-xs font-bold text-[var(--ui-fg,#111111)]">Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ProductMetricHero: React.FC = () => {
  return (
    <section className="w-full bg-[var(--ui-bg,#f7f7f5)] py-20 px-6 text-center">
      <div className="max-w-4xl mx-auto space-y-6">
        <span className="text-xs uppercase tracking-widest font-bold text-[var(--ui-accent,#4f6b85)]">
          Engineering Precision
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--ui-fg,#111111)]">
          Built for teams that refuse to compromise on design.
        </h1>
        <p className="text-base sm:text-lg text-[var(--ui-muted,#6b7280)] max-w-2xl mx-auto">
          Production UI components, responsive layouts, and tokenized themes built strictly to modern web standards.
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <button className="px-6 py-3 rounded-lg bg-[var(--ui-primary,#111111)] text-white text-sm font-semibold hover:opacity-90 shadow-md">
            Explore Catalog
          </button>
          <button className="px-6 py-3 rounded-lg bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] text-[var(--ui-fg,#111111)] text-sm font-semibold hover:bg-black/5">
            Book Tech Demo
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-[var(--ui-border,#e5e7eb)] mt-12">
          <div>
            <p className="text-3xl font-extrabold text-[var(--ui-fg,#111111)]">99.8%</p>
            <p className="text-xs text-[var(--ui-muted,#6b7280)] mt-1">Lighthouse Score</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-[var(--ui-fg,#111111)]">&lt; 15kb</p>
            <p className="text-xs text-[var(--ui-muted,#6b7280)] mt-1">Average Bundle Size</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-[var(--ui-fg,#111111)]">100%</p>
            <p className="text-xs text-[var(--ui-muted,#6b7280)] mt-1">Production Tested</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-[var(--ui-fg,#111111)]">100%</p>
            <p className="text-xs text-[var(--ui-muted,#6b7280)] mt-1">TypeScript Verified</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const MinimalDarkHero: React.FC = () => {
  return (
    <section className="w-full bg-[#0D0F12] py-20 px-6 text-white text-center rounded-2xl my-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-mono text-gray-300">
          DESIGN ARCHITECTURE SPECIFICATION
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
          The software interface library for ruthless perfectionists.
        </h1>
        <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
          No flashy purple gradients. Just clean, robust, high-performance UI components built with modern Tailwind CSS and React.
        </p>
        <div className="pt-4 flex justify-center gap-3">
          <button className="px-5 py-2.5 rounded-lg bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors">
            Get Started
          </button>
          <button className="px-5 py-2.5 rounded-lg border border-white/20 text-white font-medium text-sm hover:bg-white/10 transition-colors">
            Read Docs
          </button>
        </div>
      </div>
    </section>
  );
};

/* =========================================================================
   3. CARDS & PRICING
   ========================================================================= */

export const TieredPricingCards: React.FC = () => {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="w-full bg-[var(--ui-bg,#f7f7f5)] py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-[var(--ui-fg,#111111)]">Transparent, predictable pricing</h2>
          <p className="text-sm text-[var(--ui-muted,#6b7280)]">Upgrade or cancel anytime. All plans include full source code.</p>

          <div className="flex items-center justify-center gap-3 pt-2">
            <span className={`text-xs font-semibold ${!annual ? 'text-[var(--ui-fg,#111111)]' : 'text-[var(--ui-muted,#6b7280)]'}`}>
              Monthly
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className="w-11 h-6 bg-[var(--ui-primary,#111111)] rounded-full p-1 transition-colors relative"
            >
              <div
                className={`size-4 bg-white rounded-full transition-transform ${annual ? 'translate-x-5' : 'translate-x-0'}`}
              />
            </button>
            <span className={`text-xs font-semibold ${annual ? 'text-[var(--ui-fg,#111111)]' : 'text-[var(--ui-muted,#6b7280)]'}`}>
              Annual <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded ml-1">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-[var(--ui-fg,#111111)]">Starter</h3>
              <p className="text-xs text-[var(--ui-muted,#6b7280)]">For individual designers and makers.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-[var(--ui-fg,#111111)]">${annual ? '7' : '9'}</span>
                <span className="text-xs text-[var(--ui-muted,#6b7280)]">/ month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[var(--ui-muted,#6b7280)] pt-4 border-t border-[var(--ui-border,#e5e7eb)]">
                <li className="flex items-center gap-2 text-[var(--ui-fg,#111111)]">
                  <Check size={14} className="text-emerald-600" /> Full free & starter library
                </li>
                <li className="flex items-center gap-2 text-[var(--ui-fg,#111111)]">
                  <Check size={14} className="text-emerald-600" /> HTML & React source code
                </li>
                <li className="flex items-center gap-2 text-[var(--ui-fg,#111111)]">
                  <Check size={14} className="text-emerald-600" /> Authentic AI prompts
                </li>
              </ul>
            </div>
            <button className="w-full mt-8 py-2.5 rounded-lg border border-[var(--ui-border,#e5e7eb)] text-xs font-semibold hover:bg-black/5 transition-colors">
              Choose Starter
            </button>
          </div>

          <div className="bg-[var(--ui-card,#ffffff)] border-2 border-[var(--ui-primary,#111111)] rounded-2xl p-6 shadow-lg relative flex flex-col justify-between">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--ui-primary,#111111)] text-white text-[10px] uppercase font-bold tracking-wider px-3 py-0.5 rounded-full">
              Most Popular
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-[var(--ui-fg,#111111)]">Pro Designer</h3>
              <p className="text-xs text-[var(--ui-muted,#6b7280)]">For active software product builders.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-[var(--ui-fg,#111111)]">${annual ? '13' : '16'}</span>
                <span className="text-xs text-[var(--ui-muted,#6b7280)]">/ month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[var(--ui-muted,#6b7280)] pt-4 border-t border-[var(--ui-border,#e5e7eb)]">
                <li className="flex items-center gap-2 text-[var(--ui-fg,#111111)]">
                  <Check size={14} className="text-emerald-600" /> Everything in Starter
                </li>
                <li className="flex items-center gap-2 text-[var(--ui-fg,#111111)]">
                  <Check size={14} className="text-emerald-600" /> Advanced dashboards & systems
                </li>
                <li className="flex items-center gap-2 text-[var(--ui-fg,#111111)]">
                  <Check size={14} className="text-emerald-600" /> Early access releases
                </li>
              </ul>
            </div>
            <button className="w-full mt-8 py-2.5 rounded-lg bg-[var(--ui-primary,#111111)] text-white text-xs font-semibold hover:opacity-90 transition-opacity">
              Get Pro Access
            </button>
          </div>

          <div className="bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-[var(--ui-fg,#111111)]">Studio & Team</h3>
              <p className="text-xs text-[var(--ui-muted,#6b7280)]">Unrestricted access and token studio.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-[var(--ui-fg,#111111)]">${annual ? '17' : '20'}</span>
                <span className="text-xs text-[var(--ui-muted,#6b7280)]">/ month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[var(--ui-muted,#6b7280)] pt-4 border-t border-[var(--ui-border,#e5e7eb)]">
                <li className="flex items-center gap-2 text-[var(--ui-fg,#111111)]">
                  <Check size={14} className="text-emerald-600" /> Full uninhibited library
                </li>
                <li className="flex items-center gap-2 text-[var(--ui-fg,#111111)]">
                  <Check size={14} className="text-emerald-600" /> Live Token Palette Studio
                </li>
                <li className="flex items-center gap-2 text-[var(--ui-fg,#111111)]">
                  <Check size={14} className="text-emerald-600" /> Unlimited design saves
                </li>
              </ul>
            </div>
            <button className="w-full mt-8 py-2.5 rounded-lg border border-[var(--ui-border,#e5e7eb)] text-xs font-semibold hover:bg-black/5 transition-colors">
              Choose Studio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const InteractiveFeatureGrid: React.FC = () => {
  return (
    <div className="w-full bg-[var(--ui-bg,#f7f7f5)] py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="max-w-xl">
          <span className="text-xs uppercase font-bold text-[var(--ui-accent,#4f6b85)]">Core Architecture</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ui-fg,#111111)] mt-1">Built to endure scale.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] rounded-xl space-y-3 hover:border-[var(--ui-accent,#4f6b85)] transition-colors">
            <div className="size-10 rounded-lg bg-[var(--ui-accent,#4f6b85)]/10 text-[var(--ui-accent,#4f6b85)] flex items-center justify-center font-bold">
              <Layers size={20} />
            </div>
            <h3 className="font-bold text-sm text-[var(--ui-fg,#111111)]">Atomic Token Architecture</h3>
            <p className="text-xs text-[var(--ui-muted,#6b7280)] leading-relaxed">
              Every color, spacing, and border variable is mapped systematically so themes can be switched in real time.
            </p>
          </div>

          <div className="p-6 bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] rounded-xl space-y-3 hover:border-[var(--ui-accent,#4f6b85)] transition-colors">
            <div className="size-10 rounded-lg bg-[var(--ui-accent,#4f6b85)]/10 text-[var(--ui-accent,#4f6b85)] flex items-center justify-center font-bold">
              <FileCode2 size={20} />
            </div>
            <h3 className="font-bold text-sm text-[var(--ui-fg,#111111)]">Zero-Boilerplate Code</h3>
            <p className="text-xs text-[var(--ui-muted,#6b7280)] leading-relaxed">
              Clean TypeScript and standard HTML5 without unnecessary dependencies, ready to drop into any stack.
            </p>
          </div>

          <div className="p-6 bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] rounded-xl space-y-3 hover:border-[var(--ui-accent,#4f6b85)] transition-colors">
            <div className="size-10 rounded-lg bg-[var(--ui-accent,#4f6b85)]/10 text-[var(--ui-accent,#4f6b85)] flex items-center justify-center font-bold">
              <Sparkles size={20} />
            </div>
            <h3 className="font-bold text-sm text-[var(--ui-fg,#111111)]">Authentic AI Prompts</h3>
            <p className="text-xs text-[var(--ui-muted,#6b7280)] leading-relaxed">
              Exhaustive engineering specifications detailing typography, layout, states, and animation for AI coding models.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TestimonialSliderCards: React.FC = () => {
  const [active, setActive] = useState(0);

  const testimonials = [
    {
      quote: "Orillusive completely changed how our design team operates. The speed of finding a real production-grade UI pattern and adapting its tokens is unmatched.",
      author: "Elena Rostova",
      role: "Head of Product Design, Synapse Systems",
      rating: 5
    },
    {
      quote: "The authentic AI prompts alone are worth 10x the price. They allow our engineers to reproduce complex layout states without ambiguity.",
      author: "Marcus Vance",
      role: "Lead Frontend Architect, Vektor Corp",
      rating: 5
    }
  ];

  const current = testimonials[active];

  return (
    <div className="w-full bg-[var(--ui-bg,#f7f7f5)] py-12 px-6">
      <div className="max-w-3xl mx-auto bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] rounded-2xl p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-1 text-amber-500">
          {[...Array(current.rating)].map((_, i) => (
            <Star key={i} size={16} fill="currentColor" />
          ))}
        </div>

        <p className="text-base sm:text-lg italic text-[var(--ui-fg,#111111)] leading-relaxed">
          &ldquo;{current.quote}&rdquo;
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-[var(--ui-border,#e5e7eb)]">
          <div>
            <p className="font-bold text-sm text-[var(--ui-fg,#111111)]">{current.author}</p>
            <p className="text-xs text-[var(--ui-muted,#6b7280)]">{current.role}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActive(active === 0 ? testimonials.length - 1 : active - 1)}
              className="p-2 rounded-lg border border-[var(--ui-border,#e5e7eb)] hover:bg-black/5"
            >
              <ChevronRight size={16} className="rotate-180" />
            </button>
            <button
              onClick={() => setActive((active + 1) % testimonials.length)}
              className="p-2 rounded-lg border border-[var(--ui-border,#e5e7eb)] hover:bg-black/5"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   4. DROPDOWNS
   ========================================================================= */

export const MinimalDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Production Branch');

  const options = [
    'Production Branch',
    'Staging Preview',
    'Development Alpha',
    'Feature Sandbox'
  ];

  return (
    <div className="w-full bg-[var(--ui-bg,#f7f7f5)] p-8 flex justify-center items-center min-h-[300px]">
      <div className="relative w-72">
        <label className="block text-xs font-semibold text-[var(--ui-fg,#111111)] mb-1.5">
          Active Environment
        </label>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-3.5 py-2.5 bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] rounded-xl text-xs font-medium text-[var(--ui-fg,#111111)] shadow-2xs hover:border-gray-400 focus:outline-none focus:border-[var(--ui-accent,#4f6b85)] transition-all"
        >
          <span>{selected}</span>
          <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 mt-2 bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] rounded-xl shadow-xl p-1.5 z-30 animate-in fade-in slide-in-from-top-2">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setSelected(opt);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  selected === opt
                    ? 'bg-black/5 text-[var(--ui-fg,#111111)] font-semibold'
                    : 'text-[var(--ui-muted,#6b7280)] hover:bg-black/5 hover:text-[var(--ui-fg,#111111)]'
                }`}
              >
                <span>{opt}</span>
                {selected === opt && <Check size={13} className="text-[var(--ui-accent,#4f6b85)]" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const MegaMenuDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full bg-[var(--ui-bg,#f7f7f5)] p-6 flex flex-col items-center min-h-[380px]">
      <div className="relative w-full max-w-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--ui-border,#e5e7eb)]">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--ui-fg,#111111)]">
            Mega Menu System
          </span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--ui-primary,#111111)] text-white"
          >
            {isOpen ? 'Close Menu' : 'Open Mega Menu'}
          </button>
        </div>

        {isOpen && (
          <div className="mt-4 bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] rounded-2xl p-6 shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--ui-fg,#111111)] uppercase tracking-wider">
                <Layers size={14} className="text-[var(--ui-accent,#4f6b85)]" />
                <span>Foundations</span>
              </div>
              <ul className="space-y-2 text-xs text-[var(--ui-muted,#6b7280)]">
                <li><a href="#tokens" className="hover:text-[var(--ui-fg,#111111)] block py-1 font-medium">Design Tokens (CSS/JS)</a></li>
                <li><a href="#typography" className="hover:text-[var(--ui-fg,#111111)] block py-1 font-medium">Poppins Typography Scales</a></li>
                <li><a href="#colors" className="hover:text-[var(--ui-fg,#111111)] block py-1 font-medium">Dynamic Color Palettes</a></li>
                <li><a href="#grid" className="hover:text-[var(--ui-fg,#111111)] block py-1 font-medium">Fluid Grid Layouts</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--ui-fg,#111111)] uppercase tracking-wider">
                <FileCode2 size={14} className="text-[var(--ui-accent,#4f6b85)]" />
                <span>Components</span>
              </div>
              <ul className="space-y-2 text-xs text-[var(--ui-muted,#6b7280)]">
                <li><a href="#dropdowns" className="hover:text-[var(--ui-fg,#111111)] block py-1 font-medium">Dropdowns & Overlays</a></li>
                <li><a href="#navbars" className="hover:text-[var(--ui-fg,#111111)] block py-1 font-medium">Responsive Navbars</a></li>
                <li><a href="#pricing" className="hover:text-[var(--ui-fg,#111111)] block py-1 font-medium">Pricing Matrices</a></li>
                <li><a href="#inputs" className="hover:text-[var(--ui-fg,#111111)] block py-1 font-medium">Form Input Groups</a></li>
              </ul>
            </div>

            <div className="bg-black/5 rounded-xl p-4 flex flex-col justify-between border border-black/5">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--ui-primary,#111111)] text-white text-[10px] font-bold uppercase tracking-wider">
                  New Release
                </div>
                <h4 className="font-bold text-xs text-[var(--ui-fg,#111111)]">Iframe Viewport Sandbox</h4>
                <p className="text-[11px] text-[var(--ui-muted,#6b7280)] leading-relaxed">
                  Test actual CSS media queries and Tailwind classes in an isolated preview container.
                </p>
              </div>
              <a href="#sandbox" className="text-[11px] font-bold text-[var(--ui-accent,#4f6b85)] hover:underline flex items-center gap-1 mt-3">
                Explore Feature <ArrowRight size={12} />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const UserProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full bg-[var(--ui-bg,#f7f7f5)] p-8 flex justify-center items-center min-h-[360px]">
      <div className="relative w-80">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-2 rounded-2xl bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] shadow-xs hover:border-gray-400 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-[var(--ui-primary,#111111)] text-white font-bold text-xs flex items-center justify-center">
              AD
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-[var(--ui-fg,#111111)] leading-none">Alex Drake</p>
              <p className="text-[11px] text-[var(--ui-muted,#6b7280)] mt-0.5">alex@orillusive.com</p>
            </div>
          </div>
          <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 mt-2 bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] rounded-2xl shadow-xl p-2 z-30 animate-in fade-in space-y-1">
            <div className="px-3 py-2 border-b border-[var(--ui-border,#e5e7eb)]">
              <p className="text-[10px] uppercase font-bold text-[var(--ui-muted,#6b7280)] tracking-wider">Workspace</p>
              <p className="text-xs font-bold text-[var(--ui-fg,#111111)] mt-0.5">Orillusive Core Team</p>
            </div>

            <div className="pt-1">
              <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[var(--ui-fg,#111111)] hover:bg-black/5 transition-colors font-medium">
                <User size={14} className="text-gray-400" />
                <span>Account Profile</span>
              </button>
              <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[var(--ui-fg,#111111)] hover:bg-black/5 transition-colors font-medium">
                <Key size={14} className="text-gray-400" />
                <span>API Keys & Tokens</span>
              </button>
              <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[var(--ui-fg,#111111)] hover:bg-black/5 transition-colors font-medium">
                <Settings size={14} className="text-gray-400" />
                <span>Project Settings</span>
              </button>
            </div>

            <div className="border-t border-[var(--ui-border,#e5e7eb)] pt-1">
              <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-red-600 hover:bg-red-50 transition-colors font-semibold">
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const FilterSortDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedSort, setSelectedSort] = useState('newest');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['react', 'html']);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="w-full bg-[var(--ui-bg,#f7f7f5)] p-8 flex justify-center items-center min-h-[380px]">
      <div className="relative w-80">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] text-xs font-semibold text-[var(--ui-fg,#111111)] shadow-xs"
        >
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-[var(--ui-accent,#4f6b85)]" />
            <span>Filter & Sort Options</span>
          </div>
          <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 mt-2 bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] rounded-2xl shadow-xl p-4 z-30 animate-in fade-in space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--ui-muted,#6b7280)]">
                Sort Order
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'newest', label: 'Newest First' },
                  { id: 'popular', label: 'Most Popular' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSort(s.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      selectedSort === s.id
                        ? 'bg-black text-white border-black'
                        : 'border-[var(--ui-border,#e5e7eb)] text-[var(--ui-fg,#111111)] hover:bg-black/5'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--ui-muted,#6b7280)]">
                Include Implementations
              </span>
              <div className="space-y-1.5">
                {[
                  { id: 'react', label: 'React TSX Component' },
                  { id: 'html', label: 'HTML5 / CSS3 Markup' },
                  { id: 'prompt', label: 'Authentic AI Prompt' }
                ].map((item) => {
                  const checked = selectedTypes.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleType(item.id)}
                      className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-black/5 text-xs text-[var(--ui-fg,#111111)]"
                    >
                      <div className={`size-4 rounded border flex items-center justify-center ${
                        checked ? 'bg-[var(--ui-primary,#111111)] border-black text-white' : 'border-gray-300 bg-white'
                      }`}>
                        {checked && <Check size={11} />}
                      </div>
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--ui-border,#e5e7eb)] flex items-center justify-between">
              <button
                onClick={() => setSelectedTypes([])}
                className="text-xs font-semibold text-[var(--ui-muted,#6b7280)] hover:text-black"
              >
                Reset All
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 bg-[var(--ui-primary,#111111)] text-white text-xs font-semibold rounded-lg hover:opacity-90"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const ContextMenuDropdown: React.FC = () => {
  return (
    <div className="w-full bg-[var(--ui-bg,#f7f7f5)] p-8 flex justify-center items-center min-h-[340px]">
      <div className="w-64 bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] rounded-2xl shadow-xl p-2 font-sans space-y-1">
        <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-[var(--ui-muted,#6b7280)] tracking-wider">
          Design Actions
        </div>

        <button className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-[var(--ui-fg,#111111)] hover:bg-black/5 transition-colors font-medium">
          <div className="flex items-center gap-2">
            <Copy size={13} className="text-gray-500" />
            <span>Copy Component</span>
          </div>
          <span className="text-[10px] font-mono text-gray-400">⌘C</span>
        </button>

        <button className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-[var(--ui-fg,#111111)] hover:bg-black/5 transition-colors font-medium">
          <Edit size={13} className="text-gray-500" />
          <span>Edit Design Tokens</span>
        </button>

        <button className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-[var(--ui-fg,#111111)] hover:bg-black/5 transition-colors font-medium">
          <ExternalLink size={13} className="text-gray-500" />
          <span>Open Full Sandbox</span>
          <span className="text-[10px] font-mono text-gray-400">⌘O</span>
        </button>

        <div className="border-t border-[var(--ui-border,#e5e7eb)] my-1" />

        <button className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-red-600 hover:bg-red-50 transition-colors font-medium">
          <div className="flex items-center gap-2">
            <Trash2 size={13} />
            <span>Remove from Saved</span>
          </div>
          <span className="text-[10px] font-mono text-red-400">⌫</span>
        </button>
      </div>
    </div>
  );
};

/* =========================================================================
   5. UI COMPONENTS & CONTROLS
   ========================================================================= */

export const ButtonGroupControls: React.FC = () => {
  const [segmented, setSegmented] = useState('day');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <div className="w-full bg-[var(--ui-bg,#f7f7f5)] p-8 flex flex-col items-center justify-center gap-6 min-h-[320px]">
      <div className="p-1 bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] rounded-2xl flex items-center gap-1 shadow-2xs">
        {['day', 'week', 'month', 'year'].map((t) => (
          <button
            key={t}
            onClick={() => setSegmented(t)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              segmented === t
                ? 'bg-[var(--ui-primary,#111111)] text-white shadow-xs'
                : 'text-[var(--ui-muted,#6b7280)] hover:text-[var(--ui-fg,#111111)]'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="p-1 bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] rounded-xl flex items-center gap-1 shadow-2xs">
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded-lg text-xs transition-colors ${
              view === 'grid' ? 'bg-black text-white' : 'text-gray-500 hover:text-black'
            }`}
            title="Grid View"
          >
            <Grid size={15} />
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-2 rounded-lg text-xs transition-colors ${
              view === 'list' ? 'bg-black text-white' : 'text-gray-500 hover:text-black'
            }`}
            title="List View"
          >
            <List size={15} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-xl bg-[var(--ui-primary,#111111)] text-white text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm flex items-center gap-1.5">
            <Plus size={14} /> New Component
          </button>
          <button className="px-4 py-2 rounded-xl border border-[var(--ui-border,#e5e7eb)] bg-white text-[var(--ui-fg,#111111)] text-xs font-semibold hover:bg-black/5 transition-colors">
            Export TSX
          </button>
        </div>
      </div>
    </div>
  );
};

export const InputValidationGroup: React.FC = () => {
  return (
    <div className="w-full bg-[var(--ui-bg,#f7f7f5)] p-8 flex justify-center items-center min-h-[380px]">
      <div className="max-w-md w-full bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-[var(--ui-fg,#111111)]">Form Validation States</h3>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-[var(--ui-fg,#111111)]">Repository Name</label>
          <div className="relative">
            <input
              type="text"
              defaultValue="orillusive-design-tokens"
              className="w-full px-3 py-2 text-xs border-2 border-emerald-500 rounded-xl outline-none bg-white text-gray-900 pr-9"
            />
            <CheckCircle2 size={16} className="absolute right-3 top-2.5 text-emerald-600" />
          </div>
          <p className="text-[11px] text-emerald-600 font-medium">Repository name is valid and available.</p>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-[var(--ui-fg,#111111)]">Custom Token Variable</label>
          <div className="relative">
            <input
              type="text"
              defaultValue="invalid variable string"
              className="w-full px-3 py-2 text-xs border-2 border-red-500 rounded-xl outline-none bg-white text-gray-900 pr-9"
            />
            <AlertCircle size={16} className="absolute right-3 top-2.5 text-red-500" />
          </div>
          <p className="text-[11px] text-red-600 font-medium">Variables must start with --ui- and use kebab-case.</p>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-400">Environment Host (Locked)</label>
          <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 overflow-hidden text-xs text-gray-400 px-3 py-2">
            <span className="font-mono text-[11px] text-gray-400 mr-1">https://</span>
            <input
              type="text"
              disabled
              value="api.orillusive.com"
              className="bg-transparent outline-none w-full cursor-not-allowed font-mono text-[11px] text-gray-600"
            />
            <Lock size={12} className="text-gray-400 shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const StatusAlertsStack: React.FC = () => {
  return (
    <div className="w-full bg-[var(--ui-bg,#f7f7f5)] p-8 flex justify-center items-center min-h-[380px]">
      <div className="max-w-lg w-full space-y-3 font-sans">
        <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-blue-900 flex items-start gap-3">
          <Info size={16} className="text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-bold">Token Sync Complete</p>
            <p className="text-blue-700/90 mt-0.5">All 8 active theme tokens have been propagated to your stylesheet.</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-900 flex items-start gap-3">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-bold">Design Exported Successfully</p>
            <p className="text-emerald-700/90 mt-0.5">TSX source code ready for use in your project repository.</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 flex items-start gap-3">
          <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-bold">Low Viewport Warning</p>
            <p className="text-amber-700/90 mt-0.5">Ensure horizontal padding is reduced on mobile screens below 360px.</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-red-50/70 border border-red-200 text-red-900 flex items-start gap-3">
          <AlertCircle size={16} className="text-red-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-bold">Invalid Color Hex Code</p>
            <p className="text-red-700/90 mt-0.5">Please provide a 6-digit hex code or standard CSS variable reference.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModalDialogOverlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full bg-[var(--ui-bg,#f7f7f5)] p-8 flex flex-col items-center justify-center min-h-[380px]">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-[var(--ui-primary,#111111)] text-white text-xs font-semibold shadow-md"
        >
          Open Modal Dialog
        </button>
      ) : (
        <div className="max-w-md w-full bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--ui-border,#e5e7eb)]">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-[var(--ui-accent,#4f6b85)]" />
              <h3 className="font-bold text-sm text-[var(--ui-fg,#111111)]">Confirm Component Export</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-black">
              <X size={16} />
            </button>
          </div>

          <p className="text-xs text-[var(--ui-muted,#6b7280)] leading-relaxed">
            This action will export the selected component along with its authentic AI prompt and CSS custom property token mappings.
          </p>

          <div className="p-3 rounded-xl bg-black/5 text-[11px] font-mono text-gray-700">
            Export format: TypeScript TSX + Tailwind CSS
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-[var(--ui-border,#e5e7eb)]">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-lg border border-[var(--ui-border,#e5e7eb)] text-xs font-semibold text-gray-700 hover:bg-black/5 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-lg bg-[var(--ui-primary,#111111)] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              Confirm & Export
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const BreadcrumbNavigation: React.FC = () => {
  return (
    <div className="w-full bg-[var(--ui-bg,#f7f7f5)] p-8 flex flex-col items-center justify-center gap-4 min-h-[260px]">
      <div className="max-w-xl w-full bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] rounded-2xl p-4 shadow-sm">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-[var(--ui-muted,#6b7280)]">
          <a href="#home" className="flex items-center gap-1.5 hover:text-[var(--ui-fg,#111111)] transition-colors">
            <Home size={14} />
            <span>Library</span>
          </a>

          <ChevronRight size={13} className="text-gray-400" />

          <a href="#category" className="hover:text-[var(--ui-fg,#111111)] transition-colors">
            Dropdowns
          </a>

          <ChevronRight size={13} className="text-gray-400" />

          <span className="text-[var(--ui-fg,#111111)] font-semibold">
            Mega Menu System
          </span>
        </nav>
      </div>
    </div>
  );
};

/* =========================================================================
   6. FORMS & AUTHENTICATION
   ========================================================================= */

export const SplitScreenAuthCard: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-full bg-[var(--ui-bg,#f7f7f5)] py-12 px-6 flex justify-center">
      <div className="max-w-md w-full bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] rounded-2xl p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="size-10 rounded-xl bg-[var(--ui-primary,#111111)] mx-auto flex items-center justify-center text-white font-bold text-base">
            O
          </div>
          <h2 className="text-2xl font-bold text-[var(--ui-fg,#111111)]">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-xs text-[var(--ui-muted,#6b7280)]">
            {isLogin ? 'Enter your credentials to access your library' : 'Start building with production-ready UI designs'}
          </p>
        </div>

        <div className="space-y-4">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--ui-fg,#111111)]">Full Name</label>
              <input
                type="text"
                placeholder="Sarah Connor"
                className="w-full px-3 py-2 text-sm border border-[var(--ui-border,#e5e7eb)] rounded-lg outline-none focus:border-[var(--ui-accent,#4f6b85)]"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--ui-fg,#111111)]">Work Email</label>
            <input
              type="email"
              placeholder="s.connor@cyberdyne.com"
              className="w-full px-3 py-2 text-sm border border-[var(--ui-border,#e5e7eb)] rounded-lg outline-none focus:border-[var(--ui-accent,#4f6b85)]"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[var(--ui-fg,#111111)]">Password</label>
              {isLogin && <a href="#forgot" className="text-xs text-[var(--ui-accent,#4f6b85)] hover:underline">Forgot?</a>}
            </div>
            <input
              type="password"
              placeholder="••••••••••••"
              className="w-full px-3 py-2 text-sm border border-[var(--ui-border,#e5e7eb)] rounded-lg outline-none focus:border-[var(--ui-accent,#4f6b85)]"
            />
          </div>

          <button className="w-full py-2.5 rounded-lg bg-[var(--ui-primary,#111111)] text-white text-sm font-semibold hover:opacity-90 shadow-sm transition-opacity">
            {isLogin ? 'Sign In to Workspace' : 'Create Free Account'}
          </button>
        </div>

        <div className="text-center pt-2 border-t border-[var(--ui-border,#e5e7eb)]">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs text-[var(--ui-muted,#6b7280)] hover:text-[var(--ui-fg,#111111)]"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export const MultiStepOnboardingForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('developer');

  return (
    <div className="w-full bg-[var(--ui-bg,#f7f7f5)] py-12 px-6 flex justify-center">
      <div className="max-w-lg w-full bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] rounded-2xl p-8 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[var(--ui-muted,#6b7280)]">
            <span>Step {step} of 3</span>
            <span>{step === 1 ? 'Primary Role' : step === 2 ? 'Stack Preferences' : 'Workspace Setup'}</span>
          </div>
          <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--ui-primary,#111111)] transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-[var(--ui-fg,#111111)]">What is your primary discipline?</h3>
            <div className="space-y-2">
              {[
                { id: 'designer', title: 'Product & UI Designer', desc: 'I design design systems and prototypes.' },
                { id: 'developer', title: 'Frontend / Fullstack Engineer', desc: 'I build production web applications.' },
                { id: 'founder', title: 'Founder & Product Lead', desc: 'I launch digital software products.' }
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setRole(item.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    role === item.id
                      ? 'border-[var(--ui-primary,#111111)] bg-black/5'
                      : 'border-[var(--ui-border,#e5e7eb)] hover:border-gray-300'
                  }`}
                >
                  <p className="text-xs font-bold text-[var(--ui-fg,#111111)]">{item.title}</p>
                  <p className="text-[11px] text-[var(--ui-muted,#6b7280)] mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-[var(--ui-fg,#111111)]">Select your default tech stack</h3>
            <div className="grid grid-cols-2 gap-3">
              {['React + Tailwind', 'HTML5 + CSS3', 'Next.js 14', 'Vue.js + Tailwind'].map((st) => (
                <div key={st} className="p-3 rounded-lg border border-[var(--ui-border,#e5e7eb)] text-center text-xs font-semibold text-[var(--ui-fg,#111111)] hover:border-[var(--ui-accent,#4f6b85)] cursor-pointer">
                  {st}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 text-center py-4">
            <div className="size-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check size={24} />
            </div>
            <h3 className="font-bold text-lg text-[var(--ui-fg,#111111)]">You're all set!</h3>
            <p className="text-xs text-[var(--ui-muted,#6b7280)]">
              Your personalized design catalog is ready.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-[var(--ui-border,#e5e7eb)]">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-4 py-2 text-xs font-semibold text-[var(--ui-muted,#6b7280)] disabled:opacity-30"
          >
            Back
          </button>
          <button
            onClick={() => setStep(step < 3 ? step + 1 : 1)}
            className="px-5 py-2 rounded-lg bg-[var(--ui-primary,#111111)] text-white text-xs font-semibold hover:opacity-90"
          >
            {step === 3 ? 'Launch Studio' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   7. NAVIGATION & OVERLAYS
   ========================================================================= */

export const CommandPaletteSearch: React.FC = () => {
  const [query, setQuery] = useState('');

  const sampleResults = [
    { title: 'Minimal Navbar with Hover States', category: 'Navbar', icon: 'nav' },
    { title: 'SaaS Split Conversion Hero', category: 'Hero', icon: 'hero' },
    { title: 'Mega Menu Dropdown System', category: 'Dropdown', icon: 'menu' },
    { title: 'Tiered Pricing Card Matrix', category: 'Pricing', icon: 'card' },
    { title: 'Modern Collapsible Sidebar', category: 'Dashboard', icon: 'side' }
  ].filter((r) => r.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="w-full bg-[var(--ui-bg,#f7f7f5)] py-12 px-6 flex justify-center">
      <div className="max-w-xl w-full bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-[var(--ui-border,#e5e7eb)] flex items-center gap-3">
          <Search size={18} className="text-[var(--ui-muted,#6b7280)]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a component, category, or token..."
            className="w-full bg-transparent outline-none text-sm text-[var(--ui-fg,#111111)] placeholder:text-gray-400"
          />
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/5 text-gray-500">ESC</span>
        </div>

        <div className="p-2 max-h-60 overflow-y-auto space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--ui-muted,#6b7280)]">
            Suggested Patterns
          </div>
          {sampleResults.map((res, i) => (
            <div
              key={i}
              className="px-3 py-2.5 rounded-lg hover:bg-black/5 cursor-pointer flex items-center justify-between text-xs transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <FileCode2 size={14} className="text-[var(--ui-accent,#4f6b85)]" />
                <span className="font-semibold text-[var(--ui-fg,#111111)]">{res.title}</span>
              </div>
              <span className="text-[10px] text-[var(--ui-muted,#6b7280)] bg-black/5 px-2 py-0.5 rounded">
                {res.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CollapsibleSidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState('overview');

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'components', label: 'Components', icon: Layers },
    { id: 'tokens', label: 'Color Tokens', icon: Sliders },
    { id: 'settings', label: 'Project Settings', icon: Settings },
    { id: 'support', label: 'Help & Docs', icon: HelpCircle }
  ];

  return (
    <div className="w-full bg-[var(--ui-bg,#f7f7f5)] p-6 flex justify-center">
      <aside className="w-64 bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] rounded-2xl p-4 shadow-sm flex flex-col justify-between h-[380px]">
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 px-2">
            <div className="size-7 rounded-lg bg-[var(--ui-primary,#111111)] flex items-center justify-center text-white text-xs font-bold">
              O
            </div>
            <div>
              <p className="font-bold text-xs text-[var(--ui-fg,#111111)]">Studio Workspace</p>
              <p className="text-[10px] text-[var(--ui-muted,#6b7280)]">Enterprise Tier</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[var(--ui-primary,#111111)] text-white'
                      : 'text-[var(--ui-muted,#6b7280)] hover:text-[var(--ui-fg,#111111)] hover:bg-black/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={15} />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-3 border-t border-[var(--ui-border,#e5e7eb)] flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-full bg-[var(--ui-accent,#4f6b85)] text-white text-[10px] font-bold flex items-center justify-center">
              AD
            </div>
            <p className="text-xs font-medium text-[var(--ui-fg,#111111)]">Alex Drake</p>
          </div>
          <button className="text-[var(--ui-muted,#6b7280)] hover:text-red-500">
            <LogOut size={14} />
          </button>
        </div>
      </aside>
    </div>
  );
};

export const InteractiveTabbedInterface: React.FC = () => {
  const [activeTab, setActiveTab] = useState('react');

  return (
    <div className="w-full bg-[var(--ui-bg,#f7f7f5)] py-8 px-6 flex justify-center">
      <div className="max-w-2xl w-full bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-[var(--ui-border,#e5e7eb)] pb-2">
          <button
            onClick={() => setActiveTab('react')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'react'
                ? 'bg-[var(--ui-primary,#111111)] text-white'
                : 'text-[var(--ui-muted,#6b7280)] hover:text-[var(--ui-fg,#111111)]'
            }`}
          >
            React Component
          </button>
          <button
            onClick={() => setActiveTab('html')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'html'
                ? 'bg-[var(--ui-primary,#111111)] text-white'
                : 'text-[var(--ui-muted,#6b7280)] hover:text-[var(--ui-fg,#111111)]'
            }`}
          >
            HTML + CSS
          </button>
          <button
            onClick={() => setActiveTab('prompt')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'prompt'
                ? 'bg-[var(--ui-primary,#111111)] text-white'
                : 'text-[var(--ui-muted,#6b7280)] hover:text-[var(--ui-fg,#111111)]'
            }`}
          >
            AI Prompt Recipe
          </button>
        </div>

        <div className="p-4 bg-black/5 rounded-xl font-mono text-xs text-[var(--ui-fg,#111111)] leading-relaxed">
          {activeTab === 'react' && (
            <div>
              <p className="text-gray-500">// React TSX Component Output</p>
              <p className="text-purple-700">import <span className="text-black">React</span> from <span className="text-emerald-700">'react'</span>;</p>
              <p className="mt-2 text-blue-700">export const <span className="text-amber-800">UIComponent</span>: React.FC = () =&gt; &#123;</p>
              <p className="pl-4 text-emerald-700">return &lt;div className="token-bound"&gt;...&lt;/div&gt;;</p>
              <p className="text-blue-700">&#125;;</p>
            </div>
          )}
          {activeTab === 'html' && (
            <div>
              <p className="text-gray-500">&lt;!-- Clean Semantic HTML5 --&gt;</p>
              <p className="text-blue-800">&lt;section class="ui-wrapper"&gt;</p>
              <p className="pl-4 text-gray-800">&lt;h2&gt;Dynamic Header&lt;/h2&gt;</p>
              <p className="text-blue-800">&lt;/section&gt;</p>
            </div>
          )}
          {activeTab === 'prompt' && (
            <div className="font-sans text-xs text-[var(--ui-muted,#6b7280)]">
              <p className="font-bold text-[var(--ui-fg,#111111)] mb-1">AI Prompt Instruction:</p>
              <p>Create a production-grade React UI component featuring clean typography, dynamic CSS custom property mapping, and strict responsive flex layouts.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const AnimatedAccordionFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How are color tokens applied across components?',
      a: 'Components use standard CSS variables (e.g., --ui-primary, --ui-accent, --ui-bg). You can redefine these tokens at root or container level without touching component source code.'
    },
    {
      q: 'Can I copy both React and HTML implementations?',
      a: 'Yes, every design provides production-tested React/TypeScript code and pure HTML5+CSS3 markup, guaranteed to be consistent with the live preview.'
    },
    {
      q: 'What is included in the authentic AI prompts?',
      a: 'The prompts contain exact structural constraints, design tokens, responsive breakpoints, and interaction rules so LLM models can reproduce the design precisely.'
    }
  ];

  return (
    <div className="w-full bg-[var(--ui-bg,#f7f7f5)] py-8 px-6 flex justify-center">
      <div className="max-w-2xl w-full space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] rounded-xl overflow-hidden transition-all shadow-2xs"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full px-5 py-4 text-left flex items-center justify-between text-xs font-bold text-[var(--ui-fg,#111111)] hover:bg-black/5 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={15}
                  className={`text-[var(--ui-muted,#6b7280)] transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-4 text-xs text-[var(--ui-muted,#6b7280)] leading-relaxed border-t border-[var(--ui-border,#e5e7eb)] pt-3 animate-in fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const ToastNotificationSystem: React.FC = () => {
  const [visible, setVisible] = useState(true);

  return (
    <div className="w-full bg-[var(--ui-bg,#f7f7f5)] py-8 px-6 flex flex-col items-center gap-3">
      {visible ? (
        <div className="max-w-md w-full bg-[var(--ui-card,#ffffff)] border border-[var(--ui-border,#e5e7eb)] rounded-xl p-4 shadow-lg flex items-start justify-between gap-3 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-start gap-3">
            <div className="size-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--ui-fg,#111111)]">Component Copied to Clipboard</p>
              <p className="text-[11px] text-[var(--ui-muted,#6b7280)] mt-0.5">
                Ready to paste into your Next.js / Vite codebase.
              </p>
            </div>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="text-[var(--ui-muted,#6b7280)] hover:text-[var(--ui-fg,#111111)]"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setVisible(true)}
          className="px-4 py-2 rounded-lg bg-[var(--ui-primary,#111111)] text-white text-xs font-semibold"
        >
          Trigger Notification
        </button>
      )}
    </div>
  );
};

/* =========================================================================
   8. MARKETING & FOOTERS
   ========================================================================= */

export const ConversionCTABanner: React.FC = () => {
  return (
    <div className="w-full bg-[var(--ui-bg,#f7f7f5)] py-12 px-6">
      <div className="max-w-5xl mx-auto bg-[var(--ui-primary,#111111)] text-white rounded-3xl p-10 md:p-14 text-center space-y-6 relative overflow-hidden shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold tracking-wider uppercase text-gray-300">
          ✦ Build Beyond The Obvious
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight max-w-2xl mx-auto leading-tight">
          Ready to elevate your product UI?
        </h2>
        <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
          Unlock instant access to production-tested UI designs, complete code, and authentic AI prompts.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-4">
          <button className="px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-gray-100 transition-colors shadow-lg">
            Explore All Designs
          </button>
          <button className="px-6 py-3 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-colors">
            View Subscription Plans
          </button>
        </div>
      </div>
    </div>
  );
};

export const ModernSaaSFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[var(--ui-card,#ffffff)] border-t border-[var(--ui-border,#e5e7eb)] py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded bg-[var(--ui-primary,#111111)] flex items-center justify-center text-white text-xs font-bold">
              O
            </div>
            <span className="font-bold text-sm text-[var(--ui-fg,#111111)]">Orillusive</span>
          </div>
          <p className="text-xs text-[var(--ui-muted,#6b7280)] max-w-sm leading-relaxed">
            The premium UI discovery & implementation library for web designers and developers. Build beyond the obvious.
          </p>
          <p className="text-[11px] text-gray-400">© 2026 Orillusive Studio. All rights reserved.</p>
        </div>

        <div>
          <p className="font-bold text-xs text-[var(--ui-fg,#111111)] uppercase tracking-wider mb-3">Library</p>
          <ul className="space-y-2 text-xs text-[var(--ui-muted,#6b7280)]">
            <li><a href="#navbars" className="hover:text-[var(--ui-fg,#111111)]">Navbars</a></li>
            <li><a href="#heroes" className="hover:text-[var(--ui-fg,#111111)]">Hero Sections</a></li>
            <li><a href="#dropdowns" className="hover:text-[var(--ui-fg,#111111)]">Dropdowns</a></li>
            <li><a href="#components" className="hover:text-[var(--ui-fg,#111111)]">UI Components</a></li>
            <li><a href="#pricing" className="hover:text-[var(--ui-fg,#111111)]">Pricing Cards</a></li>
          </ul>
        </div>

        <div>
          <p className="font-bold text-xs text-[var(--ui-fg,#111111)] uppercase tracking-wider mb-3">Platform</p>
          <ul className="space-y-2 text-xs text-[var(--ui-muted,#6b7280)]">
            <li><a href="#prompts" className="hover:text-[var(--ui-fg,#111111)]">AI Prompt Engine</a></li>
            <li><a href="#tokens" className="hover:text-[var(--ui-fg,#111111)]">Token Customizer</a></li>
            <li><a href="#pricing" className="hover:text-[var(--ui-fg,#111111)]">Subscription Plans</a></li>
          </ul>
        </div>

        <div>
          <p className="font-bold text-xs text-[var(--ui-fg,#111111)] uppercase tracking-wider mb-3">Legal</p>
          <ul className="space-y-2 text-xs text-[var(--ui-muted,#6b7280)]">
            <li><a href="#privacy" className="hover:text-[var(--ui-fg,#111111)]">Privacy Policy</a></li>
            <li><a href="#terms" className="hover:text-[var(--ui-fg,#111111)]">Terms of Service</a></li>
            <li><a href="#license" className="hover:text-[var(--ui-fg,#111111)]">Commercial License</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

/* =========================================================================
   REGISTRY MAPPING
   ========================================================================= */

export const COMPONENT_REGISTRY: Record<string, React.FC> = {
  // Navbars
  MinimalNavbar,
  SaaSNavbar,
  LuxuryGlassNavbar,
  EnterpriseNav,
  // Heroes
  SaaSSplitHero,
  ProductMetricHero,
  MinimalDarkHero,
  // Dropdowns
  MinimalDropdown,
  MegaMenuDropdown,
  UserProfileDropdown,
  FilterSortDropdown,
  ContextMenuDropdown,
  // UI Components
  ButtonGroupControls,
  InputValidationGroup,
  StatusAlertsStack,
  ModalDialogOverlay,
  BreadcrumbNavigation,
  // Cards & Pricing
  TieredPricingCards,
  InteractiveFeatureGrid,
  TestimonialSliderCards,
  // Forms & Auth
  SplitScreenAuthCard,
  MultiStepOnboardingForm,
  // Navigation & Overlays
  CommandPaletteSearch,
  CollapsibleSidebar,
  InteractiveTabbedInterface,
  AnimatedAccordionFAQ,
  ToastNotificationSystem,
  // Marketing & Footers
  ConversionCTABanner,
  ModernSaaSFooter
};

export const RenderComponentByKey: React.FC<{ componentKey: string }> = ({ componentKey }) => {
  const Component = COMPONENT_REGISTRY[componentKey];
  if (!Component) {
    return (
      <div className="p-8 text-center bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-500">
        Interactive preview not registered for <span className="font-mono">{componentKey}</span>.
      </div>
    );
  }
  return <Component />;
};
