/**
 * Centralized SEO Configuration for Orillusive Website
 * 
 * All page-specific meta tags, structured data, and SEO constants
 * are defined here for consistency and easy maintenance.
 */

// ─────────────────────────────────────────────
// Base Configuration
// ─────────────────────────────────────────────

export const SEO_CONFIG = {
  siteUrl: 'https://orillusive.com',
  siteName: 'Orillusive',
  siteTagline: 'Premium Software Engineering Studio',
  defaultOgImage: '/logo.jpg',
  locale: 'en_US',
  twitterHandle: '@orillusive',
  email: 'info@orillusive.com',
} as const;

// ─────────────────────────────────────────────
// Organization Structured Data
// ─────────────────────────────────────────────

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Orillusive',
  url: SEO_CONFIG.siteUrl,
  logo: `${SEO_CONFIG.siteUrl}/logo.jpg`,
  description:
    'Orillusive is a premium Software Engineering Studio. We design and build modern software products, enterprise platforms, custom web applications, and mobile solutions.',
  email: SEO_CONFIG.email,
  foundingDate: '2021',
  areaServed: 'Worldwide',
  priceRange: '$$$$',
  sameAs: [
    'https://github.com/orillusive',
    'https://linkedin.com/company/orillusive',
    'https://twitter.com/orillusive',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'Worldwide',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: SEO_CONFIG.email,
    contactType: 'sales',
    availableLanguage: ['English'],
  },
  knowsAbout: [
    'Software Engineering',
    'Web Application Development',
    'Mobile App Development',
    'AI Solutions',
    'SaaS Development',
    'UI/UX Design',
    'Cloud Architecture',
    'Enterprise Software',
  ],
};

// ─────────────────────────────────────────────
// Website Structured Data
// ─────────────────────────────────────────────

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Orillusive',
  url: SEO_CONFIG.siteUrl,
  description:
    'Premium Software Engineering Studio — engineering digital products that matter.',
  publisher: {
    '@type': 'Organization',
    name: 'Orillusive',
    logo: {
      '@type': 'ImageObject',
      url: `${SEO_CONFIG.siteUrl}/logo.jpg`,
    },
  },
};

// ─────────────────────────────────────────────
// Per-Page SEO Metadata
// ─────────────────────────────────────────────

export interface PageSEO {
  title: string;
  description: string;
  keywords: string;
  canonicalPath: string;
  ogType?: string;
  breadcrumbName: string;
}

export const PAGE_SEO: Record<string, PageSEO> = {
  home: {
    title: 'Orillusive — Premium Software Engineering Studio | Custom Software Development',
    description:
      'Orillusive is a premium Software Engineering Studio. We design and build scalable software products — enterprise platforms, web applications, mobile apps, and AI solutions for ambitious businesses worldwide.',
    keywords:
      'software engineering studio, custom software development, web application development, mobile app development, AI solutions, SaaS development, enterprise software, UI/UX design, cloud architecture, premium software studio',
    canonicalPath: '/',
    ogType: 'website',
    breadcrumbName: 'Home',
  },

  services: {
    title: 'Engineering Services — AI, Web, Mobile, SaaS & Cloud | Orillusive',
    description:
      'Explore Orillusive\'s eight core engineering disciplines — AI Solutions, Web Applications, Mobile Apps, SaaS Development, Automation, UI/UX Design, Cloud Systems, and Maintenance. Built for growth and reliability.',
    keywords:
      'AI solutions, web application development, mobile app development, SaaS development, automation services, UI/UX design, cloud systems, software maintenance, custom software services, enterprise engineering',
    canonicalPath: '/services',
    breadcrumbName: 'Services',
  },

  projects: {
    title: 'Featured Products — Enterprise Platforms & Software | Orillusive',
    description:
      'Explore Orillusive\'s in-house products currently under active studio development — including our comprehensive Hotel Management System and enterprise digital platforms.',
    keywords:
      'hotel management system, enterprise software products, in-house development, enterprise applications, SaaS products, software platform',
    canonicalPath: '/projects',
    breadcrumbName: 'Products',
  },

  about: {
    title: 'About Orillusive — Studio Philosophy & Engineering Standards',
    description:
      'Learn about Orillusive\'s engineering philosophy — modern architecture, handcrafted UX, and direct senior access. We build long-term digital products that solve real business problems.',
    keywords:
      'about orillusive, software engineering philosophy, modern architecture, handcrafted UX, senior software architects, premium software studio, engineering standards',
    canonicalPath: '/about',
    breadcrumbName: 'About',
  },

  process: {
    title: 'Engineering Process — Discovery to Growth | Orillusive',
    description:
      'Orillusive\'s 7-step engineering process: Discovery, Strategy, Architecture, Design, Development, Launch, and Growth. A methodical roadmap designed for scalable software delivery.',
    keywords:
      'software development process, engineering methodology, discovery to launch, agile development, software delivery process, development roadmap, software architecture process',
    canonicalPath: '/process',
    breadcrumbName: 'Process',
  },

  pricing: {
    title: 'Pricing & Engagement Models — Product Sprint, Build & Studio | Orillusive',
    description:
      'Flexible studio engagement models: Product Architecture Sprint, End-to-End Product Build, and Dedicated Engineering Studio. Clear, outcome-focused pricing shaped around your business goals.',
    keywords:
      'software development pricing, engagement models, product sprint, end-to-end build, dedicated engineering team, custom software pricing, software studio pricing',
    canonicalPath: '/pricing',
    breadcrumbName: 'Pricing',
  },

  contact: {
    title: 'Contact Orillusive — Start Your Software Project Today',
    description:
      'Get in touch with Orillusive\'s senior engineering team. Book a discovery session for your next custom software product, enterprise platform, or mobile application. Response within 24 hours.',
    keywords:
      'contact orillusive, book discovery call, software project inquiry, custom software consultation, enterprise software consultation, hire software engineers',
    canonicalPath: '/contact',
    breadcrumbName: 'Contact',
  },

  privacy: {
    title: 'Privacy Policy — Orillusive',
    description: 'Privacy Policy for Orillusive website (orillusive.com) and software engineering services.',
    keywords: 'Orillusive privacy policy, software studio privacy, data protection, privacy terms',
    canonicalPath: '/privacy',
    breadcrumbName: 'Privacy Policy',
  },

  terms: {
    title: 'Terms & Conditions — Orillusive',
    description: 'Terms and Conditions for Orillusive website (orillusive.com) and software engineering services.',
    keywords: 'Orillusive terms and conditions, terms of service, user agreement, studio terms',
    canonicalPath: '/terms',
    breadcrumbName: 'Terms & Conditions',
  },
};

// ─────────────────────────────────────────────
// Services Structured Data for Google Rich Results
// ─────────────────────────────────────────────

export const SERVICES_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Orillusive Engineering Services',
  description: 'Premium software engineering services across eight core disciplines.',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Service',
        name: 'AI Solutions',
        description:
          'Intelligent systems grounded in your data, workflows, and competitive edge.',
        provider: { '@type': 'Organization', name: 'Orillusive' },
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Service',
        name: 'Web Applications',
        description:
          'Fast, resilient platforms engineered for complexity and effortless use.',
        provider: { '@type': 'Organization', name: 'Orillusive' },
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Service',
        name: 'Mobile Apps',
        description:
          'Native-quality product experiences for iOS, Android, and every screen between.',
        provider: { '@type': 'Organization', name: 'Orillusive' },
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'Service',
        name: 'SaaS Development',
        description:
          'From product architecture to scale — subscription products built to endure.',
        provider: { '@type': 'Organization', name: 'Orillusive' },
      },
    },
    {
      '@type': 'ListItem',
      position: 5,
      item: {
        '@type': 'Service',
        name: 'Automation',
        description:
          'Connected workflows that remove friction, accelerate teams, and compound output.',
        provider: { '@type': 'Organization', name: 'Orillusive' },
      },
    },
    {
      '@type': 'ListItem',
      position: 6,
      item: {
        '@type': 'Service',
        name: 'UI / UX Design',
        description:
          'Calm, clear interfaces that make sophisticated software feel instinctive.',
        provider: { '@type': 'Organization', name: 'Orillusive' },
      },
    },
    {
      '@type': 'ListItem',
      position: 7,
      item: {
        '@type': 'Service',
        name: 'Cloud Systems',
        description:
          'Secure infrastructure shaped for availability, performance, and global growth.',
        provider: { '@type': 'Organization', name: 'Orillusive' },
      },
    },
    {
      '@type': 'ListItem',
      position: 8,
      item: {
        '@type': 'Service',
        name: 'Maintenance & Support',
        description:
          'Continuous optimization, observability, and expert support after launch.',
        provider: { '@type': 'Organization', name: 'Orillusive' },
      },
    },
  ],
};

// ─────────────────────────────────────────────
// Breadcrumb Builder Helper
// ─────────────────────────────────────────────

export function buildBreadcrumbSchema(
  items: Array<{ name: string; path: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SEO_CONFIG.siteUrl}${item.path}`,
    })),
  };
}
