const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: 'localhost:3001' } });

const Router = require('./application/router/Router.js');
const DB = require('./application/modules/db/DB.js');
const Mediator = require('./application/modules/Mediator.js');
const TestManager = require('./application/modules/test/TestManager.js');
const { EVENTS, TRIGGERS, SERVER_PORT, SERVER_NAME } = require('./config.js');

// Экз БД
const db = new DB();

async function startServer() {
    // Инициализируем БД
    await db.initialize();

    // Создание медиатора
    const mediator = new Mediator({ EVENTS, TRIGGERS });

    // Создаем менеджеры
    new TestManager({ mediator, db, io });

    // Запуск сервака
    server.listen(SERVER_PORT, () => {
        console.log(`Server ${SERVER_NAME} running on port ${SERVER_PORT}`);
    });
}

startServer();