import mongoose from 'mongoose';

const newsletterCampaignSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: [true, 'Campaign subject is required'],
      trim: true
    },
    previewText: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      required: true
    },
    sender: {
      type: String,
      default: 'Orillusive Studio <info@orillusive.com>'
    },
    recipientSegment: {
      type: String,
      default: 'ALL_SUBSCRIBERS'
    },
    status: {
      type: String,
      enum: ['DRAFT', 'SCHEDULED', 'SENDING', 'SENT', 'FAILED'],
      default: 'DRAFT',
      index: true
    },
    scheduledFor: {
      type: Date,
      default: null
    },
    sentAt: {
      type: Date,
      default: null
    },
    stats: {
      recipients: { type: Number, default: 0 },
      delivered: { type: Number, default: 0 },
      opened: { type: Number, default: 0 },
      clicked: { type: Number, default: 0 },
      failed: { type: Number, default: 0 }
    }
  },
  {
    timestamps: true
  }
);

export const NewsletterCampaign = mongoose.models.NewsletterCampaign || mongoose.model('NewsletterCampaign', newsletterCampaignSchema);
export default NewsletterCampaign;
