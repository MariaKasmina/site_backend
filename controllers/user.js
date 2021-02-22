const sso = require('../db_apis/user.js');

// авторизационные апи

function userData(req) {
    return {
        ID_CLIENT: req.body.id,
        LOGIN: req.body.login,
        PASSWORD: req.body.password
    };
}

// регистрация нового пользователя
async function signup(req, res, next) {
    try {
        let p = userData(req);
        p = await sso.createUserRec(p);
        res.status(201).json(p);
    } catch (err) {
        next(err);
    }
}

//авторизация существующего пользователя
async function signin(req, res, next) {
    try {
        const context = {};
        context.login = String(req.query.login);
        const rows = await sso.seachUser(context);
        let c = Array.isArray(rows)
        if(rows.length === 0) {
            res.status(400).json(rows);
        } else res.status(200).json(rows);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    signup,
    signin
}