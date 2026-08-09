import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBooking extends Document {
  name: string;
  email: string;
  service: string;
  message: string;
  userId?: mongoose.Types.ObjectId | null;
  status: 'pending' | 'reviewed' | 'confirmed';
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
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
      type: Schema.Types.ObjectId,
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

export const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);
export default Booking;
