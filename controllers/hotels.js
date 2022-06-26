const Hotel = require('../models/Hotel');
const { StatusCodes } = require('http-status-codes');
const { BadRequest, NotFoundError } = require('../errors');

const getAllHotels = async (req, res) => {
  const hotels = await Hotel.find();
  res.status(StatusCodes.OK).json({ nbHits: hotels.length, hotels });
};
const createHotel = async (req, res) => {
  const {
    user: { userId },
  } = req;
  req.body.createdBy = userId;
  const hotel = await Hotel.create(req.body);
  res.status(StatusCodes.CREATED).json({ hotel });
};
const updateHotel = async (req, res) => {
  const {
    params: { id: hotelId },
    body: { name, type, city, address, distance, description, cheapestPrice },
  } = req;

  if (
    name === '' ||
    type === '' ||
    city === '' ||
    address === '' ||
    distance === '' ||
    description === '' ||
    cheapestPrice === ''
  ) {
    throw new BadRequest('Fields cannot be empty');
  }

  const hotel = await Hotel.findByIdAndUpdate({ _id: hotelId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!hotel) {
    throw new NotFoundError(`No hotel with id ${hotelId}`);
  }
  res.status(StatusCodes.OK).json({ msg: 'Hotel updated', hotel });
};
const deleteHotel = async (req, res) => {
  const {
    params: { id: hotelId },
  } = req;

  const hotel = await Hotel.findOneAndDelete({ _id: hotelId });

  if (!hotel) {
    throw new NotFoundError(`No hotel with id ${hotelId}`);
  }
  res.status(StatusCodes.OK).json({ msg: 'Hotel deleted' });
};

module.exports = { getAllHotels, createHotel, updateHotel, deleteHotel };
