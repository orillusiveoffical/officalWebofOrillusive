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
      className="py-36 md:py-52 lg:py-60 px-8 sm:px-14 lg:px-24 border-t border-black/5 bg-white"
    >
      <div className="mx-auto max-w-[1400px]">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-24 space-y-4"
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

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {CAPABILITIES_DATA.map((cap, idx) => {
            const IconComp = iconMap[cap.iconName] || Building;
            return (
              <motion.article 
                key={cap.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="p-9 sm:p-11 lg:p-12 rounded-3xl bg-[#F7F7F5] border border-black/5 transition-all hover:bg-white hover:border-black/15 hover:shadow-sm group"
              >
                <div className="size-13 rounded-2xl bg-white border border-black/10 flex items-center justify-center text-[#4F6B85] shadow-xs mb-8">
                  <IconComp className="size-6.5" aria-hidden="true" />
                </div>
                <h3 className="font-sans text-xl font-bold text-[#111111]">{cap.title}</h3>
                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#555555]">{cap.description}</p>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
