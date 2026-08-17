import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog post title is required'],
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    },
    summary: {
      type: String,
      default: ''
    },
    featuredImage: {
      type: String,
      default: ''
    },
    author: {
      type: String,
      default: 'Orillusive Engineering'
    },
    category: {
      type: String,
      default: 'Software Engineering',
      index: true
    },
    tags: [
      {
        type: String,
        trim: true
      }
    ],
    seoTitle: {
      type: String,
      default: ''
    },
    seoDescription: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['DRAFT', 'REVIEW', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED'],
      default: 'DRAFT',
      index: true
    },
    publishedAt: {
      type: Date,
      default: null
    },
    views: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema);
export default BlogPost;
