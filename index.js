import express from 'express';
import bcrypt from 'bcrypt'
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { registerValidation } from './validations/auth.js';
import { validationResult } from 'express-validator';
import UserModel from './models/User.js'

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://admin:qwqwqw@cluster0.icohgdv.mongodb.net/blog?retryWrites=true&w=majority')
  .then(() => console.log('Database OK'))
  .catch((err) => console.error('Database error', err));

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.post('/auth/login', async (req, res) => {
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
      'secret',
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
})

app.post('/auth/register', registerValidation, async (req, res) => {
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
      'secret',
      {
      expiresIn: '30d',
    })

    const { passwordHash: _, ...userData } = user._doc;

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
})

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
})
