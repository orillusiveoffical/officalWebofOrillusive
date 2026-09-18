import { UIDesign } from '../types/design';

export const INITIAL_DESIGNS: UIDesign[] = [
  /* -------------------------------------------------------------
     1. MINIMAL NAVBAR
     ------------------------------------------------------------- */
  {
    slug: 'minimal-navbar',
    title: 'Minimal Navbar with Hover States',
    description: 'Clean, distraction-free navigation bar with responsive mobile drawer, micro-interactions, and action button.',
    category: 'Navbar',
    subcategory: 'Minimal',
    tags: ['Navbar', 'Minimal', 'Responsive', 'Light Theme', 'Header'],
    style: 'minimal',
    complexity: 'beginner',
    isPremium: false,
    isFeatured: true,
    technology: 'React + Tailwind / HTML+CSS',
    responsiveSupport: { desktop: true, tablet: true, mobile: true },
    colorTokens: {
      primary: '#111111',
      secondary: '#4F6B85',
      background: '#FFFFFF',
      foreground: '#111111',
      muted: '#6B7280',
      border: '#E5E7EB',
      accent: '#4F6B85',
      card: '#FFFFFF'
    },
    componentKey: 'MinimalNavbar',
    reactCode: `import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const MinimalNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white font-bold text-sm">
            O
          </div>
          <span className="font-semibold text-lg tracking-tight text-black">
            Orillusive
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#overview" className="text-black hover:text-gray-900 transition-colors">Overview</a>
          <a href="#systems" className="hover:text-black transition-colors">Design Systems</a>
          <a href="#patterns" className="hover:text-black transition-colors">Patterns</a>
          <a href="#pricing" className="hover:text-black transition-colors">Pricing</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button className="text-sm font-medium text-gray-600 hover:text-black">
            Sign in
          </button>
          <button className="px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
            Get Access
          </button>
        </div>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden pt-4 pb-2 border-t border-gray-100 mt-3 flex flex-col gap-3 text-sm">
          <a href="#overview" className="text-black font-medium">Overview</a>
          <a href="#systems" className="text-gray-600">Design Systems</a>
          <a href="#patterns" className="text-gray-600">Patterns</a>
          <a href="#pricing" className="text-gray-600">Pricing</a>
          <div className="pt-2 flex flex-col gap-2">
            <button className="w-full py-2 text-center font-medium border border-gray-200 rounded-lg">Sign in</button>
            <button className="w-full py-2 text-center font-medium bg-black text-white rounded-lg">Get Access</button>
          </div>
        </div>
      )}
    </header>
  );
};`,
    htmlCode: `<header class="navbar">
  <div class="nav-container">
    <div class="brand">
      <div class="logo-box">O</div>
      <span class="brand-name">Orillusive</span>
    </div>
    
    <nav class="nav-links">
      <a href="#overview" class="active">Overview</a>
      <a href="#systems">Design Systems</a>
      <a href="#patterns">Patterns</a>
      <a href="#pricing">Pricing</a>
    </nav>
    
    <div class="nav-actions">
      <button class="btn-ghost">Sign in</button>
      <button class="btn-primary">Get Access</button>
    </div>
  </div>
</header>`,
    cssCode: `.navbar {
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 1.5rem;
}
.nav-container {
  max-width: 80rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.logo-box {
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background: #111111;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
}
.brand-name {
  font-weight: 600;
  font-size: 1.125rem;
  letter-spacing: -0.025em;
  color: #111111;
}
.nav-links {
  display: flex;
  gap: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
}
.nav-links a {
  color: #6b7280;
  text-decoration: none;
  transition: color 0.15s ease;
}
.nav-links a:hover, .nav-links a.active {
  color: #111111;
}
.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.btn-ghost {
  background: transparent;
  border: none;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
}
.btn-primary {
  background: #111111;
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
}`,
    reactPrompt: `Create a clean, production-ready React navbar component called MinimalNavbar using TypeScript, Tailwind CSS, and Lucide React icons.

Requirements:
1. Brand container with a rounded-lg dark square emblem logo ('O') and bold brand name 'Orillusive'.
2. Desktop navigation with links: Overview, Design Systems, Patterns, Pricing. Include subtle hover text-color transitions and active state.
3. Action buttons: A ghost 'Sign in' button and a solid primary 'Get Access' button with slight shadow and hover opacity reduction.
4. Mobile navigation: Hamburger icon (Menu/X from lucide-react) toggle button visible only on mobile (hidden on md screens). Toggling opens a smooth drawer containing all navigation links and full-width CTA buttons.
5. High-contrast light theme styling using pure white (#ffffff) background, clean gray borders (#e5e7eb), and deep black (#111111) text.`,
    htmlPrompt: `Build a semantic HTML5 and CSS3 minimal navigation bar component.

Structure:
- <header> containing a centered max-width container with flexbox justify-between.
- Brand identity on the left with a 32x32px dark icon badge and brand label.
- Center navigation links with 32px gap, 14px font size, and color transitions on hover.
- Right action buttons: a subtle text link for sign-in and a primary dark CTA button.
- Clean typography and 1px bottom border using light gray (#e5e7eb).`,
    metrics: { views: 0, likes: 0, copies: 0 }
  },

  /* -------------------------------------------------------------
     2. SAAS NAVBAR WITH DROPDOWN
     ------------------------------------------------------------- */
  {
    slug: 'saas-navbar-with-dropdown',
    title: 'SaaS Navbar with Interactive Dropdown',
    description: 'Feature-rich top navigation bar for modern cloud platforms featuring product menus and trial CTAs.',
    category: 'Navbar',
    subcategory: 'SaaS',
    tags: ['Navbar', 'SaaS', 'Dropdown', 'Interactive', 'Header'],
    style: 'modern',
    complexity: 'intermediate',
    isPremium: false,
    isFeatured: true,
    technology: 'React + Tailwind / HTML+CSS',
    responsiveSupport: { desktop: true, tablet: true, mobile: true },
    colorTokens: {
      primary: '#111111',
      secondary: '#4F6B85',
      background: '#FFFFFF',
      foreground: '#111111',
      muted: '#6B7280',
      border: '#E5E7EB',
      accent: '#4F6B85',
      card: '#FFFFFF'
    },
    componentKey: 'SaaSNavbar',
    reactCode: `import React, { useState } from 'react';
import { ChevronDown, ArrowRight, ChevronRight } from 'lucide-react';

export const SaaSNavbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b border-gray-200 px-6 py-3.5 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2.5">
            <div className="size-7 rounded-md bg-black flex items-center justify-center text-white text-xs font-mono font-bold">
              //
            </div>
            <span className="font-semibold text-[15px] tracking-tight text-gray-900">
              HyperScale
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
              v2.4
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600">
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 hover:text-gray-900 py-1 transition-colors"
              >
                Products <ChevronDown size={14} className={\`transition-transform duration-200 \${dropdownOpen ? 'rotate-180' : ''}\`} />
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl p-3 z-30 animate-in fade-in slide-in-from-top-2">
                  <div className="p-2 hover:bg-black/5 rounded-lg cursor-pointer transition-colors">
                    <p className="font-semibold text-xs text-gray-900">Edge Architecture</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">Ultra low latency routing infrastructure</p>
                  </div>
                  <div className="p-2 hover:bg-black/5 rounded-lg cursor-pointer transition-colors mt-1">
                    <p className="font-semibold text-xs text-gray-900">Dynamic Pipelines</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">Automated visual regression tests</p>
                  </div>
                  <div className="p-2 hover:bg-black/5 rounded-lg cursor-pointer transition-colors mt-1 border-t border-gray-100 pt-2">
                    <p className="text-[11px] font-medium text-blue-600 flex items-center justify-between">
                      View all products <ChevronRight size={12} />
                    </p>
                  </div>
                </div>
              )}
            </div>
            <a href="#solutions" className="hover:text-gray-900 transition-colors">Solutions</a>
            <a href="#docs" className="hover:text-gray-900 transition-colors">Documentation</a>
            <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-flex text-xs font-semibold text-gray-600 hover:text-gray-900 px-3 py-2">
            Log in
          </button>
          <button className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-black text-white text-xs font-medium hover:opacity-90 transition-all shadow-sm">
            Start Free Trial <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </header>
  );
};`,
    htmlCode: `<header class="saas-navbar">
  <div class="saas-nav-content">
    <div class="brand-group">
      <div class="code-logo">//</div>
      <span class="brand-title">HyperScale</span>
      <span class="version-tag">v2.4</span>
    </div>
    <nav class="nav-links">
      <a href="#products">Products ▾</a>
      <a href="#solutions">Solutions</a>
      <a href="#docs">Docs</a>
      <a href="#pricing">Pricing</a>
    </nav>
    <div class="actions">
      <a href="#login" class="link-login">Log in</a>
      <button class="btn-trial">Start Free Trial →</button>
    </div>
  </div>
</header>`,
    cssCode: `.saas-navbar {
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #e5e7eb;
  padding: 0.875rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 50;
}`,
    reactPrompt: `Design an enterprise SaaS top navbar with interactive popup dropdown menu in React and Tailwind CSS.
Include version tag 'v2.4', animated chevron icon flip on toggle, and backdrop-blur glass styling.`,
    htmlPrompt: `Build a clean semantic SaaS header markup with version badge, product navigation links, and trial CTA button.`,
    metrics: { views: 0, likes: 0, copies: 0 }
  },

  /* -------------------------------------------------------------
     3. DROPDOWNS: MINIMAL SELECT DROPDOWN
     ------------------------------------------------------------- */
  {
    slug: 'minimal-select-dropdown',
    title: 'Minimal Select Dropdown with Active States',
    description: 'Clean single-select dropdown popover with smooth hover states, selected checkmark indicator, and token support.',
    category: 'Dropdown',
    subcategory: 'Select',
    tags: ['Dropdown', 'Select', 'Form', 'Minimal', 'Popover'],
    style: 'minimal',
    complexity: 'beginner',
    isPremium: false,
    isFeatured: true,
    technology: 'React + Tailwind / HTML+CSS',
    responsiveSupport: { desktop: true, tablet: true, mobile: true },
    colorTokens: {
      primary: '#111111',
      secondary: '#4F6B85',
      background: '#FFFFFF',
      foreground: '#111111',
      muted: '#6B7280',
      border: '#E5E7EB',
      accent: '#4F6B85',
      card: '#FFFFFF'
    },
    componentKey: 'MinimalDropdown',
    reactCode: `import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export const MinimalDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Production Branch');

  const options = [
    'Production Branch',
    'Staging Preview',
    'Development Alpha',
    'Feature Sandbox'
  ];

  return (
    <div className="relative w-72">
      <label className="block text-xs font-semibold text-gray-900 mb-1.5">
        Active Environment
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-900 shadow-2xs hover:border-gray-400 focus:outline-none focus:border-blue-600 transition-all"
      >
        <span>{selected}</span>
        <ChevronDown size={14} className={\`text-gray-400 transition-transform duration-200 \${isOpen ? 'rotate-180' : ''}\`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl p-1.5 z-30 animate-in fade-in slide-in-from-top-2">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                setSelected(opt);
                setIsOpen(false);
              }}
              className={\`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors \${
                selected === opt
                  ? 'bg-black/5 text-gray-900 font-semibold'
                  : 'text-gray-600 hover:bg-black/5 hover:text-gray-900'
              }\`}
            >
              <span>{opt}</span>
              {selected === opt && <Check size={13} className="text-blue-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};`,
    htmlCode: `<div class="select-wrapper">
  <label class="select-label">Active Environment</label>
  <div class="custom-select">
    <div class="select-trigger">
      <span>Production Branch</span>
      <span class="chevron">▼</span>
    </div>
    <ul class="select-menu">
      <li class="selected">Production Branch ✓</li>
      <li>Staging Preview</li>
      <li>Development Alpha</li>
      <li>Feature Sandbox</li>
    </ul>
  </div>
</div>`,
    cssCode: `.select-wrapper { width: 18rem; font-family: 'Poppins', sans-serif; }
.select-label { font-size: 0.75rem; font-weight: 600; margin-bottom: 0.375rem; display: block; }
.select-trigger { display: flex; justify-content: space-between; align-items: center; padding: 0.625rem 0.875rem; border: 1px solid #e5e7eb; border-radius: 0.75rem; font-size: 0.75rem; background: #fff; cursor: pointer; }
.select-menu { list-style: none; margin-top: 0.5rem; padding: 0.375rem; border: 1px solid #e5e7eb; border-radius: 0.75rem; background: #fff; box-shadow: 0 10px 25px rgba(0,0,0,0.08); }
.select-menu li { padding: 0.5rem 0.75rem; font-size: 0.75rem; border-radius: 0.5rem; cursor: pointer; display: flex; justify-content: space-between; }
.select-menu li:hover { background: #f3f4f6; }
.select-menu li.selected { font-weight: 600; background: #f9fafb; }`,
    reactPrompt: `Create an accessible React select dropdown component using TypeScript, Tailwind CSS, and Lucide icons.
Include smooth open/close toggles, selected state checkmark highlight, and subtle border hover transitions.`,
    htmlPrompt: `Build semantic HTML5 select dropdown markup and CSS3 styling with active and hover states.`,
    metrics: { views: 0, likes: 0, copies: 0 }
  },

  /* -------------------------------------------------------------
     4. DROPDOWNS: MEGA MENU SYSTEM
     ------------------------------------------------------------- */
  {
    slug: 'mega-menu-dropdown-system',
    title: 'Mega Menu Multi-Column Dropdown',
    description: 'Multi-column categorized dropdown menu featuring categorized resource columns and featured product release cards.',
    category: 'Dropdown',
    subcategory: 'Mega Menu',
    tags: ['Dropdown', 'Mega Menu', 'Navigation', 'Grid', 'SaaS'],
    style: 'modern',
    complexity: 'advanced',
    isPremium: true,
    isFeatured: true,
    technology: 'React + Tailwind / HTML+CSS',
    responsiveSupport: { desktop: true, tablet: true, mobile: false },
    colorTokens: {
      primary: '#111111',
      secondary: '#4F6B85',
      background: '#FFFFFF',
      foreground: '#111111',
      muted: '#6B7280',
      border: '#E5E7EB',
      accent: '#4F6B85',
      card: '#FFFFFF'
    },
    componentKey: 'MegaMenuDropdown',
    reactCode: `import React from 'react';
import { Layers, FileCode2, ArrowRight } from 'lucide-react';

export const MegaMenuDropdown: React.FC = () => {
  return (
    <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Col 1: Foundations */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase tracking-wider">
          <Layers size={14} className="text-blue-600" />
          <span>Foundations</span>
        </div>
        <ul className="space-y-2 text-xs text-gray-500">
          <li><a href="#tokens" className="hover:text-gray-900 block py-1 font-medium">Design Tokens (CSS/JS)</a></li>
          <li><a href="#typography" className="hover:text-gray-900 block py-1 font-medium">Poppins Typography Scales</a></li>
          <li><a href="#colors" className="hover:text-gray-900 block py-1 font-medium">Dynamic Color Palettes</a></li>
          <li><a href="#grid" className="hover:text-gray-900 block py-1 font-medium">Fluid Grid Layouts</a></li>
        </ul>
      </div>

      {/* Col 2: Components */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase tracking-wider">
          <FileCode2 size={14} className="text-blue-600" />
          <span>Components</span>
        </div>
        <ul className="space-y-2 text-xs text-gray-500">
          <li><a href="#dropdowns" className="hover:text-gray-900 block py-1 font-medium">Dropdowns & Overlays</a></li>
          <li><a href="#navbars" className="hover:text-gray-900 block py-1 font-medium">Responsive Navbars</a></li>
          <li><a href="#pricing" className="hover:text-gray-900 block py-1 font-medium">Pricing Matrices</a></li>
          <li><a href="#inputs" className="hover:text-gray-900 block py-1 font-medium">Form Input Groups</a></li>
        </ul>
      </div>

      {/* Col 3: Featured Release Card */}
      <div className="bg-gray-50 rounded-xl p-4 flex flex-col justify-between border border-gray-100">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-black text-white text-[10px] font-bold uppercase tracking-wider">
            New Release
          </div>
          <h4 className="font-bold text-xs text-gray-900">Iframe Viewport Sandbox</h4>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            Test actual CSS media queries and Tailwind classes in an isolated preview container.
          </p>
        </div>
        <a href="#sandbox" className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1 mt-3">
          Explore Feature <ArrowRight size={12} />
        </a>
      </div>
    </div>
  );
};`,
    htmlCode: `<div class="mega-menu">
  <div class="menu-col">
    <h4>Foundations</h4>
    <a href="#tokens">Design Tokens</a>
    <a href="#typography">Typography Scales</a>
  </div>
  <div class="menu-col">
    <h4>Components</h4>
    <a href="#dropdowns">Dropdowns</a>
    <a href="#navbars">Navbars</a>
  </div>
  <div class="menu-card">
    <span class="badge">New</span>
    <h4>Iframe Sandbox</h4>
  </div>
</div>`,
    cssCode: `.mega-menu { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; background: #fff; padding: 1.5rem; border-radius: 1rem; border: 1px solid #e5e7eb; box-shadow: 0 20px 40px rgba(0,0,0,0.06); }`,
    reactPrompt: `Design a multi-column SaaS mega menu dropdown component in React with TypeScript, Lucide icons, and Tailwind CSS.
Include categorized resource links and a featured highlight release banner with call-to-action link.`,
    htmlPrompt: `Build semantic HTML5 multi-column mega menu container with CSS grid layout and clean typography.`,
    metrics: { views: 0, likes: 0, copies: 0 }
  },

  /* -------------------------------------------------------------
     5. DROPDOWNS: USER PROFILE DROPDOWN
     ------------------------------------------------------------- */
  {
    slug: 'user-profile-account-dropdown',
    title: 'User Profile & Workspace Account Popover',
    description: 'Comprehensive user profile popover with workspace indicator, account shortcuts, token settings, and sign-out actions.',
    category: 'Dropdown',
    subcategory: 'Profile',
    tags: ['Dropdown', 'Profile', 'User', 'Workspace', 'Account'],
    style: 'modern',
    complexity: 'intermediate',
    isPremium: false,
    isFeatured: true,
    technology: 'React + Tailwind / HTML+CSS',
    responsiveSupport: { desktop: true, tablet: true, mobile: true },
    colorTokens: {
      primary: '#111111',
      secondary: '#4F6B85',
      background: '#FFFFFF',
      foreground: '#111111',
      muted: '#6B7280',
      border: '#E5E7EB',
      accent: '#4F6B85',
      card: '#FFFFFF'
    },
    componentKey: 'UserProfileDropdown',
    reactCode: `import React, { useState } from 'react';
import { ChevronDown, User, Key, Settings, LogOut } from 'lucide-react';

export const UserProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative w-80">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2 rounded-2xl bg-white border border-gray-200 shadow-xs hover:border-gray-400 transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-xl bg-black text-white font-bold text-xs flex items-center justify-center">
            AD
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-gray-900 leading-none">Alex Drake</p>
            <p className="text-[11px] text-gray-500 mt-0.5">alex@orillusive.com</p>
          </div>
        </div>
        <ChevronDown size={14} className={\`text-gray-400 transition-transform \${isOpen ? 'rotate-180' : ''}\`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl p-2 z-30 space-y-1">
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Workspace</p>
            <p className="text-xs font-bold text-gray-900 mt-0.5">Orillusive Core Team</p>
          </div>

          <div className="pt-1">
            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-gray-900 hover:bg-gray-50 transition-colors font-medium">
              <User size={14} className="text-gray-400" />
              <span>Account Profile</span>
            </button>
            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-gray-900 hover:bg-gray-50 transition-colors font-medium">
              <Key size={14} className="text-gray-400" />
              <span>API Keys & Tokens</span>
            </button>
            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-gray-900 hover:bg-gray-50 transition-colors font-medium">
              <Settings size={14} className="text-gray-400" />
              <span>Project Settings</span>
            </button>
          </div>

          <div className="border-t border-gray-100 pt-1">
            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-red-600 hover:bg-red-50 transition-colors font-semibold">
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};`,
    htmlCode: `<div class="user-popover">
  <div class="user-header">
    <div class="avatar">AD</div>
    <div><strong>Alex Drake</strong><br><small>alex@orillusive.com</small></div>
  </div>
  <div class="popover-body">
    <a href="#profile">Account Profile</a>
    <a href="#keys">API Keys</a>
    <a href="#logout" class="danger">Sign Out</a>
  </div>
</div>`,
    cssCode: `.user-popover { width: 20rem; background: #fff; border: 1px solid #e5e7eb; border-radius: 1rem; padding: 0.5rem; box-shadow: 0 10px 30px rgba(0,0,0,0.08); font-family: 'Poppins', sans-serif; }`,
    reactPrompt: `Create a professional user account avatar popover dropdown with workspace header, navigational shortcuts, and destructive sign-out action in React + Tailwind CSS.`,
    htmlPrompt: `Build semantic HTML markup for user profile popover menu with avatar initials and icon actions.`,
    metrics: { views: 0, likes: 0, copies: 0 }
  },

  /* -------------------------------------------------------------
     6. UI COMPONENTS: BUTTON GROUP CONTROLS
     ------------------------------------------------------------- */
  {
    slug: 'button-group-controls',
    title: 'Segmented Button Groups & Action Controls',
    description: 'Comprehensive set of segmented control bars, icon toggle switches, and primary-secondary action pairs.',
    category: 'UI Component',
    subcategory: 'Buttons',
    tags: ['UI Component', 'Button', 'Controls', 'Toggle', 'Action'],
    style: 'minimal',
    complexity: 'beginner',
    isPremium: false,
    isFeatured: true,
    technology: 'React + Tailwind / HTML+CSS',
    responsiveSupport: { desktop: true, tablet: true, mobile: true },
    colorTokens: {
      primary: '#111111',
      secondary: '#4F6B85',
      background: '#FFFFFF',
      foreground: '#111111',
      muted: '#6B7280',
      border: '#E5E7EB',
      accent: '#4F6B85',
      card: '#FFFFFF'
    },
    componentKey: 'ButtonGroupControls',
    reactCode: `import React, { useState } from 'react';
import { Grid, List, Plus } from 'lucide-react';

export const ButtonGroupControls: React.FC = () => {
  const [segmented, setSegmented] = useState('day');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Segmented Control */}
      <div className="p-1 bg-white border border-gray-200 rounded-2xl flex items-center gap-1 shadow-2xs">
        {['day', 'week', 'month', 'year'].map((t) => (
          <button
            key={t}
            onClick={() => setSegmented(t)}
            className={\`px-4 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all \${
              segmented === t
                ? 'bg-black text-white shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }\`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* View Toggle + Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="p-1 bg-white border border-gray-200 rounded-xl flex items-center gap-1 shadow-2xs">
          <button
            onClick={() => setView('grid')}
            className={\`p-2 rounded-lg text-xs transition-colors \${
              view === 'grid' ? 'bg-black text-white' : 'text-gray-500 hover:text-black'
            }\`}
            title="Grid View"
          >
            <Grid size={15} />
          </button>
          <button
            onClick={() => setView('list')}
            className={\`p-2 rounded-lg text-xs transition-colors \${
              view === 'list' ? 'bg-black text-white' : 'text-gray-500 hover:text-black'
            }\`}
            title="List View"
          >
            <List size={15} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-xl bg-black text-white text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm flex items-center gap-1.5">
            <Plus size={14} /> New Component
          </button>
          <button className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-900 text-xs font-semibold hover:bg-gray-50 transition-colors">
            Export TSX
          </button>
        </div>
      </div>
    </div>
  );
};`,
    htmlCode: `<div class="button-group-container">
  <div class="segmented-control">
    <button class="active">Day</button>
    <button>Week</button>
    <button>Month</button>
    <button>Year</button>
  </div>
</div>`,
    cssCode: `.segmented-control { display: inline-flex; padding: 4px; background: #fff; border: 1px solid #e5e7eb; border-radius: 1rem; }
.segmented-control button { padding: 6px 16px; border: none; background: transparent; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; cursor: pointer; border-radius: 0.75rem; }
.segmented-control button.active { background: #111; color: #fff; }`,
    reactPrompt: `Build a versatile segmented button control system and icon toggle pairs in React + Tailwind CSS.`,
    htmlPrompt: `Create semantic HTML button controls with clean CSS pill styles.`,
    metrics: { views: 0, likes: 0, copies: 0 }
  },

  /* -------------------------------------------------------------
     7. UI COMPONENTS: INPUT VALIDATION GROUP
     ------------------------------------------------------------- */
  {
    slug: 'input-validation-group',
    title: 'Interactive Form Input Validation States',
    description: 'Production input elements displaying valid success, invalid error shake, locked disabled, and icon states.',
    category: 'UI Component',
    subcategory: 'Inputs',
    tags: ['UI Component', 'Inputs', 'Form', 'Validation', 'States'],
    style: 'modern',
    complexity: 'intermediate',
    isPremium: false,
    isFeatured: true,
    technology: 'React + Tailwind / HTML+CSS',
    responsiveSupport: { desktop: true, tablet: true, mobile: true },
    colorTokens: {
      primary: '#111111',
      secondary: '#4F6B85',
      background: '#FFFFFF',
      foreground: '#111111',
      muted: '#6B7280',
      border: '#E5E7EB',
      accent: '#4F6B85',
      card: '#FFFFFF'
    },
    componentKey: 'InputValidationGroup',
    reactCode: `import React from 'react';
import { CheckCircle2, AlertCircle, Lock } from 'lucide-react';

export const InputValidationGroup: React.FC = () => {
  return (
    <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
      <h3 className="font-bold text-sm text-gray-900">Form Validation States</h3>

      {/* Valid State */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-900">Repository Name</label>
        <div className="relative">
          <input
            type="text"
            defaultValue="orillusive-design-tokens"
            className="w-full px-3 py-2 text-xs border-2 border-emerald-500 rounded-xl outline-none bg-white text-gray-900 pr-9"
          />
          <CheckCircle2 size={16} className="absolute right-3 top-2.5 text-emerald-600" />
        </div>
        <p className="text-[11px] text-emerald-600 font-medium">Repository name is valid and available.</p>
      </div>

      {/* Invalid State */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-900">Custom Token Variable</label>
        <div className="relative">
          <input
            type="text"
            defaultValue="invalid variable string"
            className="w-full px-3 py-2 text-xs border-2 border-red-500 rounded-xl outline-none bg-white text-gray-900 pr-9"
          />
          <AlertCircle size={16} className="absolute right-3 top-2.5 text-red-500" />
        </div>
        <p className="text-[11px] text-red-600 font-medium">Variables must start with --ui- and use kebab-case.</p>
      </div>

      {/* Disabled State with Prefix */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-400">Environment Host (Locked)</label>
        <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 overflow-hidden text-xs text-gray-400 px-3 py-2">
          <span className="font-mono text-[11px] text-gray-400 mr-1">https://</span>
          <input
            type="text"
            disabled
            value="api.orillusive.com"
            className="bg-transparent outline-none w-full cursor-not-allowed font-mono text-[11px] text-gray-600"
          />
          <Lock size={12} className="text-gray-400 shrink-0" />
        </div>
      </div>
    </div>
  );
};`,
    htmlCode: `<div class="input-group">
  <label>Repository Name</label>
  <input type="text" class="valid" value="orillusive-tokens" />
  <span class="msg success">Repository name available.</span>
</div>`,
    cssCode: `.input-group { margin-bottom: 1rem; font-family: 'Poppins', sans-serif; }
.input-group input.valid { border: 2px solid #10b981; border-radius: 0.75rem; padding: 0.5rem 0.75rem; width: 100%; }`,
    reactPrompt: `Build structured input validation form controls with valid, invalid error messages, and locked states in React + Tailwind CSS.`,
    htmlPrompt: `Build HTML5 input field validation layout with CSS error highlights and helper notes.`,
    metrics: { views: 0, likes: 0, copies: 0 }
  },

  /* -------------------------------------------------------------
     8. HERO: SAAS SPLIT HERO
     ------------------------------------------------------------- */
  {
    slug: 'saas-split-hero',
    title: 'SaaS Split Conversion Hero Section',
    description: 'High-conversion hero section featuring headline copy, newsletter input, and dynamic feature card.',
    category: 'Hero',
    subcategory: 'Split',
    tags: ['Hero', 'SaaS', 'Conversion', 'Split Layout', 'Marketing'],
    style: 'modern',
    complexity: 'intermediate',
    isPremium: false,
    isFeatured: true,
    technology: 'React + Tailwind / HTML+CSS',
    responsiveSupport: { desktop: true, tablet: true, mobile: true },
    colorTokens: {
      primary: '#111111',
      secondary: '#4F6B85',
      background: '#F7F7F5',
      foreground: '#111111',
      muted: '#6B7280',
      border: '#E5E7EB',
      accent: '#4F6B85',
      card: '#FFFFFF'
    },
    componentKey: 'SaaSSplitHero',
    reactCode: `import React from 'react';
import { Sparkles, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export const SaaSSplitHero: React.FC = () => {
  return (
    <section className="w-full bg-[#f7f7f5] py-16 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-xs">
            <Sparkles size={13} className="text-blue-600" />
            <span className="text-xs font-semibold text-gray-900">
              Next-Gen UI Architecture 3.0
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.08]">
            Craft interfaces that command <span className="text-blue-600">authority.</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
            A production-ready design catalog engineered for serious digital products. High contrast, precise tokens, and zero boilerplate.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-xs focus-within:border-blue-600">
              <Mail size={16} className="text-gray-400" />
              <input
                type="email"
                placeholder="name@company.com"
                className="outline-none text-sm w-full sm:w-56 bg-transparent text-gray-900"
              />
            </div>
            <button className="px-6 py-2.5 rounded-lg bg-black text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm">
              Start Free Trial <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};`,
    htmlCode: `<section class="hero-split">
  <div class="hero-content">
    <div class="pill">✦ Next-Gen UI Architecture</div>
    <h1>Craft interfaces that command authority.</h1>
    <p>A production-ready design catalog engineered for serious digital products.</p>
  </div>
</section>`,
    cssCode: `.hero-split { background: #f7f7f5; padding: 4rem 1.5rem; font-family: 'Poppins', sans-serif; }`,
    reactPrompt: `Design a high-converting split hero section in React + Tailwind CSS with responsive layout and clean typography.`,
    htmlPrompt: `Build HTML5 hero container with responsive grid columns and call-to-action form.`,
    metrics: { views: 0, likes: 0, copies: 0 }
  },

  /* -------------------------------------------------------------
     9. PRICING: TIERED PRICING CARDS
     ------------------------------------------------------------- */
  {
    slug: 'tiered-pricing-cards',
    title: 'Tiered Subscription Pricing Matrix',
    description: 'Annual/monthly switchable pricing table with 3 transparent tiers ($9, $16, $20) and detailed feature checklists.',
    category: 'Cards',
    subcategory: 'Pricing',
    tags: ['Pricing', 'Card', 'Subscription', 'Tiers', 'Matrix'],
    style: 'modern',
    complexity: 'intermediate',
    isPremium: false,
    isFeatured: true,
    technology: 'React + Tailwind / HTML+CSS',
    responsiveSupport: { desktop: true, tablet: true, mobile: true },
    colorTokens: {
      primary: '#111111',
      secondary: '#4F6B85',
      background: '#F7F7F5',
      foreground: '#111111',
      muted: '#6B7280',
      border: '#E5E7EB',
      accent: '#4F6B85',
      card: '#FFFFFF'
    },
    componentKey: 'TieredPricingCards',
    reactCode: `import React, { useState } from 'react';
import { Check } from 'lucide-react';

export const TieredPricingCards: React.FC = () => {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="w-full bg-[#f7f7f5] py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-gray-900">Transparent, predictable pricing</h2>
          <p className="text-sm text-gray-600">Upgrade or cancel anytime. All plans include full source code.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg text-gray-900">Starter</h3>
            <div className="text-3xl font-extrabold text-gray-900 my-2">\${annual ? '7' : '9'}<span className="text-xs font-normal text-gray-500"> / mo</span></div>
            <button className="w-full mt-6 py-2.5 rounded-lg border border-gray-200 text-xs font-semibold hover:bg-gray-50">Choose Starter</button>
          </div>
          <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-lg relative">
            <h3 className="font-bold text-lg text-gray-900">Pro Designer</h3>
            <div className="text-3xl font-extrabold text-gray-900 my-2">\${annual ? '13' : '16'}<span className="text-xs font-normal text-gray-500"> / mo</span></div>
            <button className="w-full mt-6 py-2.5 rounded-lg bg-black text-white text-xs font-semibold hover:opacity-90">Get Pro Access</button>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg text-gray-900">Studio & Team</h3>
            <div className="text-3xl font-extrabold text-gray-900 my-2">\${annual ? '17' : '20'}<span className="text-xs font-normal text-gray-500"> / mo</span></div>
            <button className="w-full mt-6 py-2.5 rounded-lg border border-gray-200 text-xs font-semibold hover:bg-gray-50">Choose Studio</button>
          </div>
        </div>
      </div>
    </div>
  );
};`,
    htmlCode: `<div class="pricing-matrix">
  <div class="pricing-card"><h3>Starter</h3><p class="price">$9/mo</p></div>
  <div class="pricing-card featured"><h3>Pro</h3><p class="price">$16/mo</p></div>
  <div class="pricing-card"><h3>Studio</h3><p class="price">$20/mo</p></div>
</div>`,
    cssCode: `.pricing-matrix { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; font-family: 'Poppins', sans-serif; }`,
    reactPrompt: `Create a 3-tier SaaS pricing comparison card grid with monthly/annual discount switch in React and Tailwind CSS.`,
    htmlPrompt: `Build semantic HTML pricing cards with highlighted featured middle tier.`,
    metrics: { views: 0, likes: 0, copies: 0 }
  },

  /* -------------------------------------------------------------
     10. OVERLAY: COMMAND PALETTE SEARCH
     ------------------------------------------------------------- */
  {
    slug: 'command-palette-modal',
    title: 'Keyboard Command Palette Modal (⌘K)',
    description: 'Instant spotlight search modal with quick keyboard access, category groupings, and ESC dismissal.',
    category: 'Overlay',
    subcategory: 'Search',
    tags: ['Overlay', 'Command Palette', 'Search', 'Modal', 'Keyboard'],
    style: 'minimal',
    complexity: 'advanced',
    isPremium: true,
    isFeatured: true,
    technology: 'React + Tailwind / HTML+CSS',
    responsiveSupport: { desktop: true, tablet: true, mobile: true },
    colorTokens: {
      primary: '#111111',
      secondary: '#4F6B85',
      background: '#FFFFFF',
      foreground: '#111111',
      muted: '#6B7280',
      border: '#E5E7EB',
      accent: '#4F6B85',
      card: '#FFFFFF'
    },
    componentKey: 'CommandPaletteSearch',
    reactCode: `import React, { useState } from 'react';
import { Search, FileCode2 } from 'lucide-react';

export const CommandPaletteSearch: React.FC = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="max-w-xl w-full bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden font-sans">
      <div className="p-4 border-b border-gray-200 flex items-center gap-3">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a component, category, or token..."
          className="w-full bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400"
        />
        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">ESC</span>
      </div>
    </div>
  );
};`,
    htmlCode: `<div class="command-palette">
  <input type="text" placeholder="Search components... (⌘K)" />
</div>`,
    cssCode: `.command-palette { width: 100%; max-width: 36rem; background: #fff; border-radius: 1rem; border: 1px solid #e5e7eb; box-shadow: 0 20px 50px rgba(0,0,0,0.15); }`,
    reactPrompt: `Design a keyboard-accessible ⌘K command palette modal with quick filtering and category badges in React + Tailwind.`,
    htmlPrompt: `Build HTML command search dialog box with shortcut cues.`,
    metrics: { views: 0, likes: 0, copies: 0 }
  }
];
