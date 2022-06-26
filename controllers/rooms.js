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
  res.status(200).json({ room, hotel });
};
const updateRoom = async (req, res) => {
  const {
    user: { userId },
    body: { title, price, maxPeople, description, hotel },
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

  const room = await Room.findByIdAndUpdate({ _id: roomId, createdBy: userId });
  res.status(200).json('Update a Room');
};
const updateRoomAvailability = async (req, res) => {
  res.status(200).json('Update a Room');
};
const deleteRoom = async (req, res) => {
  res.status(200).json('Delete a Room');
};

module.exports = {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  updateRoomAvailability,
};
