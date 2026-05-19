const Unit = require("./Unit");
const CONFIG = require("../../config");

const { HP, SPEED, TYPE, VISIBILITY } = CONFIG.ECONOMY.WORKER;
const { WORKER_STATUS, SEARCH, BUILD, FLEE } = CONFIG.ECONOMY;

class Worker extends Unit {
    constructor(options) {
        super({ 
            ...options,
            type: TYPE,
            visibility: VISIBILITY
        });
        this.hp = HP;
        this.speed = SPEED;
        this.status = WORKER_STATUS.SEARCH;
        this.economy = options.economy;
    }

    get() {
        return { ...super.get(), hp: this.hp, status: this.status };
    }

    //установить статус поведения
    setStatus(status, target = null) {
        this.status = status;
        
        switch (status) {
            case WORKER_STATUS.FLEE:
                if (target) {
                    this.target = target;
                    this.setTarget({ x: target.x, y: target.y });
                }
                break;
            case WORKER_STATUS.SEARCH:
                //...
            case WORKER_STATUS.BUILD:
                //...
                //смотрим в свои постройки -> принимаем решение что-то построить (на основе очереди на стриотелсьттво?)
                //выбираем место для постройки
                //строим
            default:
                this.target = null;
                break;
        }
    }

    //получить текущий статус
    getStatus() {
        return this.status;
    }

    //проверка, нужно ли бежать (есть ли враги в экстрем радиусе)
    shouldFlee(enemies) {
        if (!enemies || enemies.length === 0) return false;
        
        const extremeRadius = Math.floor(this.visibility * FLEE.RADIUS_RATIO);
        
        for (const enemy of enemies) {
            const dx = Math.abs(this.x - enemy.x);
            const dy = Math.abs(this.y - enemy.y);
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance <= extremeRadius) {
                return true;
            }
        }
        return false;
    }

    //обновление цели для бегства (вроде как должно вызываться экономикой при пересчете)
    updateTarget(target) {
        if (this.status === WORKER_STATUS.FLEE && target) {
            this.target = target;
            this.setTarget({ x: target.x, y: target.y });
        }
    }

    //проверка, находится ли точка в радиусе от рабочего
    _isInRadius(x, y, radius = CONFIG.ECONOMY.UNIT.RADIUS) {
        const dx = Math.abs(this.x - x);
        const dy = Math.abs(this.y - y);
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance <= radius;
    }

    //постройка здания
    createBuilding({ x, y, buildingType }) {
        //проверяем, что тип здания существует в конфиге
        const buildingKey = Object.keys(CONFIG.ECONOMY.BUILDINGS).find(
            key => CONFIG.ECONOMY.BUILDINGS[key] === buildingType
        );
        
        if (!buildingKey) {
            return false;
        }

        //проверка, что точка находится в радиусе досягаемости
        if (!this._isInRadius(x, y)) {
            return false;
        }
        
        //вызываем создание здания
        this.economy.createBuilding({ x, y, buildingType }); 
        return true;
    }
}

module.exports = Worker;