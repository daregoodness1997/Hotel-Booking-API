const express = require('express');
const {
  getAllHotels,
  createHotel,
  updateHotel,
  deleteHotel,
} = require('../controllers/hotels');
const router = express.Router();

router.route('/').get(getAllHotels).post(createHotel);
router.route('/:id').patch(updateHotel).delete(deleteHotel);

module.exports = router;
