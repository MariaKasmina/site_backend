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


async function getInfoAboutAirlineById(req, res, next){
    try {
        const context = {};
        context.id = parseInt(req.query.id, 10);
        const rows = await fligth.findInfoAboutAirlineById(context);
        res.status(200).json(rows);
    } catch (err) {
        next(err);
    }
}

async function getInfoAboutAirplaneById(req, res, next){
    try {
        const context = {};
        context.id = parseInt(req.query.id, 10);
        const rows = await fligth.findInfoAboutAirplaneById(context);
        res.status(200).json(rows);
    } catch (err) {
        next(err);
    }
}

async function getInfoAboutAirportById(req, res, next){
    try {
        const context = {};
        context.id = parseInt(req.query.id, 10);
        const rows = await fligth.findInfoAboutAirportById(context);
        res.status(200).json(rows);
    } catch (err) {
        next(err);
    }
}


// ADMIN APIS

function getAirlineFromRec(req) {
    return {
        TITLE: req.body.title,
        AVERAGE_TICKET_PRICE: req.body.average_ticket_price,
        RATING: req.body.rating,
    };
}

async function admAddAirline(req,res,next){
    try {
        let p = getAirlineFromRec(req);
        p = await flight.createAirline(p);
        res.status(201).json(p);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getInfoAboutFlight,
    getInfoAboutAirlineById,
    getInfoAboutAirplaneById,
    getInfoAboutAirportById,
    admAddAirline,
}