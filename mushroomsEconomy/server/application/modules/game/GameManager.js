const BaseManager = require("../BaseManager");
const CONFIG = require("../../../config");
const Economy = require('../../economy/Economy');

const { GET_MAP } = CONFIG.SOCKET;

class GameManager extends BaseManager {
    constructor(options) {
        super(options);

        if (!this.io) return;

        this.io.on('connection', (socket) => {
            console.log("GameManager connection:", socket.id)

            socket.on(GET_MAP, (data) => this.getMap(data, socket));

            socket.on('GameManager disconnect', () => console.log('disconnect', socket.id));
        });

        this.economies = {};
    }

    createEconomy({ map } = {}) {
        const guid = this.common.guid();
        this.economies[guid] = new Economy({
            db: this.db,
            common: this.common,
            callbacks: {},
            map,
            guid,
        });

        return this.economies[guid];
    }

    getMap(data, socket) {
        //console.log(data, '\n\n\n\n\n\n');
        const { guid } = data;
        console.log("Запрос на получение карты");

        if (guid == '') {
            const economy = this.createEconomy();
            const { map } = economy.get();
            return socket.emit(GET_MAP, this.answer.good({ guid: economy.guid, map }));
        }

        const economy = this.economies[guid];
        if (!economy) {
            return socket.emit(GET_MAP, this.answer.bad(18));
        }

        const { map } = economy.get();
        return socket.emit(GET_MAP, this.answer.good({ guid, map }));
    }

}

module.exports = GameManager;
