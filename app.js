require('http-status-codes');
require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connect-db');
const authRouter = require('./routes/auth');
const hotelRouter = require('./routes/hotels');
const roomRouter = require('./routes/rooms');
const userRouter = require('./routes/users');

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/hotels', hotelRouter);
app.use('/api/v1/rooms', roomRouter);
app.use('/api/v1/users', userRouter);

const PORT = process.env.PORT || 6500;
const start = async () => {
  try {
    app.listen(PORT, console.log('Server started at port 7000'));

    await connectDB(process.env.MONGO_URL);
  } catch (err) {
    console.error(err);
  }
};

start();
