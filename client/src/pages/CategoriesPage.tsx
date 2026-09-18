import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Menu,
  Sparkles,
  CreditCard,
  LayoutGrid,
  FileText,
  Star,
  Shield,
  ArrowRight,
  Sliders,
  Bell,
  Search
} from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const categories = [
    {
      id: 'Navbar',
      title: 'Navigation & Headers',
      desc: 'Minimalist bars, mega menus, floating luxury pillbars, sticky mobile drawers.',
      count: '24 designs',
      icon: Menu
    },
    {
      id: 'Hero',
      title: 'Hero Sections',
      desc: 'Split conversion heroes, dark minimalist tech showcases, product metric headers.',
      count: '38 designs',
      icon: Sparkles
    },
    {
      id: 'Cards',
      title: 'Cards & Bento Grids',
      desc: 'Feature matrices, statistics cards, bento-box layouts, interactive widgets.',
      count: '28 designs',
      icon: LayoutGrid
    },
    {
      id: 'Pricing',
      title: 'Pricing & Tiers',
      desc: 'Multi-tier pricing comparison matrices, billing frequency switchers, feature tables.',
      count: '16 designs',
      icon: CreditCard
    },
    {
      id: 'Dashboard',
      title: 'Dashboards & Sidebars',
      desc: 'Collapsible application sidebars, metric graphs, analytics headers, data tables.',
      count: '20 designs',
      icon: Layers
    },
    {
      id: 'Authentication',
      title: 'Auth & Onboarding Forms',
      desc: 'Split login/signup cards, multi-step onboarding wizard, command palette search.',
      count: '18 designs',
      icon: FileText
    },
    {
      id: 'Testimonials',
      title: 'Testimonials & Social Proof',
      desc: 'Interactive quotes sliders, client rating cards, trust badges, avatar clusters.',
      count: '12 designs',
      icon: Star
    },
    {
      id: 'CTA',
      title: 'CTA Banners & Footers',
      desc: 'High-conversion banner cards, modern categorized footers, newsletter captures.',
      count: '15 designs',
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#111111] pb-24">
      <section className="bg-white border-b border-gray-200 py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-[#4F6B85]">
            Library Architecture
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-black">
            UI Categories & Systems
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
            Browse our categorized design index engineered for modular web application development.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                to={`/designs?category=${cat.id}`}
                className="group bg-white border border-gray-200 hover:border-black rounded-2xl p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="size-10 rounded-xl bg-black/5 text-black group-hover:bg-black group-hover:text-white flex items-center justify-center transition-colors">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-black tracking-tight group-hover:text-[#4F6B85] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold">
                  <span className="text-gray-400">{cat.count}</span>
                  <span className="text-black flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
};
