const express = require('express');
const { loginUser, registerUser } = require('../controllers/auth');
const router = express.Router();

router.route('/login').get(loginUser);
router.route('/register').post(registerUser);

module.exports = router;
