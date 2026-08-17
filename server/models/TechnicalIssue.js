import mongoose from 'mongoose';

const issueHistorySchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    action: { type: String, required: true },
    note: { type: String, default: '' },
    timestamp: { type: Date, default: Date.now }
  },
  { _id: true }
);

const technicalIssueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    errorMsg: {
      type: String,
      required: true
    },
    stackTrace: {
      type: String,
      default: ''
    },
    severity: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
      default: 'MEDIUM',
      index: true
    },
    status: {
      type: String,
      enum: ['OPEN', 'INVESTIGATING', 'IN_PROGRESS', 'RESOLVED', 'IGNORED'],
      default: 'OPEN',
      index: true
    },
    endpoint: {
      type: String,
      default: 'System API'
    },
    occurrences: {
      type: Number,
      default: 1
    },
    affectedUsers: {
      type: Number,
      default: 1
    },
    firstDetected: {
      type: Date,
      default: Date.now
    },
    lastDetected: {
      type: Date,
      default: Date.now
    },
    assignedTo: {
      type: String,
      default: 'Engineering Team'
    },
    history: [issueHistorySchema]
  },
  {
    timestamps: true
  }
);

export const TechnicalIssue = mongoose.models.TechnicalIssue || mongoose.model('TechnicalIssue', technicalIssueSchema);
export default TechnicalIssue;
