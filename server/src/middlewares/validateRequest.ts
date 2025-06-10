import { RequestHandler } from 'express';
import type { ObjectSchema } from 'joi';

export const validateRequest = (schema: ObjectSchema): RequestHandler => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const messages = error.details.map(d => d.message).join(', ');
      res.status(400).json({ message: messages });
      return;
    }
    next();
  };
};
