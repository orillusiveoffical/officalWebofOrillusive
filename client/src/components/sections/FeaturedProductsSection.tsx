import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { FEATURED_PRODUCTS_DATA } from '../../data/contentData';

interface FeaturedProductsSectionProps {
  onOpenInquiry: () => void;
}

export const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({ onOpenInquiry }) => {
  return (
    <section 
      id="products" 
      aria-label="Featured Products"
      className="py-36 md:py-52 lg:py-60 px-8 sm:px-14 lg:px-24 border-t border-black/5 bg-[#F7F7F5]"
    >
      <div className="mx-auto max-w-[1400px]">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10"
        >
          <div className="space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4F6B85]">
              In-House Engineering
            </p>
            <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111111]">
              Featured Products
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#666666] max-w-sm leading-relaxed">
            Explore real digital products currently being designed and engineered inside Orillusive studio.
          </p>
        </motion.div>

        {/* Showcase Cards Grid */}
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          {FEATURED_PRODUCTS_DATA.map((product, idx) => (
            <motion.article 
              key={product.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-3xl bg-white border border-black/10 p-10 sm:p-14 lg:p-16 shadow-xs transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-7">
                  <span className="px-4 py-1.5 rounded-full bg-[#4F6B85]/10 text-[#4F6B85] text-[10px] font-bold uppercase tracking-wider flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-[#4F6B85]" aria-hidden="true" />
                    {product.status}
                  </span>
                  <span className="text-[11px] font-mono text-[#888888]">{product.type}</span>
                </div>

                <h3 className="font-sans text-3xl sm:text-4xl font-bold text-[#111111] group-hover:text-[#4F6B85] transition-colors">
                  {product.title}
                </h3>
                <p className="mt-3 text-xs sm:text-sm font-semibold text-[#777777]">{product.subtitle}</p>

                <p className="mt-6 text-xs sm:text-sm leading-relaxed text-[#555555]">
                  {product.description}
                </p>

                {/* Features Badge Grid */}
                <div className="mt-10 pt-8 border-t border-black/5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#777777] mb-5">Included Capabilities</p>
                  <div className="grid grid-cols-2 gap-4">
                    {product.features.map((feat) => (
                      <div key={feat} className="flex items-center space-x-2.5 text-xs sm:text-sm text-[#333333]">
                        <Check className="size-4 text-[#4F6B85] shrink-0" aria-hidden="true" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-6 border-t border-black/5 flex items-center justify-between text-xs font-bold text-[#111111]">
                <span>Orillusive Studio Build</span>
                <button 
                  onClick={onOpenInquiry}
                  aria-label={`Inquire about access to ${product.title}`}
                  className="group/btn inline-flex min-h-10 items-center justify-center gap-2.5 px-5 py-2.5 rounded-full bg-[#4F6B85]/10 text-[#4F6B85] hover:bg-[#4F6B85] hover:text-white transition-all duration-300 font-bold uppercase tracking-wider text-[11px] hover:scale-105 active:scale-95 shadow-2xs hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#4F6B85] focus-visible:outline-none"
                >
                  <span>Inquire About Access</span>
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" aria-hidden="true" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};
