import mongoose from 'mongoose';

const designSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },
    title: {
      type: String,
      required: [true, 'Design title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Design description is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      index: true,
      trim: true
    },
    subcategory: {
      type: String,
      trim: true,
      index: true
    },
    tags: [
      {
        type: String,
        trim: true,
        index: true
      }
    ],
    style: {
      type: String,
      enum: ['minimal', 'luxury', 'saas', 'editorial', 'corporate', 'modern'],
      default: 'saas',
      index: true
    },
    complexity: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'intermediate'
    },
    isPremium: {
      type: Boolean,
      default: false,
      index: true
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true
    },
    technology: {
      type: String,
      default: 'React + Tailwind / HTML+CSS'
    },
    responsiveSupport: {
      desktop: { type: Boolean, default: true },
      tablet: { type: Boolean, default: true },
      mobile: { type: Boolean, default: true }
    },
    colorTokens: {
      primary: { type: String, default: '#111111' },
      secondary: { type: String, default: '#4F6B85' },
      background: { type: String, default: '#F7F7F5' },
      foreground: { type: String, default: '#111111' },
      muted: { type: String, default: '#6B7280' },
      border: { type: String, default: '#E5E7EB' },
      accent: { type: String, default: '#4F6B85' },
      card: { type: String, default: '#FFFFFF' }
    },
    componentKey: {
      type: String,
      required: [true, 'Component key is required for interactive preview renderer']
    },
    reactCode: {
      type: String,
      required: [true, 'React code implementation is required']
    },
    htmlCode: {
      type: String,
      required: [true, 'HTML code implementation is required']
    },
    cssCode: {
      type: String,
      default: ''
    },
    reactPrompt: {
      type: String,
      required: [true, 'Authentic React AI generation prompt is required']
    },
    htmlPrompt: {
      type: String,
      required: [true, 'Authentic HTML/CSS AI generation prompt is required']
    },
    metrics: {
      views: { type: Number, default: 0 },
      likes: { type: Number, default: 0 },
      copies: { type: Number, default: 0 }
    }
  },
  {
    timestamps: true
  }
);

// Text search index for title, description, category, tags, and style
designSchema.index({
  title: 'text',
  description: 'text',
  category: 'text',
  subcategory: 'text',
  tags: 'text',
  style: 'text'
});

export const Design = mongoose.models.Design || mongoose.model('Design', designSchema);
export default Design;
