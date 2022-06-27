const express = require('express');
const {
  getAllHotels,
  createHotel,
  updateHotel,
  deleteHotel,
  countByCity,
  countByType,
} = require('../controllers/hotels');
const router = express.Router();

router.route('/').get(getAllHotels).post(createHotel);
router.route('/countByCity').get(countByCity);
router.route('/countByType').get(countByType);
router.route('/:id').patch(updateHotel).delete(deleteHotel);

module.exports = router;
