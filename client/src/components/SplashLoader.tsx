import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface SplashLoaderProps {
  onComplete: () => void;
}

export const SplashLoader: React.FC<SplashLoaderProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 650);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 bg-[#111111] flex flex-col items-center justify-center text-[#F7F7F5] pointer-events-none"
    >
      {/* Soft Radial Background Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(79,107,133,0.15),transparent_55%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center">

        {/* Orillusive Logo Image — Circular Framed */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8 sm:mb-10"
        >
          {/* Outer subtle glow ring */}
          <div className="absolute -inset-3 rounded-full bg-[#C9A84C]/10 blur-xl" />
          {/* Circular logo container */}
          <div className="relative size-20 sm:size-24 rounded-full overflow-hidden border border-white/10 shadow-2xl">
            <img
              src="/logo.jpg"
              alt="Orillusive Logo"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="text-2xl font-bold uppercase tracking-[0.35em] font-sans text-[#F7F7F5]"
        >
          ORILLUSIVE<span className="text-[#C9A84C]">.</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="mt-3 text-[11px] font-medium tracking-[0.22em] text-[#888888] uppercase"
        >
          Software Engineering Studio
        </motion.p>

        {/* Loading Progress Bar */}
        <div className="mt-8 sm:mt-10 w-56 sm:w-64 h-[2px] overflow-hidden bg-white/10 rounded-full">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-[#C9A84C] to-[#E8C97A]"
          />
        </div>
      </div>
    </motion.div>
  );
};
