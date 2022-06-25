const getAllUsers = async (req, res) => {
  res.status(200).json('Get all Users');
};
const createUser = async (req, res) => {
  res.status(200).json('Create a User');
};
const updateUser = async (req, res) => {
  res.status(200).json('Update a User');
};
const deleteUser = async (req, res) => {
  res.status(200).json('Delete a User');
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };
