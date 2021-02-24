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

const requestAirplane =
    `SELECT * FROM PR_BOOKING`;

async function getItems(context) {
    let query = requestAirplane;
    const binds = {};
    const result = await database.simpleExecute(query, binds);
    return result.rows;
}

module.exports.getItems = getItems;