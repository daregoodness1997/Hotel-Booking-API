const express = require('express');
const {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} = require('../controllers/rooms');
const router = express.Router();

router.route('/').get(getAllRooms);
router.route('/:id').patch(updateRoom).post(createRoom);
router.route('/:id/hotel/:hotel').delete(deleteRoom);

module.exports = router;
