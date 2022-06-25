const express = require('express');
const {
  getAllHotels,
  createHotel,
  updateHotel,
  deleteHotel,
} = require('../controllers/hotels');
const router = express.Router();

router.route('/').get(getAllHotels);
router.route('/:id').get(createHotel).patch(updateHotel).delete(deleteHotel);

module.exports = router;
