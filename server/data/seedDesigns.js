import { connectToDatabase } from '../db/mongodb.js';
import Design from '../models/Design.js';

export const SEED_DESIGNS = [
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
    </header>
  );
};`,
    htmlCode: `<header class="navbar"><div class="nav-container"><div class="brand"><div class="logo-box">O</div><span class="brand-name">Orillusive</span></div></div></header>`,
    cssCode: `.navbar { width: 100%; background: #ffffff; border-bottom: 1px solid #e5e7eb; padding: 1rem 1.5rem; }`,
    reactPrompt: `Create a clean, production-ready React navbar component called MinimalNavbar using TypeScript, Tailwind CSS, and Lucide React icons.`,
    htmlPrompt: `Build a semantic HTML5 and CSS3 minimal navigation bar component.`,
    metrics: { views: 0, likes: 0, copies: 0 }
  },
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
import { ChevronDown, ArrowRight } from 'lucide-react';

export const SaaSNavbar: React.FC = () => {
  return <header className="w-full bg-white border-b border-gray-200 px-6 py-3.5">...</header>;
};`,
    htmlCode: `<header class="saas-nav"></header>`,
    cssCode: `.saas-nav { width: 100%; }`,
    reactPrompt: `Design an enterprise SaaS top navbar with interactive popup dropdown menu in React and Tailwind CSS.`,
    htmlPrompt: `Build a clean semantic SaaS header markup with version badge and product links.`,
    metrics: { views: 0, likes: 0, copies: 0 }
  },
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

  const options = ['Production Branch', 'Staging Preview', 'Development Alpha', 'Feature Sandbox'];

  return (
    <div className="relative w-72">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs">
        <span>{selected}</span>
        <ChevronDown size={14} />
      </button>
    </div>
  );
};`,
    htmlCode: `<div class="select"></div>`,
    cssCode: `.select { width: 18rem; }`,
    reactPrompt: `Create an accessible React select dropdown component using TypeScript and Tailwind CSS.`,
    htmlPrompt: `Build semantic HTML5 select dropdown markup and CSS3 styling.`,
    metrics: { views: 0, likes: 0, copies: 0 }
  },
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
  return <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl grid grid-cols-3 gap-6">...</div>;
};`,
    htmlCode: `<div class="mega-menu"></div>`,
    cssCode: `.mega-menu { display: grid; }`,
    reactPrompt: `Design a multi-column SaaS mega menu dropdown component in React with TypeScript, Lucide icons, and Tailwind CSS.`,
    htmlPrompt: `Build semantic HTML5 multi-column mega menu container with CSS grid.`,
    metrics: { views: 0, likes: 0, copies: 0 }
  },
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

export const ButtonGroupControls: React.FC = () => {
  const [segmented, setSegmented] = useState('day');
  return <div className="flex gap-2">...</div>;
};`,
    htmlCode: `<div class="btn-group"></div>`,
    cssCode: `.btn-group { display: flex; }`,
    reactPrompt: `Build a versatile segmented button control system and icon toggle pairs in React + Tailwind CSS.`,
    htmlPrompt: `Create semantic HTML button controls with clean CSS pill styles.`,
    metrics: { views: 0, likes: 0, copies: 0 }
  },
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

export const InputValidationGroup: React.FC = () => {
  return <div className="space-y-4">...</div>;
};`,
    htmlCode: `<div class="inputs"></div>`,
    cssCode: `.inputs { display: block; }`,
    reactPrompt: `Build structured input validation form controls with valid, invalid error messages, and locked states in React + Tailwind CSS.`,
    htmlPrompt: `Build HTML5 input field validation layout with CSS error highlights.`,
    metrics: { views: 0, likes: 0, copies: 0 }
  }
];

export const seedDesignsDatabase = async () => {
  try {
    await connectToDatabase();
    const existingCount = await Design.countDocuments();
    if (existingCount === 0) {
      await Design.insertMany(SEED_DESIGNS);
      console.log(`⚡ [SEEDED DESIGNS] Successfully seeded ${SEED_DESIGNS.length} initial UI designs.`);
    }
  } catch (err) {
    console.warn('⚠️ Design database seed deferred:', err.message);
  }
};
