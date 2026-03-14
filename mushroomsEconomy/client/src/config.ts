const CONFIG = {
    HOST: 'http://localhost:3005', // Адрес сервера

    MEDIATOR: {
        EVENTS: {
            LOGIN: 'login',
        },
        TRIGGERS: {
            MESSAGE: 'message:socket',

            SET_STORE: 'set_store',
            GET_STORE: 'get_store',
            CLEAR_STORE: 'clear_store',
        }
    },

    SOCKET: {
        MESSAGE: 'message',  // шлет сообщение
        TYPING: 'typing',           // печатает

        REGISTRATION: 'registration',
        LOGIN: 'login',
        LOGOUT: 'logout',
    }
};

export default CONFIG;