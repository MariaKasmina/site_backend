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

async function getInfoAboutTimetableById(req, res, next){
    try {
        const context = {};
        context.id = parseInt(req.query.id, 10);
        const rows = await fligth.findInfoAboutTimetableById(context);
        res.status(200).json(rows);
    } catch (err) {
        next(err);
    }
}


// ADMIN APIS

function getAirlineFromRec(req) {
    return {
        ID_AIRLINE: req.body.id,
        TITLE: req.body.title,
        AVERAGE_TICKET_PRICE: req.body.average_ticket_price,
        RATING: req.body.rating
    };
}

function getAirportFromRec(req) {
    return {
        ID_AIRPORT: req.body.id,
        TITLE: req.body.title,
        COUNTRY: req.body.country,
        CITY: req.body.city
    };
}

function getTimetableFromRec(req) {
    let ddate = new Date(req.body.date_departure);
    let adate = new Date(req.body.date_arrival);
    return {
        ID_TIMETABLE: req.body.id,
        DEPARTURE_DATE: ddate,
        ARRIVAL_DATE: adate,
        ID_AIRPORT_DEPARTURE: req.body.id_airport_departure,
        ID_AIRPORT_ARRIVAL: req.body.id_airport_arrival
    };
}

async function admAddAirline(req,res,next){
    try {
        let p = getAirlineFromRec(req);
        p = await fligth.createAirline(p);
        res.status(201).json(p);
    } catch (err) {
        next(err);
    }
}

async function admAddAirport(req,res,next){
    try {
        let p = getAirportFromRec(req);
        p = await fligth.createAirport(p);
        res.status(201).json(p);
    } catch (err) {
        next(err);
    }
}

async function admAddTimtable(req,res,next){
    try {
        let p = getTimetableFromRec(req);
        p = await fligth.createTimetable(p);
        res.status(201).json(p);
    } catch (err) {
        next(err);
    }
}

async function updAirline(req, res, next) {
    try {
        let airline = getAirlineFromRec(req);
        let p = await fligth.updateAirline(airline);

        if (p !== null) {
            res.status(200).json(p);
        } else {
            res.status(404).end();
        }
    } catch (err) {
        next(err);
    }
}

async function updAirport(req, res, next) {
    try {
        let airline = getAirportFromRec(req);
        let p = await fligth.updateAirport(airline);

        if (p !== null) {
            res.status(200).json(p);
        } else {
            res.status(404).end();
        }
    } catch (err) {
        next(err);
    }
}

async function updTimetable(req, res, next) {
    try {
        let timetable = getTimetableFromRec(req);
        let p = await fligth.updateTimetable(timetable);

        if (p !== null) {
            res.status(200).json(p);
        } else {
            res.status(404).end();
        }
    } catch (err) {
        next(err);
    }
}

async function deleteAirlineById(req, res, next) {
    try {
        const context = {};
        context.id = parseInt(req.query.id, 10);
        const success = await fligth.deleteAirline(context);
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        next(err);
    }
}

async function deleteAirportById(req, res, next) {
    try {
        const context = {};
        context.id = parseInt(req.query.id, 10);
        const success = await fligth.deleteAirport(context);
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        next(err);
    }
}

async function deleteTimetableById(req, res, next) {
    try {
        const context = {};
        context.id = parseInt(req.query.id, 10);
        const success = await fligth.deleteTimetable(context);
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        next(err);
    }
}


module.exports = {
    getInfoAboutFlight,
    getInfoAboutAirlineById,
    getInfoAboutAirplaneById,
    getInfoAboutAirportById,
    getInfoAboutTimetableById,
    admAddAirline,
    admAddAirport,
    admAddTimtable,
    updAirline,
    updAirport,
    updTimetable,
    deleteAirlineById,
    deleteAirportById,
    deleteTimetableById
}