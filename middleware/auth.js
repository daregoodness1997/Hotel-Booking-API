const authentication = async (req, res, next) => {
  console.log('Authentication Middleware');
  next();
};

module.exports = authentication;
