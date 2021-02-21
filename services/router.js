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

// достает из базы данные по рейсу из Мск в Спб
router.route('/flight/msk/spb').get(flight.getInfoAboutFlight);
// достает данные об авиалинии по id
router.route('/flight/airline/:id?').get(flight.getInfoAboutAirlineById);
// достает данные о самолете по id
router.route('/flight/airplane/:id?').get(flight.getInfoAboutAirplaneById);
// достает из базы данные об аэропорте по id
router.route('/flight/airport/:id?').get(flight.getInfoAboutAirportById);

// авторизационные апи
// кладет в базу данные нового пользователя
//router.route('/sso/signup').post(flight.signup);
// достает из базы данные пользователя
//route.route('/sso/signin').get(flight.signin);

//админские апишки

router.route('/admin/newairline/').post(flight.admAddAirline);
router.route('/admin/newairport/').post(flight.admAddAirport);
router.route('/admin/newtimetable/').post(flight.admAddTimtable);

router.route('/admin/updairline/').put(flight.updAirline);
//router.route('/admin/updairport/').put();
//router.route('/admin/updtimetable/').put();

//router.route('/admin/delairline/').delete();
//router.route('/admin/delairport/').delete();
//router.route('/admin/deltimetable/').delete();

module.exports = router;