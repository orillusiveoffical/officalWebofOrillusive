import React from 'react';
import { ArrowRight } from 'lucide-react';

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
                className="w-full py-3.5 bg-[#111111] text-[#F7F7F5] font-bold text-xs rounded-full hover:bg-[#2C1E16] transition-colors flex items-center justify-center space-x-2 uppercase tracking-wider"
              >
                <span>Book Discovery Call</span>
                <ArrowRight className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
