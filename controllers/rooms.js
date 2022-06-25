const getAllRooms = async (req, res) => {
  res.status(200).json('Get all Rooms');
};
const createRoom = async (req, res) => {
  res.status(200).json('Create a Room');
};
const updateRoom = async (req, res) => {
  res.status(200).json('Update a Room');
};
const deleteRoom = async (req, res) => {
  res.status(200).json('Delete a Room');
};

module.exports = { getAllRooms, createRoom, updateRoom, deleteRoom };
