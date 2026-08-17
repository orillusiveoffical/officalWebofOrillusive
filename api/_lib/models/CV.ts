import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICV extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  templateId: string;
  personalInfo: any;
  summary: string;
  objective?: string;
  experience: any[];
  education: any[];
  skills: any[];
  projects: any[];
  certifications: any[];
  languages: any[];
  achievements: any[];
  customSections: any[];
  customization: any;
  status: 'draft' | 'generated';
  createdAt: Date;
  updatedAt: Date;
}

const cvSchema = new Schema<ICV>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, default: 'Untitled Resume' },
    templateId: { type: String, required: true, default: 'minimal' },
    personalInfo: { type: Schema.Types.Mixed, default: {} },
    summary: { type: String, default: '' },
    objective: { type: String, default: '' },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    achievements: [],
    customSections: [],
    customization: { type: Schema.Types.Mixed, default: {} },
    status: { type: String, enum: ['draft', 'generated'], default: 'draft' }
  },
  { timestamps: true }
);

export const CV: Model<ICV> = mongoose.models.CV || mongoose.model<ICV>('CV', cvSchema);
export default CV;
