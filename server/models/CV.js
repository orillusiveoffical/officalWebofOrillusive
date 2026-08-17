import mongoose from 'mongoose';

const cvSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    title: {
      type: String,
      required: [true, 'CV Title is required'],
      trim: true,
      default: 'Untitled Resume'
    },
    templateId: {
      type: String,
      required: true,
      default: 'minimal'
    },
    personalInfo: {
      name: { type: String, default: '' },
      title: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      location: { type: String, default: '' },
      website: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
      photoUrl: { type: String, default: '' },
      showPhoto: { type: Boolean, default: false }
    },
    summary: { type: String, default: '' },
    objective: { type: String, default: '' },
    experience: [
      {
        id: { type: String },
        jobTitle: { type: String, default: '' },
        company: { type: String, default: '' },
        location: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        isCurrent: { type: Boolean, default: false },
        description: { type: String, default: '' },
        responsibilities: { type: String, default: '' },
        achievements: { type: String, default: '' }
      }
    ],
    education: [
      {
        id: { type: String },
        degree: { type: String, default: '' },
        institution: { type: String, default: '' },
        location: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        gpa: { type: String, default: '' },
        description: { type: String, default: '' }
      }
    ],
    skills: [
      {
        id: { type: String },
        name: { type: String, default: '' },
        level: { type: String, default: 'Intermediate' },
        category: { type: String, default: 'Technical' }
      }
    ],
    projects: [
      {
        id: { type: String },
        name: { type: String, default: '' },
        description: { type: String, default: '' },
        techStack: { type: String, default: '' },
        projectUrl: { type: String, default: '' },
        githubUrl: { type: String, default: '' }
      }
    ],
    certifications: [
      {
        id: { type: String },
        name: { type: String, default: '' },
        organization: { type: String, default: '' },
        issueDate: { type: String, default: '' },
        expiryDate: { type: String, default: '' },
        credentialId: { type: String, default: '' },
        credentialUrl: { type: String, default: '' }
      }
    ],
    languages: [
      {
        id: { type: String },
        language: { type: String, default: '' },
        proficiency: { type: String, default: 'Fluent' }
      }
    ],
    achievements: [
      {
        id: { type: String },
        title: { type: String, default: '' },
        issuer: { type: String, default: '' },
        date: { type: String, default: '' },
        description: { type: String, default: '' }
      }
    ],
    customSections: [
      {
        id: { type: String },
        sectionTitle: { type: String, default: 'Custom Section' },
        content: { type: String, default: '' },
        items: [{ type: String }]
      }
    ],
    customization: {
      accentColor: { type: String, default: '#4F6B85' },
      fontFamily: { type: String, default: 'Inter' },
      headingStyle: { type: String, default: 'bold' },
      fontSize: { type: String, default: 'medium' },
      lineSpacing: { type: String, default: 'normal' },
      sectionSpacing: { type: String, default: 'normal' },
      margins: { type: String, default: 'normal' }
    },
    status: {
      type: String,
      enum: ['draft', 'generated'],
      default: 'draft'
    }
  },
  {
    timestamps: true
  }
);

export const CV = mongoose.models.CV || mongoose.model('CV', cvSchema);
export default CV;
