import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    status: {
      type: String,
      enum: ['active', 'unsubscribed'],
      default: 'active'
    }
  },
  {
    timestamps: true
  }
);

export const Newsletter = mongoose.models.Newsletter || mongoose.model('Newsletter', newsletterSchema);
export default Newsletter;
