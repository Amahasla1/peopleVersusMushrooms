const CONFIG = {
    HOST: 'http://localhost:3005', // Адрес сервера

    MEDIATOR: {
        EVENTS: {

        },
        TRIGGERS: {
            MESSAGE: 'message:socket'
        }
    },

    SOCKET: {
        MESSAGE: 'message',  // шлет сообщение
        TYPING: 'typing',           // печатает
    }
};

export default CONFIG;