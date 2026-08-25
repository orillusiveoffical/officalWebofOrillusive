import mongoose from 'mongoose';

const responseHistorySchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    authorEmail: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['REPLY', 'NOTE', 'SYSTEM'], default: 'REPLY' },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: true }
);

const contactInquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    company: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    service: {
      type: String,
      default: 'General Inquiry'
    },
    message: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: [
        'NEW',
        'PENDING',
        'CONTACTED',
        'IN_DISCUSSION',
        'CALL_SCHEDULED',
        'COMPLETED',
        'CONVERTED',
        'CANCELLED',
        'SPAM'
      ],
      default: 'NEW',
      index: true
    },
    assignedTo: {
      type: String,
      default: 'Unassigned'
    },
    internalNotes: {
      type: String,
      default: ''
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      default: null,
      index: true
    },
    responseHistory: [responseHistorySchema],
    source: {
      type: String,
      default: 'Website Contact Form'
    }
  },
  {
    timestamps: true
  }
);

export const ContactInquiry = mongoose.models.ContactInquiry || mongoose.model('ContactInquiry', contactInquirySchema);
export default ContactInquiry;
