const fligth = require('../db_apis/flight.js');

/**
 * GET запрос для получения информации о полете
 * @param req
 * @param res список id: id_flight, id_airplane, id_airline, id_timetable
 * @param next
 * @returns {Promise<void>}
 */
async function getInfoAboutFlight(req, res, next) {
    try {
        const context = {};
        const rows = await fligth.findInfoAboutFlight(context);
        res.status(200).json(rows);
    } catch (err) {
        next(err);
    }
}

//module.exports.getInfoAboutFlight = getInfoAboutFlight;

async function getInfoAboutAirlineById(req, res, next){
    try {
        const context = {};
        const rows = await fligth.findInfoAboutAirlineById(context);
        res.status(200).json(rows);
    } catch (err) {
        next(err);
    }
}

//module.exports.getInfoAboutAirlineById = getInfoAboutAirlineById;

module.exports = {
    getInfoAboutFlight,
    getInfoAboutAirlineById,
}