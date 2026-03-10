interface SocketEvents {
    CONNECTION: string;
    DISCONNECT: string;
    MESSAGE_FROM_CLIENT: string;
    MESSAGE_TO_CLIENTS: string;
}

interface Config {
    SERVER_URL: string;
    SOCKET: {
        EVENTS: SocketEvents;
    };
}

const CONFIG: Config = {
    SERVER_URL: 'http://localhost:3007',
    
    SOCKET: {
        EVENTS: {
            CONNECTION: 'connection',
            DISCONNECT: 'disconnect',
            MESSAGE_FROM_CLIENT: 'message_from_client',
            MESSAGE_TO_CLIENTS: 'message_to_clients',
        },
    },
}

export default CONFIG;