/**
 * Определяются маршруты для api
 *
 */
const express = require('express');
const router = new express.Router();
const passenger = require('../controllers/passenger.js');
const flight = require('../controllers/flight');

// знак ? после id указывает на его необязательность
router.route('/passenger/:id?')
    .get(passenger.get)
    .post(passenger.post);
router.route('/').get();

router.route('/flight/msk/spb').get(flight.getInfoAboutFlight);
router.route('/flight/airline/:id?').get(flight.getInfoAboutAirlineById);
router.route('/flight/airplane/:id?').get(flight.getInfoAboutAirplaneById);
router.route('/flight/airport/:id?').get(flight.getInfoAboutAirportById);


//админские апишки

router.route('/admin/newairline/').post(flight.admAddAirline);
router.route('/admin/newairport/').post();
router.route('/admin/newtimetable').post();

router.route('/admin/updairline/').put();
router.route('/admin/updairport/').put();
router.route('/admin/updtimetable').put();

router.route('/admin/delairline/').delete();
router.route('/admin/delairport/').delete();
router.route('/admin/deltimetable').delete();

module.exports = router;