const fligth = require('../db_apis/flight.js');

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

        const rows = await flight.find(context);
        res.status(200).json(rows);
    } catch (err) {
        next(err);
    }
}

module.exports.get = get;