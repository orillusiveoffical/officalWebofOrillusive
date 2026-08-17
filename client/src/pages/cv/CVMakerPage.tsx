import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Check, 
  FileText, 
  Sliders, 
  Download, 
  ShieldCheck, 
  ArrowRight,
  Layers,
  Zap,
  Printer
} from 'lucide-react';
import { CV_TEMPLATES } from '../../data/cvPresets';

export const CVMakerPage: React.FC = () => {
  return (
    <div className="pt-28 sm:pt-36 pb-20 px-4 sm:px-8 lg:px-16 bg-[#F7F7F5] text-[#111111] font-sans min-h-screen">
      <div className="mx-auto max-w-[1360px] space-y-20 sm:space-y-28">
        
        {/* HERO SECTION */}
        <section className="text-center space-y-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4F6B85]/10 border border-[#4F6B85]/20 text-[#4F6B85] text-xs font-bold uppercase tracking-wider"
          >
            <Sparkles className="size-3.5 text-[#C9A84C]" />
            <span>Official Orillusive SaaS Product</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-[#111111]"
          >
            Craft Job-Ready Resumes <br className="hidden sm:inline" /> In Minutes.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-2xl mx-auto"
          >
            Select professional ATS-friendly templates, enter your details, customize colors and typography, and generate print-perfect PDF CVs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Link
              to="/cv-maker/dashboard"
              className="btn-sheen inline-flex min-h-13 items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#111111] text-[#F7F7F5] font-bold text-xs uppercase tracking-wider hover:bg-[#2C1E16] hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              <span>Build My Resume Free</span>
              <ArrowRight className="size-4" />
            </Link>

            <Link
              to="/cv-maker/credits"
              className="inline-flex min-h-13 items-center justify-center gap-2 px-8 py-4 rounded-full bg-white border border-black/15 text-[#111111] font-bold text-xs uppercase tracking-wider hover:bg-[#F7F7F5] transition-all shadow-xs"
            >
              <Sparkles className="size-4 text-[#C9A84C]" />
              <span>Get Credits</span>
            </Link>
          </motion.div>
        </section>

        {/* 4-STEP USER JOURNEY */}
        <section className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4F6B85]">Simple & Transparent Journey</span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#111111]">How CV Maker Works</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Choose Template', desc: 'Pick from executive, minimal, modern, or academic templates.' },
              { num: '02', title: 'Enter Information', desc: 'Add work history, education, skills, projects, and custom sections.' },
              { num: '03', title: 'Customize & Preview', desc: 'Tune colors, typography, line spacing, and watch live real-time A4 rendering.' },
              { num: '04', title: 'Generate & Download', desc: 'Use credits to generate and download high-resolution print-ready PDFs.' }
            ].map((step) => (
              <div key={step.num} className="p-6 rounded-3xl bg-white border border-black/10 shadow-xs space-y-3 relative">
                <span className="text-3xl font-black font-mono text-[#4F6B85]/30">{step.num}</span>
                <h3 className="text-lg font-bold text-[#111111]">{step.title}</h3>
                <p className="text-xs text-[#666666] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TEMPLATE GALLERY */}
        <section className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4F6B85]">Designed for Professionals</span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#111111]">Professional Templates</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CV_TEMPLATES.map((tmpl) => (
              <div key={tmpl.id} className="p-6 rounded-3xl bg-white border border-black/10 shadow-xs space-y-4 flex flex-col justify-between hover:shadow-md transition-all">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#4F6B85]/10 text-[#4F6B85] text-[10px] font-bold uppercase">
                      {tmpl.category}
                    </span>
                    {tmpl.popular && (
                      <span className="px-2 py-0.5 rounded-full bg-[#C9A84C] text-[#111111] text-[9px] font-bold uppercase">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-[#111111]">{tmpl.name}</h3>
                  <p className="text-xs text-[#666666] mt-1">{tmpl.description}</p>
                </div>

                <Link
                  to="/cv-maker/builder"
                  className="w-full py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs font-bold text-[#111111] text-center hover:bg-[#111111] hover:text-white transition-all block mt-4"
                >
                  Use This Template
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="p-8 sm:p-14 rounded-3xl bg-[#111111] text-white text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Ready to build your professional resume?</h2>
          <p className="text-xs sm:text-sm text-white/70 max-w-xl mx-auto">
            Experience the free builder today. Upgrade with credits whenever you need to export professional CVs.
          </p>
          <Link
            to="/cv-maker/dashboard"
            className="btn-sheen inline-flex min-h-13 items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#C9A84C] text-[#111111] font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-lg"
          >
            <span>Launch CV Builder</span>
            <ArrowRight className="size-4" />
          </Link>
        </section>

      </div>
    </div>
  );
};
