require('http-status-codes');
require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connect-db');
const authRouter = require('./routes/auth');

app.use('/api/v1/auth', authRouter);

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
