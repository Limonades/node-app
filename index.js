import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://admin:qwqwqw@cluster0.icohgdv.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Database OK'))
  .catch((err) => console.error('Database error', err));

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.post('/auth/login', (req, res) => {
  console.log(req.body);

  const token = jwt.sign({
    email: req.body.email,
    fullName: 'Vlad'
  }, 'test-token');

  res.json({
    success: true,
    token
  });
})

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
})