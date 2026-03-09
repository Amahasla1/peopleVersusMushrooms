const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const CONFIG = require('./config');
const Router = require('./application/router/Router');
const DB = require('./application/modules/db/DB');
const Mediator = require('./application/modules/mediator/Mediator');
const RegistrationManager = require('./application/modules/registration/RegistrationManager')
const ChatManager = require('./application/modules/chat/ChatManager');
const { NAME, PORT, DATABASE } = CONFIG;

// Создаем сокеты в app.js
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const db = new DB({ DATABASE });
const mediator = new Mediator(CONFIG.MEDIATOR);

// Менеджеры создаём здесь, чтобы они зарегистрировали триггеры в медиаторе
const registrationManager = new RegistrationManager(mediator, db);
const chatManager = new ChatManager(mediator, io, CONFIG);

// Пример: подписка на событие "пользователь зарегистрирован"
mediator.subscribe(mediator.EVENTS.USER_REGISTERED, (user) => {
    console.log(`[Mediator] Новый пользователь: ${user.username}`);
});

const router = new Router(mediator);

app.use(express.static(`${__dirname}/public`));
app.use('/', router);

function deinit() {
    db.destructor();
    setTimeout(() =>process.exit(), 500);
}

server.listen(PORT, () => console.log(`${NAME} started at port ${PORT}`));

process.on('SIGINT', deinit);