import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Globe, Smartphone, Building2, ShieldCheck, LayoutGrid, Workflow, Wrench } from 'lucide-react';
import { SERVICES_DATA } from '../../data/contentData';

const iconMap: Record<string, React.ElementType> = {
  Layers, Globe, Smartphone, Building2, ShieldCheck, LayoutGrid, Workflow, Wrench
};

export const ServicesSection: React.FC = () => {
  return (
    <section 
      id="services" 
      aria-label="Core Engineering Services"
      className="py-20 sm:py-28 md:py-36 px-4 sm:px-8 lg:px-16 border-t border-black/5 bg-[#F7F7F5]"
    >
      <div className="mx-auto max-w-[1400px]">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mb-14 sm:mb-20 space-y-3 sm:space-y-4"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4F6B85]">
            Core Services
          </p>
          <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111111]">
            Engineering Solutions Provided by Orillusive
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {SERVICES_DATA.map((s, idx) => {
            const IconComp = iconMap[s.iconName] || Layers;
            return (
              <motion.article 
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 sm:p-8 lg:p-9 rounded-3xl bg-white border border-black/10 shadow-xs hover:shadow-sm transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6 sm:mb-7">
                    <div className="size-11 sm:size-12 rounded-xl bg-[#4F6B85]/10 text-[#4F6B85] flex items-center justify-center">
                      <IconComp className="size-5.5 sm:size-6" aria-hidden="true" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#888888]">0{idx + 1}</span>
                  </div>
                  <h3 className="font-sans text-base sm:text-lg font-bold text-[#111111] mb-2.5 sm:mb-3">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">{s.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
