const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequest, UnauthenticatedError } = require('../errors');

const loginUser = async (req, res) => {
  res.json('Logged In User');
};
const registerUser = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { username: user.username }, token });
};

module.exports = { loginUser, registerUser };
