import express from 'express';
import bcrypt from 'bcrypt'
import mongoose from 'mongoose';
import { registerValidation } from './validations/auth.js';
import { validationResult } from 'express-validator';
import UserModel from './models/User.js'

mongoose.connect('mongodb+srv://admin:qwqwqw@cluster0.icohgdv.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Database OK'))
  .catch((err) => console.error('Database error', err));

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.post('/auth/register', registerValidation, async (req, res) => {
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

  res.json(user)
})

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
})
