import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import { loginValidation, registerValidation } from './validations/auth.js';
import { postCreateValidation } from './validations/posts.js';
import { UserController, PostController } from './controlers/index.js'
import { checkAuth, handleValidationErrors } from './utils/index.js';

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://admin:qwqwqw@cluster0.icohgdv.mongodb.net/blog?retryWrites=true&w=majority')
  .then(() => console.log('Database OK'))
  .catch((err) => console.error('Database error', err));

const app = express();

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads')
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname)
	},
});

const upload = multer({ storage });

app.use(express.json())
app.use('/uploads', express.static('uploads'));

app.get('/auth/me', checkAuth, UserController.getUser);
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`
	});
})

app.get('/posts', PostController.getPosts);
app.get('/posts/:id', PostController.getPost);
app.delete('/posts/:id', checkAuth, PostController.deletePost);
app.patch('/posts/:id', checkAuth, handleValidationErrors,  PostController.updatePost);
app.post('/posts', checkAuth,  postCreateValidation, handleValidationErrors, PostController.createPost);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
})


