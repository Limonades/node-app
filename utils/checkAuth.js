import jwt from 'jsonwebtoken';
import { SECRET_TOKEN_TYPE } from '../constants/tokenType.js';

const checkAuth = (req, res, next) => {
	const token = (req.headers.authorization || '').replace('Bearer ', '');

	if (token) {
		try {
			const decoded = jwt.verify(token, SECRET_TOKEN_TYPE);

			req.userId = decoded._id;

			next();
		} catch(err) {
			console.log(err);

			return res.status(403).json({
				message: 'Something went wrong with token',
			})
		}
	} else {
		return res.status(403).json({
			message: 'Missing token',
		})
	}
};

export default checkAuth;
