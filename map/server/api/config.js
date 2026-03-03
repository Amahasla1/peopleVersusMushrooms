class CONFIG {
    static SERVER_PORT = '3001'; // Хост сервера
    static SERVER_NAME = 'MAP';  // Имя сервера

    static SQLITE_PATH = './application/modules/db/test.db'; // Путь к базе

    //ивенты
    static EVENTS = {
    }

    //триггеры
    static TRIGGERS = {
        //test trigger
        TEST: 'TEST',
        TESTDB: 'TESTDB',
    }

    static ONS = {
        // test ons
        TEST: 'test',
        DISCONNECT: 'disconnect'
    }

    static EMMITS = {
        // test emmits
        CONNECTION_TEST: 'connectionTest'
    }
}

module.exports = CONFIG;