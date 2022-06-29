require('http-status-codes');
require('express-async-errors');

require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connect-db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// auth middleware
const authMiddleware = require('./middleware/auth');

const authRouter = require('./routes/auth');
const hotelRouter = require('./routes/hotels');
const roomRouter = require('./routes/rooms');
const userRouter = require('./routes/users');

app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Rental Booking API');
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/hotels', authMiddleware, hotelRouter);
app.use('/api/v1/rooms', authMiddleware, roomRouter);
app.use('/api/v1/users', authMiddleware, userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
