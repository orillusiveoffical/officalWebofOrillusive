import React from 'react';
import { motion } from 'framer-motion';
import { TECH_STACK } from '../../data/contentData';

export const TechStackSection: React.FC = () => {
  return (
    <section 
      aria-label="Production Tech Stack"
      className="py-20 sm:py-28 md:py-36 px-4 sm:px-8 lg:px-16 border-t border-black/5 bg-[#F7F7F5]"
    >
      <div className="mx-auto max-w-[1400px]">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-center justify-between mb-12 sm:mb-16 gap-6 sm:gap-8"
        >
          <div className="space-y-2 sm:space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4F6B85]">
              Production Tech Stack
            </p>
            <h2 className="font-sans text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111]">
              Technologies We Master
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#666666]">Only software tools actively deployed in our clients&apos; production builds.</p>
        </motion.div>

        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {TECH_STACK.map((techCat, idx) => (
            <motion.div 
              key={techCat.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-black/10 shadow-xs"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-[#4F6B85] mb-5 sm:mb-6 font-mono">{techCat.category}</p>
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {techCat.technologies.map((t) => (
                  <span key={t} className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#F7F7F5] text-xs font-semibold text-[#111111] border border-black/5">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
