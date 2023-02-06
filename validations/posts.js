import { body } from 'express-validator';

export const postCreateValidation = [
	body('title', 'Title is required').isLength({ min: 3 }).isString(),
	body('text', 'Text is required').isLength({ min: 10 }).isString(),
	body('tags', 'Text must be in array format. Example: ["cars", "nature"]').optional().isString(),
	body('imgUrl', 'wrong url format').optional().isString()
];

