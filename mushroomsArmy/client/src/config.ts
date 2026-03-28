const CONFIG = {
    HOST: 'http://localhost:3003', // Адрес сервера mushroomsArmy

    MEDIATOR: {
        EVENTS: {
            SHOW_ERROR: 'SHOW_ERROR',
            ERROR: 'ERROR',
            USER_REGISTERED: 'USER_REGISTERED',
            USER_LOGGED_OUT: 'USER_LOGGED_OUT',
            LOGIN: 'LOGIN',
            GAME_STARTED: 'GAME_STARTED',
        },
        TRIGGERS: {
            SET_STORE: 'SET_STORE',
            GET_STORE: 'GET_STORE',
            CLEAR_STORE: 'CLEAR_STORE',
        }
    },

    SOCKET: {
        REGISTRATION: 'registration',
        LOGIN: 'login',
        LOGOUT: 'logout',
        LOBBY_START: 'lobby:start',
        VALIDATE_TOKEN: 'auth:validate',
    }
};

export default CONFIG;