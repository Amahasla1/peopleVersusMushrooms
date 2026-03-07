const CONFIG = {
    NAME: 'Mushroom economy server',
    PORT: 3005, //Порт соостветсвующий серверу вашего сервиса

    DATABASE: {
        NAME: 'data.db',
    },

    MEDIATOR: {
        EVENTS: {
            EXAMPLE_EVENT: "EXAMPLE_EVENT",
        },
        TRIGGERS: {
            EXAMPLE_TRIGGER: "EXAMPLE_TRIGGER",
        },
    },
    CORS: {
        origin: "http://localhost:3004",
    },
}

module.exports = CONFIG;