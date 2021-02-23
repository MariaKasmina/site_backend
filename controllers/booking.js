const booking = require('../db_apis/booking');


function getBookingFromRec(req) {
    return {
        ID_BOOKING: req.body.id,
        ROW_NUMBER: req.body.row_number,
        SEAT: req.body.seat,
        ID_PASSENGER: req.body.id_passenger,
        ID_FLIGHT: req.body.id_flight,
        ID_TIMETABLE: req.body.id_timetable
    };
}

async function postIntoPRBooking(req, res, next) {
    try {
        let p = getBookingFromRec(req);
        p = await booking.createBooking(p);
        res.status(201).json(p);
    } catch (err) {
        next(err);
    }
}

module.exports.postIntoPRBooking = postIntoPRBooking;