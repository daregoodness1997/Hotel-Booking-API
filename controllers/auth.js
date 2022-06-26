const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequest, UnauthenticatedError } = require('../errors');

const registerUser = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { username: user.username }, token });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (email === '' || password === '') {
    throw new BadRequest('Please provide email and password');
  }
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  // compare password and password
  const isPasswordCorrect = await user.checkPassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  const token = user.createJWT();
  res
    .cookie('access_token', token, { httpOnly: true })
    .status(StatusCodes.OK)
    .json({ user: { username: user.username, isAdmin: user.isAdmin }, token });
};
module.exports = { loginUser, registerUser };
