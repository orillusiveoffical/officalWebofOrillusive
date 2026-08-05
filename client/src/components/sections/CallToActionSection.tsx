import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CallToActionSectionProps {
  onOpenInquiry: () => void;
}

export const CallToActionSection: React.FC<CallToActionSectionProps> = ({ onOpenInquiry }) => {
  return (
    <section 
      id="contact" 
      aria-label="Call to Action"
      className="antigravity-dark-bg text-[#F7F7F5] py-36 md:py-52 lg:py-60 px-8 sm:px-14 lg:px-24"
    >
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-4xl text-center space-y-10"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4F6B85]">
          Start Your Journey
        </p>
        <h2 className="font-sans text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white">
          Let's Build Something Meaningful.
        </h2>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed text-white/70 max-w-xl mx-auto font-normal">
          Whether you're launching your first product or modernizing an existing business, we're ready to help you build software that lasts.
        </p>
        <div className="pt-6">
          <button
            onClick={onOpenInquiry}
            aria-label="Book a discovery call with Orillusive senior architects"
            className="inline-flex min-h-15 items-center justify-center gap-3.5 rounded-full bg-white px-10 text-xs font-bold uppercase tracking-wider text-[#111111] transition-all hover:bg-[#F7F7F5] hover:scale-105 shadow-xl focus-visible:ring-2 focus-visible:ring-[#4F6B85] focus-visible:outline-none"
          >
            <span>Book a Discovery Call</span>
            <ArrowRight className="size-4 text-[#4F6B85]" aria-hidden="true" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};
