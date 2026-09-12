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

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      lowercase: true,
      trim: true,
      index: true
    },
    service: {
      type: String,
      default: 'General Software Consultation'
    },
    message: {
      type: String,
      required: [true, 'Project brief is required'],
      trim: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true
    },
    inquiryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ContactInquiry',
      default: null,
      index: true
    },
    status: {
      type: String,
      enum: [
        'pending',
        'reviewed',
        'contacted',
        'in_discussion',
        'call_scheduled',
        'confirmed',
        'completed',
        'converted',
        'cancelled',
        'NEW',
        'PENDING',
        'CONTACTED',
        'IN_DISCUSSION',
        'CALL_SCHEDULED',
        'CONFIRMED',
        'COMPLETED',
        'CONVERTED',
        'CANCELLED'
      ],
      default: 'pending',
      index: true
    },
    adminNotes: {
      type: String,
      default: ''
    },
    responseHistory: [responseHistorySchema]
  },
  {
    timestamps: true
  }
);

export const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
export default Booking;

