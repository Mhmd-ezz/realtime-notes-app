import * as repo from '../repositories/noteRepository';

export const getPaginatedNotes = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const [notes, total] = await Promise.all([
    repo.findNotes(skip, limit),
    repo.countNotes()
  ]);

  return {
    notes,
    pagination: {
      page,
      limit,
      totalItems: total,
      totalPages: Math.ceil(total / limit),
    }
  };
};

export const createNewNote = async (title: string, content: string, user: any) => {
  return repo.createNote({
    title,
    content,
    userId: user.userId,
    createdBy: user.name,
    updatedBy: user.name,
  });
};

export const updateNoteById = async (id: string, title: string, content: string, updatedBy: string) => {
  const note = await repo.findNoteById(id);
  if (!note) return null;

  note.title = title;
  note.content = content;
  note.updatedBy = updatedBy;

  await note.save();
  return note;
};

export const deleteNote = async (id: string) => {
  return repo.deleteNoteById(id);
};
