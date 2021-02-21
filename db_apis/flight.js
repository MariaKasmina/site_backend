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


const requestAirline =
    `SELECT * FROM PR_AIRLINE;`;

async function findInfoAboutAirlineById(context) {
    let query = requestAirline;
    const binds = {};
    binds.id_airline = context.id_airline;

    query += `\nwhere id_airline = :id_airline`;
    const result = await database.simpleExecute(query, binds);
    return result.rows;
}

module.exports.findInfoAboutAirlineById = findInfoAboutAirlineById;
