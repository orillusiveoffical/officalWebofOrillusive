import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Layers, Mail } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = '404 — Page Not Found | Orillusive';
    let metaRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'noindex, nofollow');

    return () => {
      if (metaRobots) {
        metaRobots.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
      }
    };
  }, []);

  return (
    <div className="pt-32 sm:pt-40 pb-24 sm:pb-32 px-4 sm:px-8 lg:px-16 bg-[#F7F7F5] text-[#111111] font-sans min-h-[85vh] flex items-center justify-center">
      <div className="mx-auto max-w-2xl text-center space-y-6 sm:space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4F6B85]/10 border border-[#4F6B85]/20 text-[#4F6B85] text-xs font-bold uppercase tracking-wider font-mono">
          <span>Error 404 // Route Not Found</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold text-[#111111] tracking-tight leading-tight">
          Page Not Found.
        </h1>

        <p className="text-sm sm:text-lg text-[#555555] leading-relaxed max-w-md mx-auto">
          The requested URL does not exist or has been moved to a permanent location. Explore our engineering disciplines or return home.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="btn-sheen inline-flex min-h-12 items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-[#111111] text-[#F7F7F5] text-xs font-bold uppercase tracking-wider hover:bg-[#2C1E16] transition-all shadow-md hover:shadow-lg"
          >
            <Home className="size-3.5 text-[#C9A84C]" />
            <span>Return Home</span>
          </Link>

          <Link
            to="/services"
            className="inline-flex min-h-12 items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-white border border-black/10 text-[#111111] text-xs font-bold uppercase tracking-wider hover:bg-[#F7F7F5] transition-all shadow-xs"
          >
            <Layers className="size-3.5 text-[#4F6B85]" />
            <span>Our Services</span>
          </Link>

          <Link
            to="/contact"
            className="inline-flex min-h-12 items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-white border border-black/10 text-[#111111] text-xs font-bold uppercase tracking-wider hover:bg-[#F7F7F5] transition-all shadow-xs"
          >
            <Mail className="size-3.5 text-[#4F6B85]" />
            <span>Contact Studio</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
