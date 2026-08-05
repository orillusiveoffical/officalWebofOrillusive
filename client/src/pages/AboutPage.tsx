import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-36 pb-32 px-6 sm:px-12 lg:px-20 bg-[#F7F7F5] text-[#111111] min-h-screen font-sans">
      <div className="mx-auto max-w-[1360px] space-y-28">
        
        {/* About Hero */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4F6B85] mb-4">Studio Philosophy</p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold leading-tight text-[#111111] max-w-5xl mb-6">
            Built with Purpose. <br />
            <span className="text-[#4F6B85]">Designed to Last.</span>
          </h1>
          <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-[#555555]">
            Orillusive is a premium Software Engineering Studio. We design and build modern software that solves real business problems—focusing on long-term digital products instead of short-term solutions.
          </p>
        </div>

        {/* Studio Pillars */}
        <div className="border-t border-black/10 pt-20">
          <h2 className="text-2xl sm:text-3xl font-bold font-sans text-[#111111] mb-12">Engineering Standards</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            
            <div className="p-9 rounded-2xl bg-white border border-black/10 shadow-xs">
              <span className="text-xs text-[#4F6B85] font-mono font-bold">01 // ARCHITECTURE</span>
              <h3 className="mt-5 text-xl font-bold font-sans text-[#111111]">Modern Architecture</h3>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#555555]">
                We engineer scalable backend and frontend foundations designed to grow alongside your business without technical debt.
              </p>
            </div>

            <div className="p-9 rounded-2xl bg-white border border-black/10 shadow-xs">
              <span className="text-xs text-[#4F6B85] font-mono font-bold">02 // CRAFTSMANSHIP</span>
              <h3 className="mt-5 text-xl font-bold font-sans text-[#111111]">Handcrafted UX</h3>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#555555]">
                Every user interface is meticulously tailored for clarity, speed, and intuitive operational flow without generic templates.
              </p>
            </div>

            <div className="p-9 rounded-2xl bg-white border border-black/10 shadow-xs">
              <span className="text-xs text-[#4F6B85] font-mono font-bold">03 // TRANSPARENCY</span>
              <h3 className="mt-5 text-xl font-bold font-sans text-[#111111]">Direct Senior Access</h3>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#555555]">
                Transparent communication with senior software architects involved directly in building and shipping your product.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
