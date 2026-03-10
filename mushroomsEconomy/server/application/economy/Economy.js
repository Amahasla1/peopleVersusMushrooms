const EasyStar = require('easystarjs');
const CONFIG = require('../../config');

const { INTERVAL } = CONFIG.ECONOMY;

class Economy {
    constructor({ db, common, callbacks: { }, map, guid }) {
        this.easyStar = new EasyStar.js();

        this.guid = guid; // совпадает с guid игрока
        this.db = db;
        this.common = common;
        this.callbacks = this.callbacks;
        // структура данных
        //this.map = map; // карту получить из сервиса Карта [[1,0,0, ...], [0,1,0, ...], ...]

        this.map = [
            [0, 0, 1, 2, null, null, null, null, null, null],
            [0, 0, 0, 1, null, null, null, null, null, null],
            [0, 0, 0, 2, null, null, null, null, null, null],
            [0, 0, 1, null, null, null, null, null, null, null],
            //...
        ];

        this.resourceMap; // массив известных ресурсов [{x, y, value}]
        this.buildings = []; // здания
        this.mycelium = []; // грибница
        this.workers = []; // рабочие
        this.larvae = []; // массив личинок

        // данные про врагов

        // start game proccess
        this.interval = setInterval(() => this.update(), INTERVAL);
    }

    mapInit() { //Временный метод для заглушки
        if (!this.map) {
            
        }
    }

    destructor() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    get() {

    }

    update() {
        this.mycelium.forEach(mycelium => mycelium.update());
        //...
    }
}

module.exports = Economy;