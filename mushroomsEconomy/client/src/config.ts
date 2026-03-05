const CONFIG = {
    HOST: 'http://localhost:3005', // Адрес сервера

    MEDIATOR: {
        EVENTS: {
            RANDOM: 'client:message:socket',
        },
        TRIGGERS: {
            SEND_MESSAGE_SOCKET: 'client:message:socket'
        }
    },

    SOCKET: {
        CLIENT: {
            SEND_MESSAGE: 'client:message',  // клиент шлет сообщение
            TYPING: 'client:typing'           // клиент печатает
        },
        SERVER: {
            NEW_MESSAGE: 'server:new:message', // сервер разослал сообщение
            USER_TYPING: 'server:user:typing'  // сервер сообщает, что кто-то печатает
        }
    }
};

export default CONFIG;