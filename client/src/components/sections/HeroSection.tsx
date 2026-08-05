import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Building2, Activity, TrendingUp } from 'lucide-react';

interface HeroSectionProps {
  onOpenInquiry: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenInquiry }) => {
  const [heroActiveTab, setHeroActiveTab] = useState<'hotel' | 'mobile'>('hotel');

  return (
    <section 
      id="top" 
      aria-label="Hero Section"
      className="relative min-h-[94vh] flex items-center pt-44 pb-36 px-6 sm:px-12 lg:px-20 overflow-hidden bg-[#F7F7F5]"
    >
      {/* Soft Antigravity Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[480px] bg-[#4F6B85]/06 rounded-full blur-[150px]" />
        <div className="absolute inset-0 subtle-grid opacity-30" />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] z-10 grid gap-16 lg:grid-cols-[1.1fr_0.9fr] items-center">
        
        {/* Left Hero Content */}
        <div className="max-w-2xl space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-4.5 py-2 rounded-full bg-white border border-black/10 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#4F6B85] shadow-xs"
          >
            <span className="size-2 rounded-full bg-[#4F6B85]" aria-hidden="true" />
            <span>Premium Software Engineering Studio</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.02] text-[#111111]"
          >
            Engineering Software <br />
            <span className="text-[#4F6B85]">That Powers Real Businesses.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl leading-relaxed text-[#555555] max-w-xl font-normal"
          >
            We design and develop scalable software products—from enterprise platforms to modern mobile applications—crafted for businesses that want to grow.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="pt-3 flex flex-col sm:flex-row gap-5"
          >
            <button
              onClick={onOpenInquiry}
              aria-label="Start your project with Orillusive"
              className="group inline-flex min-h-14 items-center justify-center gap-3.5 rounded-full bg-[#111111] px-9 text-xs font-bold uppercase tracking-wider text-[#F7F7F5] transition-all hover:bg-[#2C1E16] shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#4F6B85] focus-visible:outline-none"
            >
              <span>Start Your Project</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>

            <a
              href="#products"
              aria-label="View featured products under development"
              className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-white border border-black/10 px-9 text-xs font-bold uppercase tracking-wider text-[#111111] transition-all hover:border-black/30 hover:bg-[#F0F0EC] shadow-xs focus-visible:ring-2 focus-visible:ring-[#4F6B85] focus-visible:outline-none"
            >
              <span>View Products</span>
              <ArrowUpRight className="size-4 text-[#4F6B85]" aria-hidden="true" />
            </a>
          </motion.div>
        </div>

        {/* Right Floating Interactive Software Showcase */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          <div className="relative rounded-3xl bg-white border border-black/10 p-8 sm:p-10 shadow-xl space-y-7">
            
            {/* Header Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-black/5">
              <div className="flex items-center space-x-2">
                <div className="size-3 rounded-full bg-[#111111]/20" aria-hidden="true" />
                <div className="size-3 rounded-full bg-[#111111]/20" aria-hidden="true" />
                <div className="size-3 rounded-full bg-[#111111]/20" aria-hidden="true" />
                <span className="ml-3 text-[10px] font-mono text-[#888888] tracking-wider hidden sm:inline">orillusive-suite // v2.4</span>
              </div>

              {/* Interactive Mockup Switcher */}
              <div className="flex rounded-full bg-[#F7F7F5] p-1 border border-black/5 text-[10px] font-bold" role="tablist" aria-label="Software Preview Tabs">
                <button
                  role="tab"
                  aria-selected={heroActiveTab === 'hotel'}
                  onClick={() => setHeroActiveTab('hotel')}
                  className={`px-4 py-1.5 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-[#4F6B85] focus-visible:outline-none ${
                    heroActiveTab === 'hotel' ? 'bg-[#111111] text-[#F7F7F5]' : 'text-[#777777] hover:text-[#111111]'
                  }`}
                >
                  Hospitality Engine
                </button>
                <button
                  role="tab"
                  aria-selected={heroActiveTab === 'mobile'}
                  onClick={() => setHeroActiveTab('mobile')}
                  className={`px-4 py-1.5 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-[#4F6B85] focus-visible:outline-none ${
                    heroActiveTab === 'mobile' ? 'bg-[#111111] text-[#F7F7F5]' : 'text-[#777777] hover:text-[#111111]'
                  }`}
                >
                  Mobile Suite
                </button>
              </div>
            </div>

            {/* Dynamic Interface Body */}
            <AnimatePresence mode="wait">
              {heroActiveTab === 'hotel' ? (
                <motion.div
                  key="hotel"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4.5 rounded-2xl bg-[#F7F7F5] border border-black/5">
                      <p className="text-[10px] uppercase font-bold text-[#777777]">Reservations</p>
                      <p className="text-2xl font-bold font-sans text-[#111111] mt-1.5">1,482</p>
                      <span className="text-[10px] text-[#4F6B85] font-semibold flex items-center gap-1 mt-1">
                        <TrendingUp className="size-3" aria-hidden="true" /> +18.4%
                      </span>
                    </div>

                    <div className="p-4.5 rounded-2xl bg-[#F7F7F5] border border-black/5">
                      <p className="text-[10px] uppercase font-bold text-[#777777]">Revenue ADR</p>
                      <p className="text-2xl font-bold font-sans text-[#111111] mt-1.5">$240.50</p>
                      <span className="text-[10px] text-[#4F6B85] font-semibold block mt-1">94% Occupancy</span>
                    </div>

                    <div className="p-4.5 rounded-2xl bg-[#F7F7F5] border border-black/5">
                      <p className="text-[10px] uppercase font-bold text-[#777777]">System Health</p>
                      <p className="text-2xl font-bold font-sans text-[#111111] mt-1.5">99.99%</p>
                      <span className="text-[10px] text-[#4F6B85] font-semibold block mt-1">Zero latency</span>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#111111] text-[#F7F7F5] space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2.5">
                        <span className="size-2 rounded-full bg-[#4F6B85]" aria-hidden="true" />
                        <span className="font-semibold text-white/90">Hospitality Booking Pipeline</span>
                      </div>
                      <span className="text-[10px] font-mono text-white/50">OTA & Direct Engine</span>
                    </div>

                    <div className="h-18 flex items-end justify-between gap-2.5 pt-3">
                      {[45, 68, 52, 88, 96, 78, 92, 100].map((h, i) => (
                        <div key={i} className="w-full bg-[#4F6B85]/40 rounded-t-sm relative group overflow-hidden" style={{ height: `${h}%` }}>
                          <div className="absolute inset-0 bg-[#4F6B85] opacity-80 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="mobile"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-[#111111] text-[#F7F7F5] space-y-3">
                      <p className="text-[10px] uppercase font-bold text-white/60">Monthly Budget</p>
                      <p className="text-2xl font-bold font-sans text-white">$4,250.00</p>
                      <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-[#4F6B85] w-[68%]" />
                      </div>
                      <p className="text-[10px] text-white/60 font-mono">68% allocated • $1,360 left</p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#F7F7F5] border border-black/5 space-y-3">
                      <p className="text-[10px] uppercase font-bold text-[#777777]">Habit Momentum</p>
                      <p className="text-2xl font-bold font-sans text-[#111111]">24 Days</p>
                      <div className="flex space-x-1.5 pt-1">
                        {[1, 1, 1, 1, 1, 1, 0].map((v, i) => (
                          <span key={i} className={`size-3.5 rounded-sm ${v ? 'bg-[#4F6B85]' : 'bg-black/10'}`} />
                        ))}
                      </div>
                      <p className="text-[10px] text-[#4F6B85] font-bold">Consistent progress</p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#F7F7F5] border border-black/5 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3.5">
                      <div className="size-9 rounded-xl bg-[#4F6B85]/10 text-[#4F6B85] flex items-center justify-center font-bold">
                        <Activity className="size-4.5" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-bold text-[#111111]">Progress Analytics</p>
                        <p className="text-[10px] text-[#777777]">Automated monthly reporting</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#F7F7F5] border border-black/10 text-[#111111] text-[10px] font-bold">Active</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Sub-Floating Badge */}
          <div className="absolute -bottom-7 -left-7 hidden sm:flex items-center gap-4 p-5 rounded-2xl bg-white border border-black/10 shadow-lg">
            <div className="size-11 rounded-xl bg-[#4F6B85]/10 text-[#4F6B85] flex items-center justify-center">
              <Building2 className="size-5.5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#111111]">Enterprise Architecture</p>
              <p className="text-[10px] text-[#777777]">Handcrafted with precision</p>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
