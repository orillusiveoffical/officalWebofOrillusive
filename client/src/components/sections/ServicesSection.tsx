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
      className="py-36 md:py-52 lg:py-60 px-8 sm:px-14 lg:px-24 border-t border-black/5 bg-[#F7F7F5]"
    >
      <div className="mx-auto max-w-[1400px]">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mb-24 space-y-4"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4F6B85]">
            Core Services
          </p>
          <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111111]">
            Engineering Solutions Provided by Orillusive
          </h2>
        </motion.div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {SERVICES_DATA.map((s, idx) => {
            const IconComp = iconMap[s.iconName] || Layers;
            return (
              <motion.article 
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 sm:p-10 lg:p-11 rounded-3xl bg-white border border-black/10 shadow-xs hover:shadow-sm transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-7">
                    <div className="size-12 rounded-xl bg-[#4F6B85]/10 text-[#4F6B85] flex items-center justify-center">
                      <IconComp className="size-6" aria-hidden="true" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#888888]">0{idx + 1}</span>
                  </div>
                  <h3 className="font-sans text-lg font-bold text-[#111111] mb-3">{s.title}</h3>
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
