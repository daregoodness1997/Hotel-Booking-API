const mongoose = require('mongoose');

const connectDB = async connection_url => {
  const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    mongoose.connect(connection_url, mongooseOptions);
  } catch (err) {
    console.log('Database not connected ' + err);
  }

  mongoose.connection.on('disconnected', () => {
    console.log('Database disconnected');
  });
  mongoose.connection.on('connected', () => {
    console.log('Database connected');
  });
};

module.exports = connectDB;
