const Example = require("./Example");
const BaseManager = require('../BaseManager');
const CONFIG = require("../../../config");

class ExampleManager extends BaseManager {
    constructor(options) {
        super(options);

        this.messages = [];

        if (!this.io) return;

        this.io.on('connection', (socket) => {

            socket.on(CONFIG.SOCKET.MESSAGE, (data) => this.socketChatMessage(data, socket));

            socket.on('disconnect', () => console.log('disconnect', socket.id));
        });

    }

    socketChatMessage(data = {}, socket) {
		const { name, text } = data;
		if (name && text) {
			this.messages.push({ name, text });
			socket.emit(CONFIG.SOCKET.MESSAGE, 'ok');
			this.io.emit(CONFIG.SOCKET.MESSAGE, this.messages); // выслать сообщение всем активным абонентам
            console.log(this.messages);
		}
	}

    check(token) {
        console.log('пример манагера!');
    }

}

module.exports = ExampleManager;