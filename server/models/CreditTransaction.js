import mongoose from 'mongoose';

const creditTransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    type: {
      type: String,
      enum: ['Credit Purchase', 'CV Generation', 'Promotional Credits', 'Refund', 'Admin Adjustment'],
      required: true,
      index: true
    },
    amount: {
      type: Number,
      required: true
    },
    balanceBefore: {
      type: Number,
      required: true
    },
    balanceAfter: {
      type: Number,
      required: true
    },
    cvId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CV',
      default: null
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
      default: null
    },
    description: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

export const CreditTransaction = mongoose.models.CreditTransaction || mongoose.model('CreditTransaction', creditTransactionSchema);
export default CreditTransaction;
