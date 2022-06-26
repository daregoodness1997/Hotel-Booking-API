const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Enter a hotel name'],
      unique: true,
    },
    type: {
      type: String,
      required: [true, 'Enter a type'],
    },
    city: {
      type: String,
      required: [true, 'Enter a city'],
    },
    address: {
      type: String,
      required: [true, 'Enter an address'],
    },
    distance: {
      type: String,
      required: [true, 'Enter a distance'],
    },
    photos: {
      type: [String],
    },
    description: {
      type: String,
      required: [true, 'Enter a description'],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    rooms: {
      type: [String],
    },
    cheapestPrice: {
      type: String,
      required: [true, 'Enter cheapest price'],
    },
    featured: {
      type: Boolean,
      default: false,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hotel', HotelSchema);
