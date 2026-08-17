import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICreditPackage extends Document {
  packageId: string;
  name: string;
  credits: number;
  price: number;
  currency: string;
  description: string;
  popular: boolean;
  active: boolean;
  sortOrder: number;
}

const creditPackageSchema = new Schema<ICreditPackage>(
  {
    packageId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    credits: { type: Number, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    description: { type: String, default: '' },
    popular: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const CreditPackage: Model<ICreditPackage> =
  mongoose.models.CreditPackage || mongoose.model<ICreditPackage>('CreditPackage', creditPackageSchema);
export default CreditPackage;
