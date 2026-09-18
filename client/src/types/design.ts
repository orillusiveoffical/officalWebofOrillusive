export type DesignCategory =
  | 'Navbar'
  | 'Hero'
  | 'Cards'
  | 'Forms'
  | 'Pricing'
  | 'Testimonials'
  | 'Features'
  | 'Dashboard'
  | 'Authentication'
  | 'Footer'
  | 'CTA'
  | 'Tabs'
  | 'Accordions'
  | 'Modals'
  | 'Notifications'
  | 'Dropdown'
  | 'UI Component'
  | 'Overlay';

export type DesignStyle = 'minimal' | 'luxury' | 'saas' | 'editorial' | 'corporate' | 'modern';

export type DesignComplexity = 'beginner' | 'intermediate' | 'advanced';

export interface ColorTokens {
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
  accent: string;
  card: string;
}

export interface ResponsiveSupport {
  desktop: boolean;
  tablet: boolean;
  mobile: boolean;
}

export interface DesignMetrics {
  views: number;
  likes: number;
  copies: number;
}

export interface UIDesign {
  id?: string;
  _id?: string;
  slug: string;
  title: string;
  description: string;
  category: DesignCategory;
  subcategory?: string;
  tags: string[];
  style: DesignStyle;
  complexity: DesignComplexity;
  isPremium: boolean;
  isFeatured: boolean;
  isLocked?: boolean;
  technology: string;
  responsiveSupport: ResponsiveSupport;
  colorTokens: ColorTokens;
  componentKey: string;
  reactCode?: string;
  htmlCode?: string;
  cssCode?: string;
  reactPrompt?: string;
  htmlPrompt?: string;
  metrics: DesignMetrics;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategorySummary {
  category: string;
  count: number;
  subcategories: string[];
  freeCount: number;
  premiumCount: number;
}
