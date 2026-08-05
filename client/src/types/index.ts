export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface FeaturedProduct {
  id: string;
  title: string;
  subtitle: string;
  status: 'Currently Under Development' | 'Active Development';
  description: string;
  features: string[];
  type: string;
}

export interface CapabilityItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description?: string;
}

export interface ComparisonItem {
  feature: string;
  traditional: string;
  orillusive: string;
}

export interface TechCategory {
  category: 'Frontend' | 'Backend' | 'Mobile' | 'Tools';
  technologies: string[];
}
