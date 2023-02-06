import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import UserModel from '../../models/User.js';
import jwt from 'jsonwebtoken';
import { SECRET_TOKEN_TYPE } from '../../constants/tokenType.js';

const register = async (req, res) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array());
		}

		const {
			email,
			fullName,
			avatarUrl,
			password
		} = req.body

		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(password, salt);

		const doc = new UserModel({
			email,
			fullName,
			avatarUrl,
			passwordHash
		})

		const user = await doc.save();

		const token = jwt.sign({
				_id: user._id,
			},
			SECRET_TOKEN_TYPE,
			{
				expiresIn: '30d',
			});

		const {passwordHash: _, ...userData} = user._doc;

		res.json({
			...userData,
			token
		})
	} catch(err) {
		console.log(err);

		res.status(500).json({
			message: 'Something went wrong'
		})
	}
}

export default register;
