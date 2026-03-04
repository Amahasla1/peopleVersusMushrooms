const { ONS, EMMITS } = require("../../../config");

class TestManager {
    constructor({ mediator, db, io }) {
        this.db = db;
        this.mediator = mediator;
        this.io = io;
        if (!(this.db && this.mediator && this.io)) return;

        const events = mediator.getEventTypes();
        const triggers = mediator.getTriggerTypes();

        // Устанавливаем обработчики для триггеров
        mediator.set(triggers.TEST, (params) => this.test(params));
        mediator.set(triggers.TESTDB, (params) => this.testDB(params));

        // Устанавливаем обработчик socket.io запросов
        this.io.on('connection', socket => {
            console.log(`Пользователь подключился с id ${socket.id}`);
            socket.on(ONS.TEST, data => this.socketConnectionTest(data));
            socket.on(ONS.DISCONNECT, () => this.socketDisconnectTest(socket.id));
        });

    }

    async test(params) {
        const { data1, data2 } = params;

        return `вы ввели: ${data1} и ${data2}`;;
    }

    async testDB(params) {
        const { userId } = params;

        const user = await this.db.getUserById(userId);

        if (!user) {
            return { error: 1001 };
        }

        return user.name;
    }

    socketConnectionTest(data) {
        this.test(data);
        this.io.emit(EMMITS.CONNECTION_TEST, data);
    }

    socketDisconnectTest(socketId) {
        console.log(`Пользователь ${socketId} отключился`);
    }

    /*test.db:
    1 - Oleg
    2 - Max
    3 - Petr
    */

}

module.exports = TestManager;