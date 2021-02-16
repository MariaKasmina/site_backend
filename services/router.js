/**
 * Определяются маршруты для api
 *
 */
const express = require('express');
const router = new express.Router();
const passenger = require('../controllers/passenger.js');

router.route('/passenger/:id?')
    .get(passenger.get)
    .post(passenger.post);
router.route('/').get();



// router.route('/baggage/:id?').get(); следующие апишки

module.exports = router;