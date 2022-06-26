const Hotel = require('../models/Hotel');
const { StatusCodes } = require('http-status-codes');
const { BadRequest, NotFoundError } = require('../errors');

const getAllHotels = async (req, res) => {
  const {
    user: { isAdmin },
  } = req;

  // if (isAdmin) {
  //   const hotels = await Hotel.find({});
  //   res.status(StatusCodes.OK).json({ nbHits: hotels.length, hotels });
  // }

  const hotels = await Hotel.find({
    createdBy: req.user.userId,
  });

  res.status(StatusCodes.OK).json({ nbHits: hotels.length, hotels });
};
const createHotel = async (req, res) => {
  const {
    user: { userId },
  } = req;
  req.body.createdBy = userId;
  req.body.updatedBy = userId;
  const hotel = await Hotel.create(req.body);

  res.status(StatusCodes.CREATED).json({ hotel });
};
const updateHotel = async (req, res) => {
  const {
    params: { id: hotelId },
    user: { userId, isAdmin },
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

  const hotel = await Hotel.findByIdAndUpdate(
    { _id: hotelId, createdBy: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!hotel) {
    throw new NotFoundError(`No hotel with id ${hotelId}`);
  }
  res.status(StatusCodes.OK).json({ msg: 'Hotel updated', hotel });
};
const deleteHotel = async (req, res) => {
  const {
    user: { userId },
    params: { id: hotelId },
  } = req;

  const hotel = await Hotel.findOneAndDelete({
    _id: hotelId,
    createdBy: userId,
  });

  if (!hotel) {
    throw new NotFoundError(`No hotel with id ${hotelId}`);
  }
  res.status(StatusCodes.OK).json({ msg: 'Hotel deleted' });
};

module.exports = {
  getAllHotels,
  createHotel,
  updateHotel,
  deleteHotel,
};
