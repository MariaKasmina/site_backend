/**
 * Определяются маршруты для api
 *
 */
const express = require('express');
const router = new express.Router();
const passenger = require('../controllers/passenger.js');
const flight = require('../controllers/flight.js');

// знак ? после id указывает на его необязательность
router.route('/passenger/:id?')
    .get(passenger.get)
    .post(passenger.post);
router.route('/').get();

router.route('/flight/msk/spb').get(flight.getInfoAboutFlight);
router.route('/flight/airline/:id').get(flight.getInfoAboutAirlineById);



// router.route('/baggage/:id?').get(); следующие апишки

module.exports = router;