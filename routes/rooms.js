const express = require('express');
const {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} = require('../controllers/rooms');
const router = express.Router();

router.route('/').get(getAllRooms);
router.route('/:id').get(createRoom).patch(updateRoom).delete(deleteRoom);

module.exports = router;
