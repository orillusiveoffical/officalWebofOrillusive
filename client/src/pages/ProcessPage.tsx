import React from 'react';
import { PROCESS_STEPS } from '../data/contentData';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { PAGE_SEO, buildBreadcrumbSchema } from '../data/seoData';

export const ProcessPage: React.FC = () => {
  return (
    <div className="pt-36 pb-32 px-6 sm:px-12 lg:px-20 bg-[#F7F7F5] text-[#111111] min-h-screen font-sans">
      <SEOHead page={PAGE_SEO.process} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Process', path: '/process' },
        ])}
        id="breadcrumb"
      />
      <div className="mx-auto max-w-[1360px] space-y-16">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4F6B85] mb-4">Development Methodology</p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold text-[#111111] leading-tight mb-6">
            Engineering Process <br />
            <span className="text-[#4F6B85]">From Discovery to Long-Term Growth.</span>
          </h1>
          <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-[#555555]">
            A methodical 7-step engineering roadmap designed to take software products from initial discovery to high-scale production and continuous evolution.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((s) => (
            <div key={s.step} className="p-8 rounded-2xl bg-white border border-black/10 shadow-xs flex flex-col justify-between min-h-[230px]">
              <span className="text-2xl font-bold font-mono text-[#4F6B85]">{s.step}</span>
              <div>
                <h3 className="text-xl font-bold font-sans text-[#111111]">{s.title}</h3>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#555555]">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
