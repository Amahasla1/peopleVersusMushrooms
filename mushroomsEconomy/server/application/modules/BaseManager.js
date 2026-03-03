const CONFIG = require("../../config");

class BaseManager {
    constructor(options) {
        const { mediator, db, io } = options;

        this.mediator = mediator;
        this.db = db;
        this.io = io;

        //Пример
        // const data = {
        //     SUBSCRIBES: {
        //         name: CONFIG.SOCKET.CLIENT.SEND_MESSAGE,
        //         fun: () => {}
        //     },
            
        //     SENDS: {
        //         name: CONFIG.SOCKET.SERVER.NEW_MESSAGE,
        //         fun: () => {}
        //     }
        // }

        mediator.subscribe(CONFIG.MEDIATOR.SUBSCRIBE_EVENT, (data) => {
            const { SUBSCRIBES, SENDS } = data;

            if (!this.io) return;

            this.io.on('connection', (socket) => {

                this.sockets.set(socket.id, socket);

                SUBSCRIBES.forEach(sub => {
                    socket.on(sub.name, sub.fun);
                });

                SENDS.forEach(sen => {
                    socket.emit(sen.name, sen.fun);
                });
                // socket.on(CONFIG.SOCKET.CLIENT.SEND_MESSAGE, (data) => this.sendMessage(data, socket));
                socket.on('disconnect', () => {
                    this.sockets.delete(socket.id);
                    this.handleDisconnect(socket);
                });
            });
        })

        this.EVENTS = this.mediator.getEventTypes();
        this.TRIGGERS = this.mediator.getTriggerTypes();
    }


}

module.exports = BaseManager;