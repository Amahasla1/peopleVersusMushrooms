const CONFIG = {
    NAME: 'Server',
    PORT: 3003, //Порт соостветсвующий серверу вашего сервиса

    DATABASE: {
        NAME: 'mushroomsArmy.db',
    },

    MEDIATOR: {
        EVENTS: {
            REGISTRATION: "REGISTRATION",
            LOGIN: "LOGIN",
            LOGOUT: "LOGOUT"
        },
        TRIGGERS: {
            EXAMPLE_TRIGGER: "EXAMPLE_TRIGGER",
        },
    },
}

module.exports = CONFIG;