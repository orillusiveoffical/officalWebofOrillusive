import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICreditTransaction extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'Credit Purchase' | 'CV Generation' | 'Promotional Credits' | 'Refund' | 'Admin Adjustment';
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  cvId?: mongoose.Types.ObjectId;
  paymentId?: mongoose.Types.ObjectId;
  description: string;
  createdAt: Date;
}

const creditTransactionSchema = new Schema<ICreditTransaction>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: {
      type: String,
      enum: ['Credit Purchase', 'CV Generation', 'Promotional Credits', 'Refund', 'Admin Adjustment'],
      required: true
    },
    amount: { type: Number, required: true },
    balanceBefore: { type: Number, required: true },
    balanceAfter: { type: Number, required: true },
    cvId: { type: Schema.Types.ObjectId, ref: 'CV', default: null },
    paymentId: { type: Schema.Types.ObjectId, ref: 'Payment', default: null },
    description: { type: String, default: '' }
  },
  { timestamps: true }
);

export const CreditTransaction: Model<ICreditTransaction> =
  mongoose.models.CreditTransaction || mongoose.model<ICreditTransaction>('CreditTransaction', creditTransactionSchema);
export default CreditTransaction;
