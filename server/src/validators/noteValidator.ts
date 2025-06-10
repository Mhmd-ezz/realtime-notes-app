import Joi from 'joi';

export const noteSchema = Joi.object({
  title: Joi.string().min(1).max(200).required(),
  content: Joi.string().min(1).required(),
});
