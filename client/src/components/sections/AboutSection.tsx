import React from 'react';
import { motion } from 'framer-motion';

export const AboutSection: React.FC = () => {
  return (
    <section 
      id="about" 
      aria-label="About Orillusive"
      className="py-20 sm:py-28 md:py-36 px-4 sm:px-8 lg:px-16 border-t border-black/5 bg-white overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px]">
        
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-start">
          
          {/* Left Header with Scroll-Triggered Motion */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 sm:space-y-8"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4F6B85]">
              About Orillusive
            </p>
            <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111111] leading-tight">
              Built with Purpose. <br />
              <span className="text-[#4F6B85]">Designed to Last.</span>
            </h2>
            <p className="text-sm sm:text-lg md:text-xl leading-relaxed text-[#555555]">
              Orillusive was founded on a simple principle: modern businesses need digital products that stand up to real-world demands. We build software platforms crafted with clean architecture, high scalability, and timeless design.
            </p>
          </motion.div>

          {/* Right Philosophy Timeline with Staggered Scroll Motion */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 sm:space-y-12 pl-0 lg:pl-12 border-l-0 lg:border-l border-black/10"
          >
            
            <div className="relative pl-6 sm:pl-8 border-l-2 border-[#4F6B85]">
              <div className="absolute -left-[7px] top-1.5 size-3 rounded-full bg-[#4F6B85]" aria-hidden="true" />
              <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#111111]">Long-Term Product Mindset</h3>
              <p className="mt-2.5 sm:mt-4 text-xs sm:text-sm md:text-base leading-relaxed text-[#555555]">
                We steer clear of quick hacks and disposable code. Every architecture we build is designed for continuous evolution, security, and sustained business growth.
              </p>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-black/15">
              <div className="absolute -left-[7px] top-1.5 size-3 rounded-full bg-black/30" aria-hidden="true" />
              <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#111111]">Direct Senior Engineering</h3>
              <p className="mt-2.5 sm:mt-4 text-xs sm:text-sm md:text-base leading-relaxed text-[#555555]">
                You work directly with the senior frontend architects and backend engineers actually building your product—no bloated account management layers.
              </p>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-black/15">
              <div className="absolute -left-[7px] top-1.5 size-3 rounded-full bg-black/30" aria-hidden="true" />
              <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#111111]">Handcrafted Excellence</h3>
              <p className="mt-2.5 sm:mt-4 text-xs sm:text-sm md:text-base leading-relaxed text-[#555555]">
                No off-the-shelf templates. Every layout, component, API endpoint, and state management flow is intentionally engineered for your specific product vision.
              </p>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
