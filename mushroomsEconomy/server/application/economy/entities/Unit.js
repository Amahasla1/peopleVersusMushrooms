class Unit {
    constructor({ x, y, guid, callbacks, easystar }) {
        this.x = x;
        this.y = y;
        this.guid = guid;
        this.callbacks = callbacks;
        this.easystar = easystar;
    }

    get() {
        return {
            x: this.x,
            y: this.y,
            hp: this.hp
        }
    }
}

module.exports = Unit;