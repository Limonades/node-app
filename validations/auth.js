import { body } from 'express-validator';

export const loginValidation = [
	body('email', 'wrong email format').isEmail(),
	body('password', 'short password').isLength({ min: 5 }),
];

export const registerValidation = [
  body('email', 'wrong email format').isEmail(),
  body('password', 'short password').isLength({ min: 5 }),
  body('fullName', 'short name').isLength({ min: 3 }),
  body('avatarUrl', 'wrong url format').optional().isURL(),
];

