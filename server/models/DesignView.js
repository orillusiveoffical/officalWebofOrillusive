import mongoose from 'mongoose';

const designViewSchema = new mongoose.Schema(
  {
    designId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Design',
      required: true,
      index: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true
    },
    anonymousVisitorId: {
      type: String,
      default: null,
      index: true
    },
    sessionId: {
      type: String,
      default: null,
      index: true
    },
    ipHash: {
      type: String,
      default: null,
      index: true
    },
    source: {
      type: String,
      default: 'web'
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true
    }
  },
  {
    timestamps: true
  }
);

// Compound indexes for ultra-fast view deduplication lookups
designViewSchema.index({ designId: 1, userId: 1, timestamp: -1 });
designViewSchema.index({ designId: 1, anonymousVisitorId: 1, timestamp: -1 });
designViewSchema.index({ designId: 1, sessionId: 1, timestamp: -1 });
designViewSchema.index({ designId: 1, ipHash: 1, timestamp: -1 });

export const DesignView = mongoose.models.DesignView || mongoose.model('DesignView', designViewSchema);
export default DesignView;
