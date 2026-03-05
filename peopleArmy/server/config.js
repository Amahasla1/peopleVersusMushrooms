const CONFIG = {
    NAME: 'PeoplesArmy',
    PORT: 3007, //Порт соостветсвующий серверу вашего сервиса

    DATABASE: {
        NAME: 'data.db',
    },

    MEDIATOR: {
        EVENTS: {
            EXAMPLE_EVENT: "EXAMPLE_EVENT",
            USER_REGISTERED: "USER_REGISTERED",   // вызывается после успешной регистрации
        },
        TRIGGERS: {
            EXAMPLE_TRIGGER: "EXAMPLE_TRIGGER",
            REGISTER: "REGISTER",                 // триггер для регистрации (возвращает результат)
        },
    },
}

module.exports = CONFIG;