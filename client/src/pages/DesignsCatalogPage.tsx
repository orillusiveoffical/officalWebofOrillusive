import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { UIDesign } from '../types/design';
import { INITIAL_DESIGNS } from '../data/designsData';
import { DesignCard } from '../components/designs/DesignCard';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  X
} from 'lucide-react';

const CATEGORIES: { id: string; label: string }[] = [
  { id: 'all', label: 'All Designs' },
  { id: 'Navbar', label: 'Navbars' },
  { id: 'Dropdown', label: 'Dropdowns' },
  { id: 'UI Component', label: 'UI Components' },
  { id: 'Hero', label: 'Hero Sections' },
  { id: 'Cards', label: 'Cards & Pricing' },
  { id: 'Dashboard', label: 'Dashboards' },
  { id: 'Authentication', label: 'Auth & Forms' },
  { id: 'Overlay', label: 'Overlays & Search' }
];

const STYLES = ['all', 'minimal', 'modern', 'luxury', 'saas', 'editorial'];

export const DesignsCatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [designs, setDesigns] = useState<UIDesign[]>(INITIAL_DESIGNS);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedTier, setSelectedTier] = useState<'all' | 'free' | 'premium'>('all');
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync category param
  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const handleLikeToggle = (slug: string) => {
    setSavedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  // Compute category counts dynamically from real designs array
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: designs.length };
    designs.forEach((d) => {
      const cat = d.category;
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [designs]);

  // Filter & Search Logic
  const filteredDesigns = useMemo(() => {
    return designs.filter((item) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(q));
        const matchesCat = item.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesTags && !matchesCat) return false;
      }

      // Category
      if (selectedCategory !== 'all') {
        if (item.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // Tier
      if (selectedTier === 'free' && item.isPremium) return false;
      if (selectedTier === 'premium' && !item.isPremium) return false;

      // Style
      if (selectedStyle !== 'all' && item.style !== selectedStyle) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') {
        return (b.metrics?.views || 0) - (a.metrics?.views || 0);
      }
      return 0;
    });
  }, [designs, searchQuery, selectedCategory, selectedTier, selectedStyle, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTier('all');
    setSelectedStyle('all');
    searchParams.delete('category');
    searchParams.delete('q');
    setSearchParams(searchParams);
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedTier !== 'all' ||
    selectedStyle !== 'all';

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#111111] pb-24 font-sans">
      {/* Breathable Hero Header with Clean Spacing */}
      <section className="bg-white border-b border-gray-200 py-16 sm:py-20 lg:py-24 px-6">
        <div className="max-w-5xl mx-auto space-y-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-black max-w-3xl mx-auto leading-tight">
            Discover real UI designs. <span className="text-[#4F6B85]">Ship in minutes.</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Every component is accompanied by production React code, pure HTML/CSS, dynamic color tokens, and the exact authentic prompt used to generate it.
          </p>

          {/* Workflow Steps Indicator */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-4 text-xs font-semibold text-gray-600">
            <span className="px-3 py-1.5 rounded-lg bg-gray-100">1. Discover</span>
            <span className="text-gray-300">→</span>
            <span className="px-3 py-1.5 rounded-lg bg-gray-100">2. Preview</span>
            <span className="text-gray-300">→</span>
            <span className="px-3 py-1.5 rounded-lg bg-gray-100">3. Inspect</span>
            <span className="text-gray-300">→</span>
            <span className="px-3 py-1.5 rounded-lg bg-gray-100">4. Copy Code</span>
            <span className="text-gray-300">→</span>
            <span className="px-3 py-1.5 rounded-lg bg-black text-white">5. Build</span>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 space-y-8">
        {/* Search Bar & Primary Filter Controls */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 size-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value) searchParams.set('q', e.target.value);
                  else searchParams.delete('q');
                  setSearchParams(searchParams);
                }}
                placeholder="Search designs by title, keyword, tag, or category..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-[#4F6B85] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    searchParams.delete('q');
                    setSearchParams(searchParams);
                  }}
                  className="absolute right-3 top-3 text-gray-400 hover:text-black"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-xs font-semibold"
            >
              <SlidersHorizontal size={14} />
              <span>Filters {hasActiveFilters && '• Active'}</span>
            </button>

            {/* Desktop Tiers Filter */}
            <div className="hidden md:flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200">
              {(['all', 'free', 'premium'] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                    selectedTier === tier
                      ? 'bg-white text-black shadow-xs'
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {tier === 'all' ? 'All Tiers' : tier}
                </button>
              ))}
            </div>

            {/* Desktop Style Select */}
            <div className="hidden md:flex items-center gap-2">
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 outline-none focus:border-[#4F6B85]"
              >
                {STYLES.map((st) => (
                  <option key={st} value={st}>
                    {st === 'all' ? 'All Styles' : `${st.charAt(0).toUpperCase() + st.slice(1)} Style`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const count = categoryCounts[cat.id] ?? (cat.id === 'all' ? designs.length : 0);
              const isSelected = selectedCategory.toLowerCase() === cat.id.toLowerCase();
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                    isSelected
                      ? 'bg-black text-white shadow-xs'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-black border border-gray-200/60'
                  }`}
                >
                  <span>{cat.label}</span>
                  {count > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="md:hidden bg-white border border-gray-200 rounded-2xl p-4 shadow-lg space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-gray-100 border-b">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Filter Preferences</span>
              <button onClick={() => setMobileFilterOpen(false)} className="text-gray-400">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700">Access Tier</label>
              <div className="grid grid-cols-3 gap-2">
                {(['all', 'free', 'premium'] as const).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setSelectedTier(tier)}
                    className={`py-2 rounded-xl text-xs font-semibold capitalize border ${
                      selectedTier === tier
                        ? 'bg-black text-white border-black'
                        : 'border-gray-200 text-gray-700'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700">Design Aesthetic Style</label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800"
              >
                {STYLES.map((st) => (
                  <option key={st} value={st}>
                    {st === 'all' ? 'All Styles' : st}
                  </option>
                ))}
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="w-full py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50"
              >
                Reset All Filters
              </button>
            )}
          </div>
        )}

        {/* Results Counter & Active Filters Display */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-medium text-gray-500">
            Showing <span className="font-bold text-black">{filteredDesigns.length}</span> verified production UI designs
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-[#4F6B85] hover:underline flex items-center gap-1"
            >
              <RotateCcw size={12} />
              <span>Clear filters</span>
            </button>
          )}
        </div>

        {/* Designs Catalog Grid */}
        {filteredDesigns.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto">
            <div className="size-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
              <Search size={20} />
            </div>
            <h3 className="text-base font-bold text-gray-900">No matching UI designs found</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              We couldn't find any designs matching your current filter criteria. Try searching for a different keyword or resetting your filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-black text-white rounded-xl text-xs font-semibold hover:opacity-90"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDesigns.map((design) => (
              <DesignCard
                key={design.slug}
                design={design}
                isLiked={savedSlugs.includes(design.slug)}
                onLikeToggle={handleLikeToggle}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DesignsCatalogPage;
