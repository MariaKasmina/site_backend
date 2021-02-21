const database = require('../services/database.js');
const oracledb = require('oracledb');

// запрос на нахождение 
const baseQuery =
    `SELECT ID_FLIGHT "id_flight",
            ID_AIRPLANE "id_airplane",
            ID_AIRLINE "id_airline",
            ID_TIMETABLE "id_timetable"            
     FROM PR_FLIGHT WHERE ID_TIMETABLE=(SELECT ID_TIMETABLE FROM PR_TIMETABLE WHERE ID_AIRPORT_DEPARTURE = (SELECT ID_AIRPORT FROM PR_AIRPORT WHERE CITY='MSK_CITY' AND TITLE='DOMODEDOVO') AND ID_AIRPORT_ARRIVAL=(SELECT ID_AIRPORT FROM PR_AIRPORT WHERE CITY='SPB_CITY' AND TITLE='PULCOVO'))`;

async function findInfoAboutFlight(context) {
    let query = baseQuery;
    const binds = {};
    const result = await database.simpleExecute(query, binds);
    console.log(result.rows);
    return result.rows;
}

module.exports.findInfoAboutFlight = findInfoAboutFlight;

// GET запрос для получения информации об авиакомпании по id

const requestAirline =
    `SELECT * FROM PR_AIRLINE`;

async function findInfoAboutAirlineById(context) {
    let query = requestAirline;
    const binds = {};
    binds.id_airline = context.id;

    query += `\nwhere id_airline = :id_airline`;
    const result = await database.simpleExecute(query, binds);
    return result.rows;
}

module.exports.findInfoAboutAirlineById = findInfoAboutAirlineById;

const requestAirplane =
    `SELECT * FROM PR_AIRPLANE`;

async function findInfoAboutAirplaneById(context) {
    let query = requestAirplane;
    const binds = {};
    binds.id_airplane = context.id;

    query += `\nwhere ID_AIRPLANE = :id_airplane`;
    const result = await database.simpleExecute(query, binds);
    return result.rows;
}

module.exports.findInfoAboutAirplaneById = findInfoAboutAirplaneById;

const requestAirport =
    `SELECT * FROM PR_AIRPORT`;

async function findInfoAboutAirportById(context) {
    let query = requestAirport;
    const binds = {};
    binds.id_airport = context.id;

    query += `\nwhere ID_AIRPORT = :id_airport`;
    const result = await database.simpleExecute(query, binds);
    return result.rows;
}

module.exports.findInfoAboutAirportById = findInfoAboutAirportById;

const createAir =
    `insert into PR_AIRLINE (
    ID_AIRLINE,
    TITLE,
    AVERAGE_TICKET_PRICE,
    RATING
  ) VALUES (
    :ID_AIRLINE,
    :TITLE,
    :AVERAGE_TICKET_PRICE,
    :RATING
  )`;

const createAirportRec =
    `insert into PR_AIRPORT (
    ID_AIRPORT,
    TITLE,
    COUNTRY,
    CITY
  ) VALUES (
    :ID_AIRPORT,
    :TITLE,
    :COUNTRY,
    :CITY
  )`;

const createTimetableRec =
    `insert into PR_TIMETABLE (
    ID_TIMETABLE,
    DEPARTURE_DATE,
    ARRIVAL_DATE,
    ID_AIRPORT_DEPARTURE,
    ID_AIRPORT_ARRIVAL
  ) VALUES (
    :ID_TIMETABLE,
    :DEPARTURE_DATE,
    :ARRIVAL_DATE,
    :ID_AIRPORT_DEPARTURE,
    :ID_AIRPORT_ARRIVAL
  )`;

async function createAirline(air) {
    const airline = Object.assign({}, air);
    const result = await database.simpleExecute(createAir, airline);
    return airline;
}

module.exports.createAirline = createAirline;

async function createAirport(air) {
    const airport = Object.assign({}, air);
    const result = await database.simpleExecute(createAirportRec, airport);
    return airport;
}

module.exports.createAirport = createAirport;

async function createTimetable(time) {
    const timetable = Object.assign({}, time);
    const result = await database.simpleExecute(createTimetableRec, timetable);
    return timetable;
}

module.exports.createTimetable = createTimetable;


const updateAirlineRec =
    `update PR_AIRLINE
  set TITLE = :title,
    AVERAGE_TICKET_PRICE = :average_ticket_price,
    RATING = :rating,
  where ID_AIRLINE = :id_airline`;

async function updateAirline(air) {
    const airline = Object.assign({}, air);
    const result = await database.simpleExecute(updateAirlineRec, airline);

    if (result.rowsAffected && result.rowsAffected === 1) {
        return airline;
    } else {
        return null;
    }
}

module.exports.updateAirline = updateAirline;
