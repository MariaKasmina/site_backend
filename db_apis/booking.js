const database = require('../services/database.js');
const oracledb = require('oracledb');


const createBookingRec =
    `insert into PR_BOOKING (
    ID_BOOKING,
    ROW_NUMBER,
    SEAT,
    ID_PASSENGER,
    ID_FLIGHT,
    ID_TIMETABLE
  ) values (
    :ID_BOOKING,
    :ROW_NUMBER,
    :SEAT,
    :ID_PASSENGER,
    :ID_FLIGHT,
    :ID_TIMETABLE
  )`;

async function createBooking(book) {
    const booking = Object.assign({}, book);
    const result = await database.simpleExecute(createBookingRec, booking);
    return booking;
}

module.exports.createBooking = createBooking;