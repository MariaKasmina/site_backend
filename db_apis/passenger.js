const database = require('../services/database.js');
const oracledb = require('oracledb');

const baseQuery =
    `select ID_PASSENGER "id",
    name "name",
    id_baggage "id bagagge"
    from PR_PASSENGER`;

async function find(context) {
    let query = baseQuery;
    const binds = {};

    if (context.id) {
        binds.id_passenger = context.id;

        query += `\nwhere id_passenger = :id_passenger`;
    }

    const result = await database.simpleExecute(query, binds);

    return result.rows;
}

module.exports.find = find;

const createSql =
    `insert into PR_PASSENGER (
    ID_PASSENGER,
    NAME,
    ID_BAGGAGE
  ) values (
    :ID_PASSENGER,
    :NAME,
    :ID_BAGGAGE
  )`;

async function create(emp) {
    const passenger = Object.assign({}, emp);
    const result = await database.simpleExecute(createSql, passenger);
    return passenger;
}

module.exports.create = create;