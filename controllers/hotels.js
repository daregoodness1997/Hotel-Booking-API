const getAllHotels = async (req, res) => {
  res.status(200).json('Get all Hotels');
};
const createHotel = async (req, res) => {
  res.status(200).json('Create a Hotel');
};
const updateHotel = async (req, res) => {
  res.status(200).json('Update a Hotel');
};
const deleteHotel = async (req, res) => {
  res.status(200).json('Delete a Hotel');
};

module.exports = { getAllHotels, createHotel, updateHotel, deleteHotel };
