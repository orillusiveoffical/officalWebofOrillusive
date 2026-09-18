import mongoose from 'mongoose';

const subscriptionPlanSchema = new mongoose.Schema(
  {
    planId: {
      type: String,
      required: true,
      unique: true,
      enum: ['starter', 'pro', 'enterprise']
    },
    name: {
      type: String,
      required: true
    },
    tagline: {
      type: String,
      required: true
    },
    priceMonthly: {
      type: Number,
      required: true
    },
    priceAnnual: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    },
    isPopular: {
      type: Boolean,
      default: false
    },
    features: [
      {
        type: String,
        required: true
      }
    ],
    entitlements: {
      fullLibraryAccess: { type: Boolean, default: false },
      starterPremiumAccess: { type: Boolean, default: true },
      unlimitedSaves: { type: Boolean, default: false },
      exportCodeReact: { type: Boolean, default: true },
      exportCodeHtml: { type: Boolean, default: true },
      aiPromptsAccess: { type: Boolean, default: true },
      tokenPaletteStudio: { type: Boolean, default: false },
      earlyAccessDesigns: { type: Boolean, default: false },
      prioritySupport: { type: Boolean, default: false }
    }
  },
  {
    timestamps: true
  }
);

export const SubscriptionPlan = mongoose.models.SubscriptionPlan || mongoose.model('SubscriptionPlan', subscriptionPlanSchema);
export default SubscriptionPlan;
