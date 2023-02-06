import express from 'express';
import mongoose from 'mongoose';
import { registerValidation } from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';
import register from './controlers/userControllers/register.js';
import login from './controlers/userControllers/login.js';
import getUser from './controlers/userControllers/getUser.js';

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://admin:qwqwqw@cluster0.icohgdv.mongodb.net/blog?retryWrites=true&w=majority')
  .then(() => console.log('Database OK'))
  .catch((err) => console.error('Database error', err));

const app = express();

app.use(express.json())

app.get('/auth/me', checkAuth, getUser);

app.post('/auth/login', login)
app.post('/auth/register', registerValidation, register);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
})

