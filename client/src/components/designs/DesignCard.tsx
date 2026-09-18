import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UIDesign } from '../../types/design';
import { RenderComponentByKey } from './ComponentRegistry';
import { Eye, Lock, Sparkles, Heart, Code2, ArrowUpRight } from 'lucide-react';
import { useTokens } from '../../context/TokenContext';

interface DesignCardProps {
  design: UIDesign;
  onLikeToggle?: (slug: string) => void;
  isLiked?: boolean;
}

export const DesignCard: React.FC<DesignCardProps> = ({ design, onLikeToggle, isLiked = false }) => {
  const [hovered, setHovered] = useState(false);
  const { getCustomProperties } = useTokens();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group bg-white border border-gray-200 hover:border-gray-400 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-2xs hover:shadow-md"
    >
      {/* Mini Preview Container */}
      <div className="relative bg-[#FBFBFA] border-b border-gray-100 overflow-hidden h-56 flex items-center justify-center p-4">
        {/* Token Injected Live Preview */}
        <div
          style={getCustomProperties()}
          className="w-full transform scale-[0.62] origin-top sm:origin-center pointer-events-none select-none transition-transform duration-300 group-hover:scale-[0.65]"
        >
          <RenderComponentByKey componentKey={design.componentKey} />
        </div>

        {/* Badges Top Bar */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 text-black shadow-xs">
            {design.category}
          </span>

          <div className="flex items-center gap-1.5">
            {design.isPremium ? (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#111111] text-white flex items-center gap-1 shadow-xs">
                <Lock size={10} /> Pro
              </span>
            ) : (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Free
              </span>
            )}
          </div>
        </div>

        {/* Hover Action Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center gap-3 transition-opacity duration-200 ${
            hovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <Link
            to={`/design/${design.slug}`}
            className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-1.5 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <Eye size={14} /> Live Inspect
          </Link>
          <Link
            to={`/design/${design.slug}#code`}
            className="px-4 py-2 rounded-xl bg-black text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg hover:bg-gray-800 transition-colors"
          >
            <Code2 size={14} /> Get Code
          </Link>
        </div>
      </div>

      {/* Card Info Footer */}
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link to={`/design/${design.slug}`} className="hover:underline">
              <h3 className="font-bold text-sm text-black tracking-tight group-hover:text-[#4F6B85] transition-colors">
                {design.title}
              </h3>
            </Link>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
              {design.description}
            </p>
          </div>

          <button
            onClick={() => onLikeToggle && onLikeToggle(design.slug)}
            className={`p-2 rounded-lg border transition-colors ${
              isLiked ? 'bg-red-50 border-red-200 text-red-600' : 'border-gray-200 text-gray-400 hover:text-black hover:bg-gray-50'
            }`}
            title="Save design"
          >
            <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Tags & Tech */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {design.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-600">
              #{tag}
            </span>
          ))}
          <span className="text-[10px] font-mono text-gray-400 ml-auto">
            {design.metrics?.views || 0} views
          </span>
        </div>
      </div>
    </div>
  );
};
