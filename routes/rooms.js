const express = require('express');
const {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} = require('../controllers/rooms');
const router = express.Router();

router.route('/').get(getAllRooms);
router.route('/:id').patch(updateRoom).delete(deleteRoom).post(createRoom);

module.exports = router;
