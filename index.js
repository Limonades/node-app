import express from 'express';
import mongoose from 'mongoose';
import { loginValidation, registerValidation } from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';
import register from './controlers/user/register.js';
import login from './controlers/user/login.js';
import getUser from './controlers/user/getUser.js';
import createPost from './controlers/post/createPost.js';
import { postCreateValidation } from './validations/posts.js';
import getPosts from './controlers/post/getPosts.js';
import getPost from './controlers/post/getPost.js';
import deletePost from './controlers/post/deletePost.js';
import updatePost from './controlers/post/updatePost.js';
import multer from 'multer';

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
})

const upload = multer({ storage})

app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.get('/auth/me', checkAuth, getUser);
app.post('/auth/login', loginValidation, login)
app.post('/auth/register', registerValidation, register);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`
	});
})

app.get('/posts', getPosts);
app.get('/posts/:id', getPost);
app.delete('/posts/:id', checkAuth, deletePost);
app.patch('/posts/:id', checkAuth, updatePost);
app.post('/posts', checkAuth,  postCreateValidation, createPost);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
})


