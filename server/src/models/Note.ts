import mongoose, { Document } from 'mongoose';

export interface NoteType extends Document {
  _id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string,
  updatedBy?: string,
}

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, default: '' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdBy: { type: String, required: true, default: 'Unknown'  },
    updatedBy: { type: String },
  },
  { timestamps: true }
);

const Note = mongoose.model<NoteType>('Note', noteSchema);
export default Note;
