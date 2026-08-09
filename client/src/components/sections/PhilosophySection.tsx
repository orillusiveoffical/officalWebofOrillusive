import React from 'react';
import { motion } from 'framer-motion';

export const PhilosophySection: React.FC = () => {
  return (
    <section 
      aria-label="Studio Philosophy"
      className="py-20 sm:py-28 md:py-36 px-4 sm:px-8 lg:px-16 border-t border-black/5 bg-[#F7F7F5]"
    >
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-4xl text-center space-y-6 sm:space-y-10"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#4F6B85]">
          Our Philosophy
        </p>
        <h2 className="font-sans text-2xl sm:text-4xl md:text-6xl font-bold tracking-tight text-[#111111] leading-tight">
          We Don't Just Build Software. <br />
          <span className="text-[#4F6B85]">
            We Build Products That Businesses Depend On.
          </span>
        </h2>
        <p className="text-sm sm:text-lg md:text-xl leading-relaxed text-[#555555] max-w-2xl mx-auto font-normal">
          Software should be quiet, reliable, and powerful. When engineering is done right, platforms operate seamlessly, scale without friction, and empower leaders to focus on driving their core business.
        </p>
      </motion.div>
    </section>
  );
};
