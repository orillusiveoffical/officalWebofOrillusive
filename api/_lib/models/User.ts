import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: 'client' | 'admin' | 'SUPER_ADMIN' | 'DEVELOPER' | 'ANALYTICS';
  status: 'active' | 'suspended';
  lastLogin: Date;
  credits: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6
    },
    role: {
      type: String,
      enum: ['client', 'admin', 'SUPER_ADMIN', 'DEVELOPER', 'ANALYTICS'],
      default: 'client'
    },
    status: {
      type: String,
      enum: ['active', 'suspended'],
      default: 'active'
    },
    lastLogin: {
      type: Date,
      default: Date.now
    },
    credits: {
      type: Number,
      default: 25,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;
