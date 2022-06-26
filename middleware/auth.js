const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const authentication = async (req, res, next) => {
  // check authentication header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid');
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, 'jwtSecret');

    // attack the user to the hotels, room and users route routes

    req.user = { userId: payload.userId, username: payload.username };
  } catch (err) {
    throw new UnauthenticatedError('Authentication invalid');
  }
  next();
};

module.exports = authentication;
