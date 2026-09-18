import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
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
      default: 'client',
      index: true
    },
    status: {
      type: String,
      enum: ['active', 'suspended'],
      default: 'active',
      index: true
    },
    lastLogin: {
      type: Date,
      default: Date.now
    },
    credits: {
      type: Number,
      default: 25,
      min: [0, 'Credit balance cannot be negative']
    }
  },
  {
    timestamps: true
  }
);

// Format user response without exposing password
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
