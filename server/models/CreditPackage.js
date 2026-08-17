import mongoose from 'mongoose';

const creditPackageSchema = new mongoose.Schema(
  {
    packageId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    credits: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      default: 'USD'
    },
    description: {
      type: String,
      default: ''
    },
    popular: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: true
    },
    sortOrder: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export const CreditPackage = mongoose.models.CreditPackage || mongoose.model('CreditPackage', creditPackageSchema);
export default CreditPackage;
