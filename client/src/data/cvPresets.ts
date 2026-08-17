import { CVData } from '../types/cv';

export interface TemplateDefinition {
  id: 'minimal' | 'modern' | 'executive' | 'corporate' | 'creative' | 'academic';
  name: string;
  category: 'Minimal' | 'Modern' | 'Executive' | 'Corporate' | 'Creative' | 'Academic';
  description: string;
  popular?: boolean;
  atsFriendly: boolean;
  defaultAccent: string;
}

export const CV_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'minimal',
    name: 'Studio Minimal',
    category: 'Minimal',
    description: 'Clean typography, ample whitespace, and focused single-column structure.',
    popular: true,
    atsFriendly: true,
    defaultAccent: '#4F6B85'
  },
  {
    id: 'modern',
    name: 'Modern Executive',
    category: 'Modern',
    description: 'Sleek left accent bar with high-impact section dividers.',
    popular: true,
    atsFriendly: true,
    defaultAccent: '#2C3E50'
  },
  {
    id: 'executive',
    name: 'Corporate Leader',
    category: 'Executive',
    description: 'Commanding header design suited for senior management and directors.',
    atsFriendly: true,
    defaultAccent: '#1B365D'
  },
  {
    id: 'corporate',
    name: 'Enterprise Grid',
    category: 'Corporate',
    description: 'Structured multi-column layout for technical specialists and engineers.',
    atsFriendly: true,
    defaultAccent: '#111111'
  },
  {
    id: 'creative',
    name: 'Creative Portfolio',
    category: 'Creative',
    description: 'Vibrant accent banner and badge skill chips for designers and product leaders.',
    atsFriendly: false,
    defaultAccent: '#5B1E31'
  },
  {
    id: 'academic',
    name: 'Academic Scholar',
    category: 'Academic',
    description: 'Traditional serif styling designed for researchers, faculty, and publications.',
    atsFriendly: true,
    defaultAccent: '#1E4D2B'
  }
];

export const COLOR_PRESETS = [
  { name: 'Orillusive Blue', hex: '#4F6B85' },
  { name: 'Charcoal', hex: '#2C3E50' },
  { name: 'Navy', hex: '#1B365D' },
  { name: 'Dark Brown', hex: '#2C1E16' },
  { name: 'Forest', hex: '#1E4D2B' },
  { name: 'Burgundy', hex: '#5B1E31' },
  { name: 'Slate', hex: '#475569' },
  { name: 'Black', hex: '#111111' }
];

export const DEFAULT_INITIAL_CV: CVData = {
  title: 'My Professional Resume',
  templateId: 'minimal',
  personalInfo: {
    name: 'Alex Mercer',
    title: 'Senior Software Engineer',
    email: 'alex.mercer@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    website: 'https://alexmercer.dev',
    linkedin: 'linkedin.com/in/alexmercer',
    github: 'github.com/alexmercer',
    photoUrl: '',
    showPhoto: false
  },
  summary: 'Architectural Full-Stack Software Engineer with 6+ years of experience designing high-throughput web applications, cloud microservices, and client platforms. Proven track record leading engineering teams and delivering reliable digital products.',
  objective: 'Seeking a Lead Software Engineer position to build scalable SaaS infrastructure.',
  experience: [
    {
      id: 'exp-1',
      jobTitle: 'Senior Full Stack Engineer',
      company: 'Apex Digital Solutions',
      location: 'San Francisco, CA',
      startDate: 'Jan 2022',
      endDate: 'Present',
      isCurrent: true,
      description: 'Lead engineer driving core platform architecture and frontend user experience.',
      responsibilities: 'Architected distributed REST API endpoints reducing system latency by 35%. Mentored 4 junior engineers and implemented automated test pipelines.',
      achievements: 'Engineered real-time analytics engine handling 2M daily events.'
    },
    {
      id: 'exp-2',
      jobTitle: 'Software Developer',
      company: 'Vanguard Systems',
      location: 'Austin, TX',
      startDate: 'Jun 2019',
      endDate: 'Dec 2021',
      isCurrent: false,
      description: 'Built customer-facing React web applications and Node.js backend integrations.',
      responsibilities: 'Developed responsive dashboard components and integrated stripe payment gateway.',
      achievements: 'Received Studio Excellence Award for Q3 2020.'
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.S. in Computer Science',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: 'Sep 2015',
      endDate: 'May 2019',
      gpa: '3.8 / 4.0',
      description: 'Focused on Distributed Systems, Software Engineering, and Algorithms.'
    }
  ],
  skills: [
    { id: 'sk-1', name: 'TypeScript & JavaScript', level: 'Expert', category: 'Frontend' },
    { id: 'sk-2', name: 'React.js & Next.js', level: 'Expert', category: 'Frontend' },
    { id: 'sk-3', name: 'Node.js & Express', level: 'Advanced', category: 'Backend' },
    { id: 'sk-4', name: 'MongoDB & PostgreSQL', level: 'Advanced', category: 'Database' },
    { id: 'sk-5', name: 'System Architecture & Docker', level: 'Intermediate', category: 'DevOps' }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Cloud Metrics Dashboard',
      description: 'Real-time observability platform for monitoring microservice throughput.',
      techStack: 'React, Node.js, WebSockets, Tailwind CSS',
      projectUrl: 'https://metrics-demo.example.com',
      githubUrl: 'https://github.com/alexmercer/cloud-metrics'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect',
      organization: 'Amazon Web Services',
      issueDate: 'Mar 2023',
      expiryDate: 'Mar 2026',
      credentialId: 'AWS-992019',
      credentialUrl: 'https://aws.amazon.com/verify'
    }
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Native' },
    { id: 'lang-2', language: 'Spanish', proficiency: 'Conversational' }
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Hackathon 1st Place Winner',
      issuer: 'Bay Area Developer Summit',
      date: 'Oct 2022',
      description: 'Built AI-powered document processing tool in 48 hours.'
    }
  ],
  customSections: [],
  customization: {
    accentColor: '#4F6B85',
    fontFamily: 'Inter',
    headingStyle: 'bold',
    fontSize: 'medium',
    lineSpacing: 'normal',
    sectionSpacing: 'normal',
    margins: 'normal'
  },
  status: 'draft'
};
