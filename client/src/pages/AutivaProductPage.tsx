import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, 
  Flame, 
  Bot, 
  ScanLine, 
  BarChart3, 
  Target, 
  ArrowRight, 
  Download, 
  ShieldCheck, 
  Smartphone, 
  CheckCircle2, 
  Sparkles,
  Zap,
  Lock
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { PAGE_SEO, buildBreadcrumbSchema } from '../data/seoData';
import { AUTIVA_PLAY_STORE_URL } from '../data/contentData';

export const AutivaProductPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'expenses' | 'habits' | 'ai'>('dashboard');

  const scrollToFeatures = () => {
    const el = document.getElementById('features');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-28 sm:pt-36 pb-20 sm:pb-28 bg-[#F7F7F5] text-[#111111] font-sans overflow-x-hidden min-h-screen">
      <SEOHead page={PAGE_SEO.autiva} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/projects' },
          { name: 'Autiva', path: '/products/autiva' },
        ])}
        id="breadcrumb-autiva"
      />

      <div className="mx-auto max-w-[1360px] px-4 sm:px-8 lg:px-16 space-y-24 sm:space-y-36">

        {/* 1. HERO SECTION */}
        <section className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 sm:space-y-8"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 rounded-full bg-[#111111] text-[#F7F7F5] text-[10px] font-bold uppercase tracking-wider">
                Orillusive Product
              </span>
              <span className="px-3.5 py-1 rounded-full bg-[#4F6B85]/10 text-[#4F6B85] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#4F6B85] animate-pulse" />
                Live / Available Now
              </span>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-4">
                <div className="size-14 sm:size-16 rounded-2xl overflow-hidden border border-black/10 shadow-md shrink-0 bg-[#17191C] flex items-center justify-center">
                  <img 
                    src="/assets/autiva-icon.png" 
                    alt="Autiva Icon" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image path fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div>
                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-sans tracking-tight text-[#111111]">
                    Autiva<span className="text-[#C9A84C]">.</span>
                  </h1>
                  <p className="text-xs sm:text-sm font-mono text-[#888888]">v1.0 • Mobile Application</p>
                </div>
              </div>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#111111] leading-tight">
                Take control of your money. <br />
                <span className="text-[#4F6B85]">Build better habits.</span>
              </h2>
            </div>

            <p className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-xl">
              Autiva is an AI-powered expense and habit tracking mobile application engineered to bring clarity to your personal finances and daily routines in one unified experience.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-4 sm:items-center">
              <a
                href={AUTIVA_PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sheen group inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-[#111111] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[#F7F7F5] transition-all duration-300 hover:bg-[#2C1E16] hover:scale-[1.03] active:scale-[0.97] shadow-lg hover:shadow-xl focus-visible:ring-2 focus-visible:ring-[#4F6B85] focus-visible:outline-none"
              >
                <Download className="size-4 text-[#C9A84C]" />
                <span>Get Autiva</span>
              </a>

              <button
                onClick={scrollToFeatures}
                className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full bg-white border border-black/10 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[#111111] transition-all duration-300 hover:border-[#4F6B85]/40 hover:bg-[#F0F0EC] hover:scale-[1.02] active:scale-[0.98] shadow-xs hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#4F6B85] focus-visible:outline-none"
              >
                <span>Explore Features</span>
                <ArrowRight className="size-4 text-[#4F6B85]" />
              </button>
            </div>
          </motion.div>

          {/* Hero Visual Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-sm rounded-[40px] border-4 border-[#111111] bg-[#111111] p-3 shadow-2xl">
              {/* Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#111111] rounded-full z-20" />

              <div className="rounded-[32px] bg-[#F7F7F5] p-5 pt-8 text-[#111111] space-y-5 overflow-hidden min-h-[500px] flex flex-col justify-between">
                
                {/* App Top Bar */}
                <div className="flex items-center justify-between border-b border-black/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="size-7 rounded-lg bg-[#111111] text-[#C9A84C] flex items-center justify-center text-xs font-bold font-mono">A</div>
                    <span className="text-xs font-bold font-sans">Autiva Mobile</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#4F6B85]/10 text-[#4F6B85] font-semibold">Gemini AI</span>
                </div>

                {/* Main Card View */}
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white border border-black/10 shadow-xs space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-[#777777] uppercase tracking-wider">
                      <span>Monthly Net Balance</span>
                      <span className="text-[#4F6B85]">+14.2%</span>
                    </div>
                    <p className="text-2xl font-bold font-sans text-[#111111]">$4,850.00</p>
                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                      <div className="p-2 rounded-xl bg-[#F7F7F5] border border-black/5">
                        <span className="text-[9px] text-[#777777] block uppercase font-bold">Income</span>
                        <span className="font-semibold text-emerald-600">+$6,200.00</span>
                      </div>
                      <div className="p-2 rounded-xl bg-[#F7F7F5] border border-black/5">
                        <span className="text-[9px] text-[#777777] block uppercase font-bold">Spent</span>
                        <span className="font-semibold text-rose-600">-$1,350.00</span>
                      </div>
                    </div>
                  </div>

                  {/* Habit Streak Card */}
                  <div className="p-4 rounded-2xl bg-[#111111] text-white space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Flame className="size-4 text-[#C9A84C]" />
                        <span className="text-xs font-bold">Active Habit Streak</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#C9A84C] font-bold">14 Days</span>
                    </div>
                    <p className="text-[11px] text-white/70">Daily Financial Review & Budget Target</p>
                  </div>
                </div>

                {/* Bottom App Nav Bar */}
                <div className="grid grid-cols-4 gap-1 p-2 rounded-2xl bg-white border border-black/10 text-[10px] text-center text-[#777777]">
                  <div className="p-1.5 rounded-xl bg-[#111111] text-[#F7F7F5] font-bold flex flex-col items-center gap-0.5">
                    <Wallet className="size-3.5" />
                    <span>Home</span>
                  </div>
                  <div className="p-1.5 rounded-xl flex flex-col items-center gap-0.5">
                    <Flame className="size-3.5" />
                    <span>Habits</span>
                  </div>
                  <div className="p-1.5 rounded-xl flex flex-col items-center gap-0.5">
                    <Bot className="size-3.5" />
                    <span>AI Coach</span>
                  </div>
                  <div className="p-1.5 rounded-xl flex flex-col items-center gap-0.5">
                    <ScanLine className="size-3.5" />
                    <span>Scan</span>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </section>

        {/* 2. FEATURES SECTION */}
        <section id="features" className="space-y-16 pt-8 border-t border-black/10">
          <div className="space-y-4 text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4F6B85]">
              Core Capabilities
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold font-sans text-[#111111]">
              Engineered for Simplicity & Insights
            </h2>
            <p className="text-xs sm:text-base text-[#555555] leading-relaxed">
              Autiva combines real-time financial tracking with behavioral habit metrics and personalized AI coaching in one streamlined mobile interface.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            
            <div className="p-8 rounded-3xl bg-white border border-black/10 shadow-xs space-y-4 hover:shadow-md transition-all">
              <div className="size-12 rounded-2xl bg-[#4F6B85]/10 border border-[#4F6B85]/20 flex items-center justify-center text-[#4F6B85]">
                <Wallet className="size-6" />
              </div>
              <h3 className="text-xl font-bold font-sans text-[#111111]">Expense & Income Tracking</h3>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                Log transactions instantly with intuitive category tagging, multi-currency support, and real-time net balance calculations.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-black/10 shadow-xs space-y-4 hover:shadow-md transition-all">
              <div className="size-12 rounded-2xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C]">
                <Flame className="size-6" />
              </div>
              <h3 className="text-xl font-bold font-sans text-[#111111]">Habit & Streak Analytics</h3>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                Set weekly habit targets, build daily momentum streaks, and visualize completion patterns to foster long-term behavioral change.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-black/10 shadow-xs space-y-4 hover:shadow-md transition-all">
              <div className="size-12 rounded-2xl bg-[#111111] text-[#F7F7F5] flex items-center justify-center">
                <Bot className="size-6 text-[#C9A84C]" />
              </div>
              <h3 className="text-xl font-bold font-sans text-[#111111]">AI Financial Coach (Gemini)</h3>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                Ask questions about your budget or habits. Autiva AI analyzes your spending context to deliver actionable recommendations.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-black/10 shadow-xs space-y-4 hover:shadow-md transition-all">
              <div className="size-12 rounded-2xl bg-[#4F6B85]/10 border border-[#4F6B85]/20 flex items-center justify-center text-[#4F6B85]">
                <ScanLine className="size-6" />
              </div>
              <h3 className="text-xl font-bold font-sans text-[#111111]">Receipt Camera OCR</h3>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                Snap photos of paper receipts to automatically extract merchant names, total amounts, and dates directly into your log.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-black/10 shadow-xs space-y-4 hover:shadow-md transition-all">
              <div className="size-12 rounded-2xl bg-[#4F6B85]/10 border border-[#4F6B85]/20 flex items-center justify-center text-[#4F6B85]">
                <BarChart3 className="size-6" />
              </div>
              <h3 className="text-xl font-bold font-sans text-[#111111]">Monthly Financial Overview</h3>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                Clear breakdown graphs showing spending distribution across categories, monthly trends, and budget threshold warnings.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-black/10 shadow-xs space-y-4 hover:shadow-md transition-all">
              <div className="size-12 rounded-2xl bg-[#4F6B85]/10 border border-[#4F6B85]/20 flex items-center justify-center text-[#4F6B85]">
                <Target className="size-6" />
              </div>
              <h3 className="text-xl font-bold font-sans text-[#111111]">Custom Savings Goals</h3>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                Define financial milestones, track deposit history toward big purchases, and monitor your goal completion percentage over time.
              </p>
            </div>

          </div>
        </section>

        {/* 3. INTERACTIVE APP SHOWCASE / SCREENSHOTS */}
        <section className="space-y-12 p-8 sm:p-14 rounded-3xl bg-[#111111] text-[#F7F7F5] border border-white/10 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A84C]">
                Mobile Experience
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold font-sans text-white">
                Inside the Autiva Application
              </h2>
            </div>
            
            {/* Interactive Module Switcher */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-full bg-white/10 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-full transition-all ${activeTab === 'dashboard' ? 'bg-[#F7F7F5] text-[#111111] shadow-sm' : 'text-white/70 hover:text-white'}`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('expenses')}
                className={`px-4 py-2 rounded-full transition-all ${activeTab === 'expenses' ? 'bg-[#F7F7F5] text-[#111111] shadow-sm' : 'text-white/70 hover:text-white'}`}
              >
                Receipt OCR & Logs
              </button>
              <button
                onClick={() => setActiveTab('habits')}
                className={`px-4 py-2 rounded-full transition-all ${activeTab === 'habits' ? 'bg-[#F7F7F5] text-[#111111] shadow-sm' : 'text-white/70 hover:text-white'}`}
              >
                Habit Analytics
              </button>
              <button
                onClick={() => setActiveTab('ai')}
                className={`px-4 py-2 rounded-full transition-all ${activeTab === 'ai' ? 'bg-[#F7F7F5] text-[#111111] shadow-sm' : 'text-white/70 hover:text-white'}`}
              >
                AI Financial Coach
              </button>
            </div>
          </div>

          {/* Module Content View */}
          <div className="grid lg:grid-cols-2 gap-10 items-center pt-4">
            <div className="space-y-6">
              {activeTab === 'dashboard' && (
                <div className="space-y-4">
                  <span className="text-xs font-mono text-[#C9A84C]">01 // UNIFIED FINANCIAL HUD</span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">Complete Money Overview at a Glance</h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    View total cash flow, monthly net savings, budget thresholds, and active habit completion status from a single fluid dashboard designed for rapid daily check-ins.
                  </p>
                </div>
              )}

              {activeTab === 'expenses' && (
                <div className="space-y-4">
                  <span className="text-xs font-mono text-[#C9A84C]">02 // CAMERA RECEIPT SCANNER</span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">Instant Receipt Scanning & Categorization</h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    Capture paper receipts with your phone camera. Autiva's integrated Gemini OCR extracts total amount, vendor name, and date, auto-assigning appropriate expense categories.
                  </p>
                </div>
              )}

              {activeTab === 'habits' && (
                <div className="space-y-4">
                  <span className="text-xs font-mono text-[#C9A84C]">03 // BEHAVIORAL MOMENTUM</span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">Build Positive Daily Routines</h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    Track habits alongside your budget. Whether reading, exercising, or saving daily micro-amounts, Autiva calculates weekly target percentages and streak momentum.
                  </p>
                </div>
              )}

              {activeTab === 'ai' && (
                <div className="space-y-4">
                  <span className="text-xs font-mono text-[#C9A84C]">04 // INTELLIGENT ADVISOR</span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">Personalized AI Financial Guidance</h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    Engage with Autiva AI to analyze where your money goes. Receive private, contextual coaching to optimize discretionary spending and achieve your savings goals faster.
                  </p>
                </div>
              )}

              <div className="pt-2 flex flex-wrap gap-4 text-xs">
                <div className="flex items-center space-x-2 text-white/80">
                  <CheckCircle2 className="size-4 text-[#C9A84C]" />
                  <span>Flutter Cross-Platform Engine</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <ShieldCheck className="size-4 text-[#C9A84C]" />
                  <span>Encrypted Supabase Security</span>
                </div>
              </div>
            </div>

            {/* Simulated Device Content */}
            <div className="p-6 rounded-2xl bg-[#1A1A1A] border border-white/10 shadow-xl space-y-4 font-sans text-xs">
              {activeTab === 'dashboard' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="font-bold text-white">August Financial HUD</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold">On Track</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 space-y-1">
                    <span className="text-[10px] text-white/50 uppercase font-bold">Net Savings</span>
                    <p className="text-xl font-bold text-white">$1,840.00</p>
                  </div>
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] text-white/50 uppercase font-bold">Category Distribution</span>
                    <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden flex">
                      <div className="bg-[#4F6B85] w-[45%]" />
                      <div className="bg-[#C9A84C] w-[30%]" />
                      <div className="bg-emerald-500 w-[25%]" />
                    </div>
                    <div className="flex justify-between text-[10px] text-white/70 font-mono pt-1">
                      <span>Rent (45%)</span>
                      <span>Food (30%)</span>
                      <span>Invest (25%)</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'expenses' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="font-bold text-white">Receipt OCR Scan Completed</span>
                    <span className="text-[10px] font-mono text-[#C9A84C]">Gemini Flash Vision</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 space-y-2">
                    <div className="flex justify-between font-semibold text-white">
                      <span>Organic Grocery Market</span>
                      <span className="text-rose-400">-$84.50</span>
                    </div>
                    <p className="text-[10px] text-white/60">Category: Groceries & Supermarket • Today, 2:15 PM</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] flex items-center justify-between">
                    <span>Auto-logged to Monthly Budget</span>
                    <CheckCircle2 className="size-4" />
                  </div>
                </div>
              )}

              {activeTab === 'habits' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="font-bold text-white">Daily Habit Trackers</span>
                    <span className="text-[10px] font-mono text-[#C9A84C]">Streak Active</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-white/5 flex justify-between items-center">
                      <div>
                        <span className="font-bold text-white block">Log Expenses Daily</span>
                        <span className="text-[10px] text-white/50">Target: 7/7 days per week</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold font-mono">7 Day Streak 🔥</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 flex justify-between items-center">
                      <div>
                        <span className="font-bold text-white block">Zero Unplanned Purchases</span>
                        <span className="text-[10px] text-white/50">Target: 5/7 days per week</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#C9A84C]/20 text-[#C9A84C] text-[10px] font-bold font-mono">5 Day Streak</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'ai' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="font-bold text-white">Autiva AI Financial Assistant</span>
                    <span className="text-[10px] font-mono text-emerald-400">Context Loaded</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 text-white/90 space-y-1">
                    <span className="text-[9px] text-[#C9A84C] uppercase font-bold block">User Prompt</span>
                    <p className="italic text-[11px]">"How can I cut my dining out expenses by 20% this month?"</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#4F6B85]/20 border border-[#4F6B85]/40 text-white/90 space-y-1">
                    <span className="text-[9px] text-[#4F6B85] uppercase font-bold block">Autiva AI Guidance</span>
                    <p className="text-[11px] leading-relaxed">
                      "Based on your last 30 days, weekend restaurant orders account for 68% of dining expenses. Replacing just two weekend takeout orders with meal prep will save approx. $140/month."
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 4. ABOUT AUTIVA SECTION */}
        <section className="space-y-8 max-w-4xl mx-auto text-center pt-8 border-t border-black/10">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4F6B85]">
            Studio Product Philosophy
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold font-sans text-[#111111] leading-tight">
            About Autiva
          </h2>
          <p className="text-base sm:text-xl text-[#555555] leading-relaxed">
            Autiva is an in-house digital product engineered and published by <strong>Orillusive Studio</strong>. We built Autiva to eliminate the friction of managing personal finances and daily habits across fragmented applications. By combining intelligent receipt OCR, habit streak formation, and AI coaching into a clean mobile experience, Autiva helps users make conscious financial choices every day.
          </p>
        </section>

        {/* 5. GOOGLE PLAY STORE CTA SECTION */}
        <section className="antigravity-dark-bg text-[#F7F7F5] rounded-3xl p-10 sm:p-16 text-center space-y-8 relative overflow-hidden shadow-2xl">
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="px-4 py-1.5 rounded-full bg-white/10 text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest inline-block">
              Ready to Upgrade Your Financial Habits?
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-sans text-white">
              Get Started with Autiva Today.
            </h2>
            <p className="text-xs sm:text-base text-white/70 leading-relaxed">
              Available for Android devices on the Google Play Store. Download now and take control of your financial growth.
            </p>
          </div>

          <div className="pt-2 flex justify-center">
            <a
              href={AUTIVA_PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sheen group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-10 py-4 text-xs font-bold uppercase tracking-wider text-[#111111] transition-all duration-300 hover:bg-[#F7F7F5] hover:scale-[1.03] active:scale-[0.97] shadow-xl hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-[#4F6B85] focus-visible:outline-none"
            >
              <Download className="size-4 text-[#4F6B85]" />
              <span>Get it on Google Play</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};
