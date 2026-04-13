class DieselGenerator {
    constructor({ type, guid, x, y, role, callbacks = {} }) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.guid = guid;
        this.role = role;
        this.callbacks = callbacks;
        
        //==== ВСЕ НИЖЕ ВЫНЕСТИ ПОТОМ В КОНФИГУ====
        //параметры генератора
        this.hp = 100;
        this.size = { width: 2, height: 2 };
        
        //потребление нефти за единицу времени
        this.oilConsumption = 10;
        
        //производство электричества за единицу времени
        this.electricityProduction = 50;
        
        //внутреннее хранилище нефти
        this.oilStorage = 0;
        this.oilCapacity = 100;
        
        //внутреннее хранилище электричества
        this.electricityStorage = 0;
        this.electricityCapacity = 200;
        
        //работает ли генератор
        this.isActive = false;
    }

     get() {
        return {
            guid: this.guid,
            coords: { x: this.x, y: this.y },
            type: this.type,
            hp: this.hp,
            size: this.size,
            isActive: this.isActive
        };
    }

    getSelf() {
        return {
            ...this.get(),
            oilConsumption: this.oilConsumption,
            electricityProduction: this.electricityProduction,
            oilStorage: this.oilStorage,
            oilCapacity: this.oilCapacity,
            electricityStorage: this.electricityStorage,
            electricityCapacity: this.electricityCapacity
        };
    }

    //добавить нефть
    addOil(amount) {
        
    }

    //забрать электричество
    takeElectricity(amount) {

    }

    //получить текущий запас нефти
    getOilStorage() {
        return this.oilStorage;
    }

    //получить потребление нефти
    getOilConsumption() {
        return this.oilConsumption;
    }

    //получить емкость хранилища нефти
    getOilCapacity() {
        return this.oilCapacity;
    }
    
    //получить производство электричества
    getElectricityProduction() {
        return this.electricityProduction;
    }

    //получить емкость хранилища электричества
    getElectricityCapacity() {
        return this.electricityCapacity;
    }

    //получить текущий запас электричества
    getElectricityStorage() {
        return this.electricityStorage;
    }

    update() {

    }


}