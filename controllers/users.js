const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequest, NotFoundError } = require('../errors');

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(StatusCodes.OK).json({ nbHits: users.length, users });
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
