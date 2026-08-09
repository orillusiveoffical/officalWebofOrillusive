import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { COMPARISON_DATA } from '../../data/contentData';

export const WhyOrillusiveSection: React.FC = () => {
  return (
    <section 
      aria-label="Why Choose Orillusive Comparison"
      className="py-20 sm:py-28 md:py-36 px-4 sm:px-8 lg:px-16 border-t border-black/5 bg-white"
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
            Standard of Excellence
          </p>
          <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111111]">
            Why Orillusive
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-x-auto rounded-3xl border border-black/10 shadow-xs bg-white"
        >
          <div className="min-w-[620px]">
            <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-[#111111] text-[#F7F7F5] p-5 sm:p-7 text-xs font-bold uppercase tracking-wider font-mono">
              <div>Aspect</div>
              <div className="text-white/50">Traditional Vendors</div>
              <div className="text-[#4F6B85]">Orillusive Studio</div>
            </div>

            {COMPARISON_DATA.map((row, idx) => (
              <div 
                key={row.feature}
                className={`grid grid-cols-[1.2fr_1fr_1fr] p-5 sm:p-7 text-xs sm:text-sm border-b border-black/5 items-center ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-[#F7F7F5]'
                }`}
              >
                <div className="font-bold text-[#111111]">{row.feature}</div>
                <div className="text-[#777777] leading-relaxed pr-2">{row.traditional}</div>
                <div className="font-semibold text-[#111111] flex items-center gap-2.5 sm:gap-3">
                  <CheckCircle2 className="size-4.5 sm:size-5 text-[#4F6B85] shrink-0" aria-hidden="true" />
                  <span>{row.orillusive}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
