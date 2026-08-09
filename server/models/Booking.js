import mongoose from 'mongoose';

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
      trim: true
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
      default: null
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'confirmed'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
);

export const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
export default Booking;
