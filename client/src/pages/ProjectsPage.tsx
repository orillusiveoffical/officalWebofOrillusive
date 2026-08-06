import React from 'react';
import { FEATURED_PRODUCTS_DATA } from '../data/contentData';
import { ArrowUpRight, Check } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { PAGE_SEO, buildBreadcrumbSchema } from '../data/seoData';

interface ProjectsPageProps {
  onOpenInquiry: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onOpenInquiry }) => {
  return (
    <div className="pt-36 pb-32 px-6 sm:px-12 lg:px-20 bg-[#F7F7F5] text-[#111111] min-h-screen font-sans">
      <SEOHead page={PAGE_SEO.projects} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/projects' },
        ])}
        id="breadcrumb"
      />
      <div className="mx-auto max-w-[1360px] space-y-16">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4F6B85] mb-4">In-House Products</p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold text-[#111111] leading-tight mb-6">
            Featured Products <br />
            <span className="text-[#4F6B85]">Under Active Studio Development.</span>
          </h1>
          <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-[#555555]">
            Explore the internal products being engineered inside Orillusive. We design and build end-to-end digital solutions for modern enterprise and mobile environments.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {FEATURED_PRODUCTS_DATA.map((product) => (
            <div 
              key={product.id}
              className="p-9 sm:p-11 rounded-3xl bg-white border border-black/10 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="px-3.5 py-1 rounded-full bg-[#4F6B85]/10 text-[#4F6B85] text-[10px] font-bold uppercase tracking-wider">
                    {product.status}
                  </span>
                  <span className="text-[11px] font-mono text-[#888888]">{product.type}</span>
                </div>

                <h2 className="font-sans text-3xl font-bold text-[#111111]">{product.title}</h2>
                <p className="mt-2 text-xs font-semibold text-[#777777]">{product.subtitle}</p>

                <p className="mt-5 text-xs sm:text-sm leading-relaxed text-[#555555]">
                  {product.description}
                </p>

                <div className="mt-8 pt-6 border-t border-black/5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#777777] mb-4">Specifications & Features</p>
                  <div className="grid grid-cols-2 gap-3">
                    {product.features.map((feat) => (
                      <div key={feat} className="flex items-center space-x-2 text-xs text-[#333333]">
                        <Check className="size-4 text-[#4F6B85] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-5 border-t border-black/5 flex items-center justify-between">
                <span className="text-xs font-bold text-[#111111]">Orillusive Engineering Studio</span>
                <button
                  onClick={onOpenInquiry}
                  className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-[#4F6B85]/10 text-[#4F6B85] hover:bg-[#4F6B85] hover:text-white transition-all duration-300 font-bold uppercase tracking-wider text-[11px] hover:scale-105 active:scale-95 shadow-2xs hover:shadow-md group/btn"
                >
                  <span>Inquire about access</span>
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
