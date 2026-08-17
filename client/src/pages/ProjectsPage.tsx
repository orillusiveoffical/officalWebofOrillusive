import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FEATURED_PRODUCTS_DATA } from '../data/contentData';
import { ArrowUpRight, Check, Layers, Smartphone, Building2, Filter, SlidersHorizontal, Sparkles } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { PAGE_SEO, buildBreadcrumbSchema } from '../data/seoData';
import { CustomSelect, SelectOption } from '../components/CustomSelect';

interface ProjectsPageProps {
  onOpenInquiry: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onOpenInquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const categoryOptions: SelectOption[] = [
    { value: 'all', label: 'All Product Categories', icon: Layers },
    { value: 'Monetized SaaS Product', label: 'Monetized SaaS Products', icon: Sparkles, description: 'Live subscription & credit SaaS platforms' },
    { value: 'Mobile Application', label: 'Mobile Applications', icon: Smartphone, description: 'iOS & Android native apps' },
    { value: 'Enterprise Platform', label: 'Enterprise Platforms', icon: Building2, description: 'Multi-property suites' }
  ];

  const statusOptions: SelectOption[] = [
    { value: 'all', label: 'All Development Statuses', icon: Filter },
    { value: 'Live / Available Now', label: 'Live / Available Now', icon: Check, description: 'Available for immediate launch' },
    { value: 'Currently Under Development', label: 'Under Active Development', icon: SlidersHorizontal, description: 'In-house engineering build' }
  ];

  const filteredProducts = FEATURED_PRODUCTS_DATA.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.type === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    return matchesCategory && matchesStatus;
  });

  return (
    <div className="pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-8 lg:px-16 bg-[#F7F7F5] text-[#111111] min-h-screen font-sans">
      <SEOHead page={PAGE_SEO.projects} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/projects' },
        ])}
        id="breadcrumb"
      />
      <div className="mx-auto max-w-[1360px] space-y-10 sm:space-y-14">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4F6B85] mb-3 sm:mb-4">In-House Products</p>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-sans font-bold text-[#111111] leading-tight mb-4 sm:mb-6">
              Featured Products <br />
              <span className="text-[#4F6B85]">Under Active Studio Development.</span>
            </h1>
            <p className="text-sm sm:text-lg leading-relaxed text-[#555555]">
              Explore internal software products engineered inside Orillusive. Use the clean dropdown filters below to slice products by category or studio development status.
            </p>
          </div>

          {/* Clean Interactive Dropdown Filters */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-black/10 shadow-lg space-y-3 w-full lg:w-[420px] shrink-0">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#4F6B85] pb-2 border-b border-black/5">
              <span className="flex items-center gap-1.5">
                <Filter className="size-3.5" />
                <span>Product Filters</span>
              </span>
              <span className="font-mono text-[#888888]">Showing {filteredProducts.length} of {FEATURED_PRODUCTS_DATA.length}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <CustomSelect
                label="Category"
                options={categoryOptions}
                value={selectedCategory}
                onChange={setSelectedCategory}
              />
              <CustomSelect
                label="Status"
                options={statusOptions}
                value={selectedStatus}
                onChange={setSelectedStatus}
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                id={product.id}
                className="p-6 sm:p-10 rounded-3xl bg-white border border-black/10 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <span className={`px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      product.status.includes('Live') 
                        ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20'
                        : 'bg-[#4F6B85]/10 text-[#4F6B85]'
                    }`}>
                      {product.status}
                    </span>
                    <span className="text-[11px] font-mono text-[#888888]">{product.type}</span>
                  </div>

                  <h2 className="font-sans text-2xl sm:text-3xl font-bold text-[#111111]">{product.title}</h2>
                  <p className="mt-2 text-xs font-semibold text-[#777777]">{product.subtitle}</p>

                  <p className="mt-4 sm:mt-5 text-xs sm:text-sm leading-relaxed text-[#555555]">
                    {product.description}
                  </p>

                  <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-black/5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#777777] mb-4">Specifications & Features</p>
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                      {product.features.map((feat) => (
                        <div key={feat} className="flex items-center space-x-2 text-xs text-[#333333]">
                          <Check className="size-4 text-[#4F6B85] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 sm:mt-10 pt-5 border-t border-black/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-xs font-bold text-[#111111]">Orillusive Engineering Studio</span>
                  {product.link ? (
                    <Link
                      to={product.link}
                      aria-label={`Explore ${product.title}`}
                      className="group/btn inline-flex min-h-10 items-center justify-center gap-2.5 px-5 py-2.5 rounded-full bg-[#111111] text-[#F7F7F5] hover:bg-[#2C1E16] transition-all duration-300 font-bold uppercase tracking-wider text-[11px] hover:scale-105 active:scale-95 shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#4F6B85] focus-visible:outline-none w-full sm:w-auto"
                    >
                      <span>{product.ctaText || 'Explore Product'}</span>
                      <ArrowUpRight className="size-4 text-[#C9A84C] transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Link>
                  ) : (
                    <button
                      onClick={onOpenInquiry}
                      aria-label={`Inquire about access to ${product.title}`}
                      className="group/btn inline-flex min-h-10 items-center justify-center gap-2.5 px-5 py-2.5 rounded-full bg-[#4F6B85]/10 text-[#4F6B85] hover:bg-[#4F6B85] hover:text-white transition-all duration-300 font-bold uppercase tracking-wider text-[11px] hover:scale-105 active:scale-95 shadow-2xs hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#4F6B85] focus-visible:outline-none w-full sm:w-auto"
                    >
                      <span>Inquire About Access</span>
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-3xl bg-white border border-black/10 text-center space-y-4">
            <Sparkles className="size-8 text-[#4F6B85] mx-auto" />
            <h3 className="text-xl font-bold text-[#111111]">No products match the selected filters</h3>
            <p className="text-xs text-[#666666]">Try adjusting your category or status dropdown selections.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}
              className="px-5 py-2 rounded-full bg-[#111111] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#4F6B85] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
