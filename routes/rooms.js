const express = require('express');
const {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  updateRoomAvailability,
} = require('../controllers/rooms');
const router = express.Router();

router.route('/').get(getAllRooms);
router.route('/availabilty/:id').patch(updateRoomAvailability);

router.route('/:id').patch(updateRoom).post(createRoom).get(getRoom);
router.route('/:id/hotel/:hotel').delete(deleteRoom);

module.exports = router;
