const express = require('express');
const { loginUser, registerUser } = require('../controllers/auth');
const router = express.Router();

router.route('/').get(loginUser).post(registerUser);

module.exports = router;
