export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  photoUrl: string;
  showPhoto: boolean;
}

export interface ExperienceItem {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  responsibilities: string;
  achievements: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  techStack: string;
  projectUrl: string;
  githubUrl: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  credentialUrl: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: 'Basic' | 'Conversational' | 'Fluent' | 'Native';
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface CustomSectionItem {
  id: string;
  sectionTitle: string;
  content: string;
  items: string[];
}

export interface CVCustomization {
  accentColor: string;
  fontFamily: 'Inter' | 'Plus Jakarta Sans' | 'Roboto' | 'Georgia' | 'Merriweather';
  headingStyle: 'bold' | 'uppercase' | 'minimal' | 'bordered';
  fontSize: 'small' | 'medium' | 'large';
  lineSpacing: 'compact' | 'normal' | 'relaxed';
  sectionSpacing: 'compact' | 'normal' | 'spacious';
  margins: 'narrow' | 'normal' | 'wide';
}

export interface CVData {
  _id?: string;
  userId?: string;
  title: string;
  templateId: 'minimal' | 'modern' | 'executive' | 'corporate' | 'creative' | 'academic';
  personalInfo: PersonalInfo;
  summary: string;
  objective?: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  achievements: AchievementItem[];
  customSections: CustomSectionItem[];
  customization: CVCustomization;
  status: 'draft' | 'generated';
  createdAt?: string;
  updatedAt?: string;
}

export interface CreditPackage {
  packageId: string;
  name: string;
  credits: number;
  price: number;
  currency: string;
  description: string;
  popular: boolean;
  active: boolean;
  sortOrder: number;
}

export interface CreditTransaction {
  _id: string;
  userId: string;
  type: 'Credit Purchase' | 'CV Generation' | 'Promotional Credits' | 'Refund' | 'Admin Adjustment';
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  cvId?: string;
  paymentId?: string;
  description: string;
  createdAt: string;
}
