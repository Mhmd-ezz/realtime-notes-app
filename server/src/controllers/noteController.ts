import { RequestHandler } from 'express';
import * as noteService from '../services/noteService';
import { getIO } from '../socket';
import { getUserFromRequest } from '../utils/authUtils';

export const getNotes: RequestHandler = async (req, res) => {
  const userId = getUserFromRequest(req);
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 12;
  const skip = (page - 1) * limit;

  const result = await noteService.getPaginatedNotes(page, limit);

  res.json({
    data: result.notes,
    message: 'Notes retrieved successfully',
    pagination: result.pagination,
  });
};

export const createNote: RequestHandler = async (req, res) => {
  const user = getUserFromRequest(req);
  if (!user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).json({ message: 'Title and content are required' });
    return;
  }

  const note = await noteService.createNewNote(title, content, user);

  getIO().emit('note:created', note);
  res.status(201).json({ note });
};

export const updateNote: RequestHandler = async (req, res) => {
  const user = getUserFromRequest(req);
  if (!user || !user.name) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const { title, content } = req.body;

  const note = await noteService.updateNoteById(req.params.id, title, content, user.name); 
  if (!note) {
    res.status(500).json({ message: 'Note not found' });
    return;
  }

  getIO().emit('note:updated', note);
  res.json({ data: note, message: 'Note updated' });
};

export const deleteNote: RequestHandler = async (req, res) => {
  const user = getUserFromRequest(req);
  if (!user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const deleted = await noteService.deleteNote(req.params.id);
  if (!deleted) {
    res.status(404).json({ message: 'Note not found' });
    return;
  }

  getIO().emit('note:deleted', req.params.id);
  res.status(204).send();
};
