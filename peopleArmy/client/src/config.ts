interface SocketEvents {
    CONNECTION: string;
    DISCONNECT: string;
    MESSAGE_FROM_CLIENT: string;
    MESSAGE_TO_CLIENTS: string;
}

interface MediatorEvents {
      TEST_EVENT: string;
}

interface MediatorTriggers {
    TEST_TRIGGER: string;
}

interface Config {
    SERVER_URL: string;
    SOCKET: {
        EVENTS: SocketEvents;
    };
    MEDIATOR: {
        EVENTS: MediatorEvents;
        TRIGGERS: MediatorTriggers;
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
    MEDIATOR: {
        EVENTS: {
            TEST_EVENT: 'TEST_EVENT',
        },
        TRIGGERS: {
            TEST_TRIGGER: 'TEST_TRIGGER',
        },
    },
};

export default CONFIG;