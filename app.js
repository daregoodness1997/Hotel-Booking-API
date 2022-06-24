require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connect-db');

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
