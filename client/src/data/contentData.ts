import { ServiceItem, FeaturedProduct, CapabilityItem, ProcessStep, ComparisonItem, TechCategory } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'saas-development',
    title: 'SaaS Development',
    description: 'End-to-end product architecture and development for cloud subscription platforms engineered for longevity and scale.',
    iconName: 'Layers'
  },
  {
    id: 'custom-web-apps',
    title: 'Custom Web Applications',
    description: 'High-performance web applications built with modern frontend frameworks and resilient backend architectures.',
    iconName: 'Globe'
  },
  {
    id: 'mobile-app-dev',
    title: 'Mobile Application Development',
    description: 'Performant cross-platform and native mobile experiences designed for iOS and Android devices.',
    iconName: 'Smartphone'
  },
  {
    id: 'hotel-management-systems',
    title: 'Hotel Management Systems',
    description: 'Integrated operational suites built to handle reservations, guest flows, property management, and revenue logistics.',
    iconName: 'Building2'
  },
  {
    id: 'enterprise-software',
    title: 'Enterprise Software',
    description: 'Mission-critical software architectures designed for complex workflows, high reliability, and deep system integrations.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'World-class, functional design systems and interfaces crafted with extreme precision and user focus.',
    iconName: 'LayoutGrid'
  },
  {
    id: 'api-dev-integration',
    title: 'API Development & Integration',
    description: 'Secure, well-documented RESTful interfaces and robust API gateways for seamless third-party connectivity.',
    iconName: 'Workflow'
  },
  {
    id: 'software-maintenance',
    title: 'Software Maintenance & Support',
    description: 'Proactive system monitoring, continuous optimization, security updates, and long-term technical evolution.',
    iconName: 'Wrench'
  }
];

export const FEATURED_PRODUCTS_DATA: FeaturedProduct[] = [
  {
    id: 'resume-maker-cv-maker',
    title: 'Resume Maker / CV Maker',
    subtitle: 'Monetized Professional SaaS Resume Builder',
    status: 'Live SaaS Product',
    description: 'An official digital SaaS platform of Orillusive. Select ATS-friendly templates, customize colors and typography, live-preview A4 pages, and spend credits to generate print-ready PDF resumes.',
    features: [
      '6 Component Templates',
      'Live A4 Real-Time Preview',
      'Custom Accent & Font Picker',
      'Credit Monetization System',
      'Work & Education Managers',
      'Print-Ready PDF Export',
      'User Draft & CV Ledger',
      'Idempotent Payment System'
    ],
    type: 'Monetized SaaS Product',
    link: '/cv-maker',
    ctaText: 'Launch Resume Maker / CV Maker'
  },
  {
    id: 'hotel-management-system',
    title: 'Hotel Management System',
    subtitle: 'All-in-one hospitality operation & revenue platform',
    status: 'Live SaaS Product',
    description: 'A modern enterprise platform engineered for independent boutique hotels and multi-property groups to streamline reservations, staff workflows, and guest analytics.',
    features: [
      'Reservation Management',
      'Guest Management',
      'Room Management',
      'Booking Calendar',
      'Revenue Dashboard',
      'Staff Management',
      'OTA Integrations',
      'Multi-property Support'
    ],
    type: 'Enterprise Platform',
    link: 'https://dashboard.orillusive.com/login',
    ctaText: 'ACCESS PORTAL'
  }
];

export const CAPABILITIES_DATA: CapabilityItem[] = [
  {
    id: 'enterprise-software',
    title: 'Enterprise Software',
    description: 'Tailored platforms engineered for security, high throughput, and multi-user administrative controls.',
    iconName: 'Building'
  },
  {
    id: 'hotel-management-systems',
    title: 'Hotel Management Systems',
    description: 'Real-time booking engines, property management, and automated guest service workflows.',
    iconName: 'KeyRound'
  },
  {
    id: 'mobile-applications',
    title: 'Mobile Applications',
    description: 'Fluid, cross-platform mobile apps for iOS & Android built on Flutter and native standards.',
    iconName: 'Tablet'
  },
  {
    id: 'custom-saas-platforms',
    title: 'Custom SaaS Platforms',
    description: 'Scalable cloud platforms with multi-tenancy, subscription logic, and granular analytics.',
    iconName: 'Cloud'
  },
  {
    id: 'business-automation',
    title: 'Business Automation',
    description: 'Custom internal tooling, automated workflows, and data pipelines that optimize ops.',
    iconName: 'Sliders'
  },
  {
    id: 'modern-digital-products',
    title: 'Modern Digital Products',
    description: 'Handcrafted web platforms engineered with cutting-edge frontends and clean architecture.',
    iconName: 'Laptop'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Discovery',
    description: 'Understanding your business model, system requirements, and technical vision.'
  },
  {
    step: '02',
    title: 'Planning',
    description: 'Defining system architecture, data models, technology selection, and roadmap.'
  },
  {
    step: '03',
    title: 'Design',
    description: 'Crafting pixel-perfect UI/UX design systems and interactive prototypes.'
  },
  {
    step: '04',
    title: 'Development',
    description: 'Engineering resilient, scalable code using modern web and mobile frameworks.'
  },
  {
    step: '05',
    title: 'Testing',
    description: 'Rigorous automated testing, security audits, and performance tuning.'
  },
  {
    step: '06',
    title: 'Launch',
    description: 'Seamless cloud deployment, zero-downtime migrations, and production monitoring.'
  },
  {
    step: '07',
    title: 'Support & Growth',
    description: 'Long-term technical partnership, feature iterations, and continuous maintenance.'
  }
];

export const COMPARISON_DATA: ComparisonItem[] = [
  {
    feature: 'Architecture & Foundation',
    traditional: 'Outdated monoliths & bloated templates',
    orillusive: 'Modern Architecture built for long-term scale'
  },
  {
    feature: 'Scalability & Performance',
    traditional: 'Short-term patches that bottleneck under load',
    orillusive: 'Scalable Systems built to handle rapid business growth'
  },
  {
    feature: 'User Experience',
    traditional: 'Generic, clunky off-the-shelf interfaces',
    orillusive: 'Premium User Experience handcrafted for intuitiveness'
  },
  {
    feature: 'Client Partnership',
    traditional: 'Layers of account managers and slow updates',
    orillusive: 'Transparent Communication directly with senior engineers'
  },
  {
    feature: 'Product Lifecycle',
    traditional: 'Handed off at launch with zero future support',
    orillusive: 'Long-Term Support & continuous technical evolution'
  },
  {
    feature: 'Engineering Focus',
    traditional: 'Feature-factory output without business context',
    orillusive: 'Business-Focused Development targeting real outcomes'
  }
];

export const TECH_STACK: TechCategory[] = [
  {
    category: 'Frontend',
    technologies: ['React', 'Node.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript', 'GSAP']
  },
  {
    category: 'Backend',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'Prisma', 'Supabase']
  },
  {
    category: 'Mobile',
    technologies: ['Flutter']
  },
  {
    category: 'Tools',
    technologies: ['Git', 'GitHub', 'Vercel', 'REST APIs']
  }
];
