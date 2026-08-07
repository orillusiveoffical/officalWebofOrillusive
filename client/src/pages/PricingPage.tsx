import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { PAGE_SEO, buildBreadcrumbSchema } from '../data/seoData';

interface PricingPageProps {
  onOpenInquiry: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onOpenInquiry }) => {
  const engagementModels = [
    {
      id: 'sprint',
      title: 'Product Architecture Sprint',
      subtitle: 'System scoping, UI/UX prototyping, and technical roadmap.',
      price: 'Custom Scope'
    },
    {
      id: 'build',
      title: 'End-to-End Product Build',
      subtitle: 'Complete design and engineering of production web or mobile applications.',
      price: 'Project-Based'
    },
    {
      id: 'team',
      title: 'Dedicated Engineering Studio',
      subtitle: 'Long-term product team partnership, continuous delivery, and system scaling.',
      price: 'Monthly Partnership'
    }
  ];

  return (
    <div className="pt-36 pb-32 px-6 sm:px-12 lg:px-20 bg-[#F7F7F5] text-[#111111] min-h-screen font-sans">
      <SEOHead page={PAGE_SEO.pricing} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Pricing', path: '/pricing' },
        ])}
        id="breadcrumb"
      />
      <div className="mx-auto max-w-[1360px] space-y-16">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4F6B85] mb-4">Engagements</p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold text-[#111111] leading-tight mb-6">
            Flexible Studio Models <br />
            <span className="text-[#4F6B85]">Shaped Around Business Goals.</span>
          </h1>
          <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-[#555555]">
            Clear, outcome-focused engagement models tailored to your product stage, technical complexity, and growth objectives.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl">
          {engagementModels.map((tier) => (
            <div key={tier.id} className="p-9 rounded-2xl bg-white border border-black/10 shadow-xs flex flex-col justify-between space-y-10">
              <div>
                <h3 className="text-2xl font-bold font-sans text-[#111111]">{tier.title}</h3>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#555555]">{tier.subtitle}</p>
                <p className="mt-8 text-3xl font-bold text-[#4F6B85] font-sans">{tier.price}</p>
              </div>
              <button
                onClick={onOpenInquiry}
                className="btn-sheen group/btn w-full min-h-12 py-3.5 bg-[#111111] text-[#F7F7F5] font-bold text-xs rounded-full hover:bg-[#2C1E16] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 inline-flex items-center justify-center gap-2.5 uppercase tracking-wider shadow-md hover:shadow-xl hover:shadow-black/20 focus-visible:ring-2 focus-visible:ring-[#4F6B85] focus-visible:outline-none"
              >
                <span>Book a Discovery Call</span>
                <ArrowRight className="size-4 text-[#C9A84C] transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
