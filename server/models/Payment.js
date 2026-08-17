import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    packageId: {
      type: String,
      required: true
    },
    credits: {
      type: Number,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    },
    paymentProvider: {
      type: String,
      default: 'stripe',
      enum: ['stripe', 'paypal', 'orillusive_pay', 'system']
    },
    transactionId: {
      type: String,
      required: true,
      unique: true
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Processing', 'Completed', 'Failed', 'Refunded'],
      default: 'Pending',
      index: true
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  {
    timestamps: true
  }
);

export const Payment = mongoose.models.Payment || mongoose.model('Payment', paymentSchema);
export default Payment;
