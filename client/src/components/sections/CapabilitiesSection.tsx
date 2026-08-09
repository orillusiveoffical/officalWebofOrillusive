import React from 'react';
import { motion } from 'framer-motion';
import { Building, KeyRound, Tablet, Cloud, Sliders, Laptop } from 'lucide-react';
import { CAPABILITIES_DATA } from '../../data/contentData';

const iconMap: Record<string, React.ElementType> = {
  Building, KeyRound, Tablet, Cloud, Sliders, Laptop
};

export const CapabilitiesSection: React.FC = () => {
  return (
    <section 
      aria-label="What We're Building Capabilities"
      className="py-20 sm:py-28 md:py-36 px-4 sm:px-8 lg:px-16 border-t border-black/5 bg-white"
    >
      <div className="mx-auto max-w-[1400px]">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-14 sm:mb-20 space-y-3 sm:space-y-4"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4F6B85]">
            Capabilities
          </p>
          <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111111]">
            What We're Building
          </h2>
          <p className="text-xs sm:text-base text-[#555555]">
            Dedicated engineering expertise across modern digital architectures.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {CAPABILITIES_DATA.map((cap, idx) => {
            const IconComp = iconMap[cap.iconName] || Building;
            return (
              <motion.article 
                key={cap.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#F7F7F5] border border-black/5 transition-all hover:bg-white hover:border-black/15 hover:shadow-sm group"
              >
                <div className="size-11 sm:size-13 rounded-2xl bg-white border border-black/10 flex items-center justify-center text-[#4F6B85] shadow-xs mb-6 sm:mb-8">
                  <IconComp className="size-5.5 sm:size-6.5" aria-hidden="true" />
                </div>
                <h3 className="font-sans text-lg sm:text-xl font-bold text-[#111111]">{cap.title}</h3>
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-[#555555]">{cap.description}</p>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
