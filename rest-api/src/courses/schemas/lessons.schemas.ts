import * as mongoose from 'mongoose';

export const LessonsSchema = new mongoose.Schema(
  {
    seqNo: Number,
    description: String,
    duration: String,
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  },
);
