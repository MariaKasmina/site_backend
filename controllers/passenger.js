const passenger = require('../db_apis/passenger.js');


/**
 * GET запрос
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
async function get(req, res, next) {
    try {
        const context = {};
        context.id = parseInt(req.query.id, 10); // получаем индекс пассажира через query-параметры
        const rows = await passenger.find(context);
        if (req.query.id) {
            if (rows.length === 1) {
                res.status(200).json(rows[0]);
            } else {
                res.status(404).end();
            }
        } else {
            res.status(200).json(rows);
        }
    } catch (err) {
        next(err);
    }
}

module.exports.get = get;

/**
 * POST запрос
 *
 */

function getPassengerFromRec(req) {
    return {
        ID_PASSENGER: req.body.id_passenger,
        NAME: req.body.name,
        ID_BAGGAGE: req.body.id_bagagge,
    };
}

async function post(req, res, next) {
    try {
        let p = getPassengerFromRec(req);
        p = await passenger.create(p);
        res.status(201).json(p);
    } catch (err) {
        next(err);
    }
}

module.exports.post = post;