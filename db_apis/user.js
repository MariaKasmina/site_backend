const database = require('../services/database.js');
const oracledb = require('oracledb');

const createUser =
    `insert into PR_SSO (ID_CLIENT,LOGIN,PASSWORD) VALUES (:ID_CLIENT,:LOGIN,:PASSWORD)`;

async function createUserRec(air) {
    const user = Object.assign({}, air);
    const result = await database.simpleExecute(createUser, user);
    return user;
}

module.exports.createUserRec = createUserRec;

const requestSSO =
    `SELECT * FROM PR_SSO`;

async function seachUser(req) {
    let query = requestSSO;
    const binds = {};
    binds.login = req.login;

    query += `\nwhere login = :login`;
    const result = await database.simpleExecute(query, binds);
    return result.rows;
}

module.exports.seachUser = seachUser;