/**
 * Определяются маршруты для api
 *
 */
const express = require('express');
const router = new express.Router();
const passenger = require('../controllers/passenger.js');
const flight = require('../controllers/flight');
const sso = require('../controllers/user.js');

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
// достает данные о строке в расписании по id
router.route('/flight/timetable/:id?').get(flight.getInfoAboutTimetableById);

// авторизационные апи
// кладет в базу данные нового пользователя
router.route('/sso/signup').post(sso.signup);
// достает из базы данные пользователя
router.route('/sso/signin/:login?').get(sso.signin);

//админские апишки

router.route('/admin/newairline/').post(flight.admAddAirline);
router.route('/admin/newairport/').post(flight.admAddAirport);
router.route('/admin/newtimetable/').post(flight.admAddTimtable);

router.route('/admin/updairline/').put(flight.updAirline);
router.route('/admin/updairport/').put(flight.updAirport);
router.route('/admin/updtimetable/').put(flight.updTimetable);

router.route('/admin/delairline/:id?').delete(flight.deleteAirlineById);
router.route('/admin/delairport/:id?').delete(flight.deleteAirportById);
router.route('/admin/deltimetable/:id?').delete(flight.deleteTimetableById);

module.exports = router;