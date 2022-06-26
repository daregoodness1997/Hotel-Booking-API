const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Enter a room'],
      unique: true,
    },

    price: {
      type: Number,
      required: [true, 'Enter a price'],
    },
    maxPeople: {
      type: Number,
      required: [true, 'Provide maximum people in a room'],
    },
    description: {
      type: String,
      required: [true, 'Enter a description'],
    },
    hotel: {
      type: mongoose.Types.ObjectId,
      ref: 'Hotel',
      required: [true, 'Please provide a hotel'],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a user'],
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a user'],
    },
    roomNumbers: [{ number: Number, unavailabeDates: { type: [Date] } }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Room', RoomSchema);
