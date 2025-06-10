import Note from '../models/Note';

export const findNotes = (skip: number, limit: number) => {
  return Note.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
};

export const countNotes = () => {
  return Note.countDocuments();
};

export const createNote = (data: any) => {
  return Note.create(data);
};

export const findNoteById = (id: string) => {
  return Note.findById(id);
};

export const deleteNoteById = (id: string) => {
  return Note.findByIdAndDelete(id);
};
