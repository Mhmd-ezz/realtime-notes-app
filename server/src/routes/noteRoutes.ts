import express from 'express';
import * as noteController from '../controllers/noteController';
import { requireAuth } from '../middlewares/authMiddleware';
import { validateRequest } from '../middlewares/validateRequest';
import { noteSchema } from '../validators/noteValidator';

const router = express.Router();

router.get('/', requireAuth, noteController.getNotes);
router.post('/', requireAuth, validateRequest(noteSchema), noteController.createNote);
router.put('/:id', requireAuth, validateRequest(noteSchema), noteController.updateNote);
router.delete('/:id', requireAuth, noteController.deleteNote);

export default router;
