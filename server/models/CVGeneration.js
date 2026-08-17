import mongoose from 'mongoose';

const cvGenerationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    cvId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CV',
      required: true,
      index: true
    },
    templateId: {
      type: String,
      required: true
    },
    creditsUsed: {
      type: Number,
      required: true
    },
    version: {
      type: Number,
      default: 1
    },
    fileReference: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

export const CVGeneration = mongoose.models.CVGeneration || mongoose.model('CVGeneration', cvGenerationSchema);
export default CVGeneration;
