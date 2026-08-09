import React from 'react';
import { SERVICES_DATA } from '../data/contentData';
import { Layers, Globe, Smartphone, Building2, ShieldCheck, LayoutGrid, Workflow, Wrench, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { PAGE_SEO, SERVICES_SCHEMA, buildBreadcrumbSchema } from '../data/seoData';

const iconMap: Record<string, React.ElementType> = {
  Layers, Globe, Smartphone, Building2, ShieldCheck, LayoutGrid, Workflow, Wrench
};

interface ServicesPageProps {
  onOpenInquiry: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenInquiry }) => {
  return (
    <div className="pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-8 lg:px-16 bg-[#F7F7F5] text-[#111111] min-h-screen font-sans">
      <SEOHead page={PAGE_SEO.services} />
      <StructuredData data={SERVICES_SCHEMA} id="services" />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ])}
        id="breadcrumb"
      />
      <div className="mx-auto max-w-[1360px] space-y-12 sm:space-y-16">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4F6B85] mb-3 sm:mb-4">Our Core Offerings</p>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-sans font-bold text-[#111111] leading-tight mb-4 sm:mb-6">
            Engineering Services <br />
            <span className="text-[#4F6B85]">Crafted for Growth & Reliability.</span>
          </h1>
          <p className="max-w-2xl text-sm sm:text-lg leading-relaxed text-[#555555]">
            We design and develop scalable software across eight core disciplines—focusing on modern engineering standards, intuitive user experiences, and long-term maintainability.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES_DATA.map((service) => {
            const Icon = iconMap[service.iconName] || Globe;
            return (
              <article key={service.id} className="p-6 sm:p-8 rounded-2xl bg-white border border-black/10 shadow-xs hover:shadow-sm transition-shadow flex flex-col justify-between">
                <div>
                  <div className="size-11 sm:size-12 rounded-xl bg-[#4F6B85]/10 text-[#4F6B85] flex items-center justify-center mb-6 sm:mb-7">
                    <Icon className="size-5.5 sm:size-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#111111] font-sans mb-2.5 sm:mb-3">{service.title}</h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#555555]">{service.description}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="bg-[#111111] text-[#F7F7F5] rounded-3xl p-7 sm:p-12 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 shadow-xl border border-white/10 relative overflow-hidden">
          <div className="space-y-2 z-10">
            <h3 className="text-xl sm:text-3xl font-bold font-sans text-white">Need a custom software platform?</h3>
            <p className="text-xs sm:text-sm text-white/70">Book a discovery session directly with our senior architecture team.</p>
          </div>
          <button 
            onClick={onOpenInquiry} 
            className="btn-sheen group inline-flex min-h-12 sm:min-h-13 items-center justify-center gap-3 rounded-full bg-white px-7 sm:px-8 py-3.5 text-xs font-bold text-[#111111] shrink-0 hover:bg-[#F7F7F5] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 uppercase tracking-wider shadow-lg hover:shadow-2xl hover:shadow-white/20 focus-visible:ring-2 focus-visible:ring-[#4F6B85] focus-visible:outline-none z-10 w-full sm:w-auto"
          >
            <span>Book a Discovery Call</span>
            <ArrowRight className="size-4 text-[#4F6B85] transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </div>
  );
};
