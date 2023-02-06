import UserModel from '../../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET_TOKEN_TYPE } from '../../constants/tokenType.js';

const login = async (req, res) => {
	try {
		const user = await UserModel.findOne({
			email: req.body.email,
		})

		if (!user) {
			return req.status(404).json({
				message: 'User not found'
			})
		}

		const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);

		if (!isValidPassword) {
			return res.status(404).json({
				message: 'Wrong password',
			});
		}

		const token = jwt.sign({
				_id: user._id,
			},
			SECRET_TOKEN_TYPE,
			{
				expiresIn: '30d',
			})

		const { passwordHash, ...userData } = user._doc;

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

export default login;
