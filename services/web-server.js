const http = require('http');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const webServerConfig = require('../config/web-server.js');
const router = require('./router.js');

let httpServer;

// создаем функцию для создания сервера, обрабатываем promise
function initialize() {
    return new Promise((resolve, reject) => {
        const app = express(); // создаем express-приложение
        httpServer = http.createServer(app); // создаем сервер
        // подключаем логирование в консоль
        app.use(morgan('combined'));
        // создаем маршрутизированный обработчик get-запросов
        app.use(cors());
        app.use(express.json());
        app.use('/api', router);
        // прослушиваем входящие запросы
        httpServer.listen(webServerConfig.port)
            .on('listening', () => {
                console.log(`Web server listening on localhost:${webServerConfig.port}`);
                resolve();
            })
            .on('error', err => {
                reject(err);
            });
    });
}

module.exports.initialize = initialize;

function close() {
    return new Promise((resolve, reject) => {
        httpServer.close((err) => {
            if (err) {
                reject(err);
                return;
            }

            resolve();
        });
    });
}

module.exports.close = close;