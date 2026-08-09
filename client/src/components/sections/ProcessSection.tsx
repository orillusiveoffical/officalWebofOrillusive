import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '../../data/contentData';

export const ProcessSection: React.FC = () => {
  const [activeProcessStep, setActiveProcessStep] = useState<number>(0);

  return (
    <section 
      id="process" 
      aria-label="Development Process Methodology"
      className="py-20 sm:py-28 md:py-36 px-4 sm:px-8 lg:px-16 border-t border-black/5 bg-white overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px]">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-xl mx-auto mb-14 sm:mb-20 space-y-3 sm:space-y-4"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4F6B85]">
            Methodology
          </p>
          <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111111]">
            Development Process
          </h2>
        </motion.div>

        {/* Process Timeline Grid - Non-Colliding Responsive Layout */}
        <div 
          className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 relative" 
          role="tablist" 
          aria-label="Development Process Steps"
        >
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = activeProcessStep === idx;
            return (
              <motion.button
                key={step.step}
                role="tab"
                aria-selected={isActive}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActiveProcessStep(idx)}
                className={`text-left p-5 sm:p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between min-h-[190px] focus-visible:ring-2 focus-visible:ring-[#4F6B85] focus-visible:outline-none ${
                  isActive 
                    ? 'bg-[#111111] text-[#F7F7F5] border-[#111111] shadow-md scale-[1.02]' 
                    : 'bg-[#F7F7F5] text-[#111111] border-black/5 hover:border-black/20 hover:bg-white'
                }`}
              >
                <div className="space-y-3 sm:space-y-4">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#4F6B85]">
                    {step.step}
                  </span>
                  <h3 className="font-sans text-sm sm:text-base font-bold leading-snug break-words">{step.title}</h3>
                </div>
                <p className={`text-xs leading-relaxed mt-4 break-words ${isActive ? 'text-white/75' : 'text-[#555555]'}`}>
                  {step.description}
                </p>
              </motion.button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
