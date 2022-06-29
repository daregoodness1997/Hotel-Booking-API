const Room = require('../models/Room');
const Hotel = require('../models/Hotel');
const { StatusCodes } = require('http-status-codes');
const { BadRequest, NotFoundError } = require('../errors');

const getAllRooms = async (req, res) => {
  const {
    query: { title, hotel, numericFilters, sort, fields },
  } = req;

  const queryObject = {};

  if (hotel) {
    // const hotelId = await Hotel.find({ name: hotel });
    queryObject.hotel = hotel;
  }

  if (title) {
    queryObject.title = {
      $regex: title,
      $options: 'i',
    };
  }

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      match => `-${operatorMap[match]}-`
    );

    const options = ['price', 'maxPeople'];

    filters = filters.split(',').forEach(item => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Room.find(queryObject);

  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }
  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const rooms = await result;

  console.log(queryObject);

  res.status(StatusCodes.OK).json({ nbHits: rooms.length, rooms });
};

const getRoom = async (req, res) => {
  const {
    params: { id: roomId },
  } = req;
  const room = await Room.find({ _id: roomId });
  res.status(StatusCodes.OK).json({ nbHits: room.length, room });
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
  const {
    user: { userId },
    params: { id: roomId },
  } = req;

  const room = await Room.updateOne(
    { 'roomNumbers._id': roomId },
    {
      $push: { 'roomNumbers.$.unavailabeDates': req.body.dates },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(room);
};
module.exports = {
  getAllRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  updateRoomAvailability,
};
