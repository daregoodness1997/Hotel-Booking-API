// auth middleware
const authMiddleware = require('./auth');
const { UnauthenticatedError } = require('../errors');

const verifyUser = async (req, res, next) => {
  next();
};
const verifyAdmin = async (req, res, next) => {
  if ((req.user, isAdmin)) {
    next();
  } else {
    throw new UnauthenticatedError('You are not authorized!');
  }
};

module.exports = { verifyAdmin, verifyUser };
