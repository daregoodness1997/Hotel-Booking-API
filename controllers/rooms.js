const Room = require('../models/Room');
const Hotel = require('../models/Hotel');
const { StatusCodes } = require('http-status-codes');
const { BadRequest, NotFoundError } = require('../errors');

const getAllRooms = async (req, res) => {
  const rooms = await Room.find();

  res.status(StatusCodes.OK).json({ nbHits: rooms.length, rooms });
};
const createRoom = async (req, res) => {
  const {
    params: { id: hotelId },
    user: { userId },
  } = req;
  req.body.createdBy = userId;
  req.body.updatedBy = userId;
  const room = await Room.create({ ...req.body, hotel: hotelId });
  const hotel = await Hotel.findByIdAndUpdate(
    hotelId,
    {
      $push: { rooms: room._id },
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.CREATED).json({ room, hotel });
};
const updateRoom = async (req, res) => {
  const {
    user: { userId },
    body: { title, price, maxPeople, description, hotel },
    params: { id: roomId },
  } = req;

  if (
    title === '' ||
    price === '' ||
    maxPeople === '' ||
    description === '' ||
    hotel === ''
  ) {
    throw new BadRequest('Fields cannot be empty');
  }

  const room = await Room.findByIdAndUpdate(
    { _id: roomId, createdBy: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!room) {
    throw new NotFoundError(`No room with id ${roomId}`);
  }
  res.status(StatusCodes.OK).json({ msg: 'Room information updated', room });
};

const deleteRoom = async (req, res) => {
  const {
    user: { userId },
    params: { id: roomId, hotel: hotelId },
  } = req;


  // const hotel = await Hotel.find({ _id: hotelId });

  const room = await Room.findByIdAndDelete({ _id: roomId, createdBy: userId });

  if (!room) {
    throw new NotFoundError(`No room with id ${roomId}`);
  }

  const hotel = await Hotel.findByIdAndUpdate(
    hotelId,
    {
      $pull: { rooms: roomId },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ msg: 'Room deleted', hotel });
};

const updateRoomAvailability = async (req, res) => {
  res.status(200).json('Change room availabilty');
};
module.exports = {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  updateRoomAvailability,
};
