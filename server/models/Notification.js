import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['INQUIRY', 'PAYMENT', 'ISSUE', 'SUBSCRIBER', 'SYSTEM'],
      default: 'SYSTEM'
    },
    roleTarget: {
      type: String,
      enum: ['ALL', 'SUPER_ADMIN', 'DEVELOPER', 'ANALYTICS'],
      default: 'ALL'
    },
    read: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
export default Notification;
