const express = require('express');
const {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} = require('../controllers/rooms');
const router = express.Router();

router.route('/').get(getAllRooms).post(createRoom);
router.route('/:id').patch(updateRoom).delete(deleteRoom);

module.exports = router;
