const express = require('express');
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');
const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/:id').get(createUser).patch(updateUser).delete(deleteUser);

module.exports = router;
