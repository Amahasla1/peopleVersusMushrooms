const EasyStar = require('easystarjs');
const CONFIG = require('../../config');

const { INTERVAL } = CONFIG.ECONOMY.INTERVAL

class Economy {
    constructor(db, common, callbacks, map, guid) {
        this.easyStar = new EasyStar.js();
        this.guid = guid;
        this.map = map;
        this.db = db;
        this.common = common;
        this.callbacks = callbacks;

        this.resourceMap; // массив известных ресурсов
        this.buildings = [];
        this.workers = []; 

        this.enemyBuildings = []; // данные для врагов
        this.enemyUnits = [];

        // start game proccess
        this.updated = false;
        this.interval = setInterval(() => this.update(), INTERVAL);
    }

    destructor() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    get() {
        return {
            guid: this.guid,
            buildings: Object.values(this.buildings).map(b => b.get()),
            map: this.map,
        }
    }


    //создать юнита
    createUnit({x, y, unitType, barracksGuid}) {

        //СОЗДАНИЕ ЮНИТА ПОКА БЕЗ ТРАТЫ РЕСУРСА 

        //находим здание по guid
        const barracks = this.buildings.find(b => b.guid === barracksGuid);
        if (!barracks) return false;
        
        //проверяем, что здание - казарма
        if (barracks.type !== 'barracks') return false;

        const unitGuid = this.common.guid();
        const unit = {
            guid: unitGuid,
            x: x,
            y: y,
            type: unitType
        };
        
        if (unitType === 'worker') {
            this.workers.push(unit);
        }
        
        this.updated = true;
        return unit;
    }

    /***** ПОСТРОЙКА ЗДАНИЙ *****/
    createBuilding({ x, y, buildingType }) {
        const guid = this.common.guid();
        let building = null;
        
        switch (buildingType) {
            case CONFIG.ECONOMY.BUILDINGS.PIPE:
                building = new Pipe({ guid, x, y });
                break;
            case CONFIG.ECONOMY.BUILDINGS.BARRACKS:
                building = new Barracks({ guid, x, y });
                break;
            case CONFIG.ECONOMY.BUILDINGS.SMALL_GENERATOR:
                building = new SmallGenerator({ guid, x, y });
                break;
            case CONFIG.ECONOMY.BUILDINGS.DRILLER:
                building = new Driller({ guid, x, y });
                break;
            default:
                return false;
        }
        
        this.buildings.push(building);
        this.updated = true;
        return building;
    }

     /***** УПРАВЛЕНИЕ ПОВЕДЕНИЕМ ЮНИТА *****/

    //расчет направления для бегства
    _calculateFleeDirection(enemies, worker) {
        if (!enemies || enemies.length === 0) return null;
        
        let sumX = 0;
        let sumY = 0;
        
        for (const enemy of enemies) {
            //вектор от врага к рабочему (противоположное направление)
            const dx = worker.x - enemy.x;
            const dy = worker.y - enemy.y;
            sumX += dx;
            sumY += dy;
        }
        
        //среднее арифметическое
        const avgX = sumX / enemies.length;
        const avgY = sumY / enemies.length;
        
        //нормализуем
        const length = Math.sqrt(avgX * avgX + avgY * avgY);
        if (length === 0) return null;
        
        //бежим на 1 клетку в сторону от врагов (нормализованный вектор)
        const targetX = worker.x + (avgX / length);
        const targetY = worker.y + (avgY / length);
        
        //округляем и ограничиваем картой
        const maxX = this.map[0].length - 1;
        const maxY = this.map.length - 1;
        
        return {
            x: Math.round(Math.min(Math.max(targetX, 0), maxX)),
            y: Math.round(Math.min(Math.max(targetY, 0), maxY))
        };
    }

    //обновление статусов воркеров
    updateWorkersBehavior() {
        const enemyUnits = this.getEnemyUnits();
        
        for (const worker of this.workers) {
            //находим видимых врагов в экстремальном радиусе
            const visibleEnemies = [];
            const extremeRadius = Math.floor(worker.visibility * CONFIG.ECONOMY.FLEE.DETECTION_RATIO);
            
            for (const enemy of enemyUnits) {
                //проверяем дистанцию до врага
                const dx = Math.abs(worker.x - enemy.x);
                const dy = Math.abs(worker.y - enemy.y);
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                //враг в радиусе видимости
                if (distance <= worker.visibility) {
                    visibleEnemies.push(enemy);
                }
            }
            
            //проверяем, нужно ли бежать (экстремальное расстояние)
            const shouldFlee = worker.shouldFlee(visibleEnemies);
            
            switch (worker.getStatus()) {
                case CONFIG.ECONOMY.WORKER_STATUS.FLEE:
                    if (!shouldFlee) {
                        //врагов нет - возвращаемся в брожение
                        worker.setStatus(CONFIG.ECONOMY.WORKER_STATUS.SEARCH);
                    } else {
                        //враги есть - обновляем направление бегства
                        const fleeTarget = this._calculateFleeDirection(visibleEnemies, worker);
                        if (fleeTarget) {
                            worker.updateTarget(fleeTarget);
                        }
                    }
                    break;
                    
                case CONFIG.ECONOMY.WORKER_STATUS.SEARCH:
                case CONFIG.ECONOMY.WORKER_STATUS.BUILD:
                default:
                    if (shouldFlee) {
                        //появились враги - переключаемся на бегство
                        const fleeTarget = this._calculateFleeDirection(visibleEnemies, worker);
                        if (fleeTarget) {
                            worker.setStatus(CONFIG.ECONOMY.WORKER_STATUS.FLEE, fleeTarget);
                        }
                    }
                    break;
            }
        }
    }

     //проверка, является ли юнит врагом (юниты грибов)
    _isEnemy(unit) {
        return unit.type === 'mushroomArmy' || unit.type === 'mushroomEconomy';
    }

    //получить всех вражеских юнитов (вроде от GameManager)
    getEnemyUnits() {
        //...
        return this.enemyUnits || [];
    }

    // 1. выработать энергию (потратить нефть)
    generateEnergy() {
        //пробежаться по всем реакторам
        //для каждого реактора взять нефть для производства энергии
        //если в реакторе этой нефти нет,
        //то с помощтю матрицы достижимости выяснить ближайшую нефть и сразу потратить её
        //энергию записать в реакторы
    }

    // 2.1. потребить энергию шахтами (добыть нефть и железо)
    miningConsumption() {
        // пробежаться по всем буровым
        // для каждой уровой взять (вычесть) необходимую энергию из достижимых реакторов
        // добыть нефть
        // распределить нефть куда-нибудь
        // то же самое сделать для шахт
    }

    // 3. переместить юнитов
    moveUnits() {
        this.workers.forEach(unit => unit.moveOneStep())
    }
    

    update() {
        /***********************/
        /* Про заводы */
        // 1. выработать энергию (потратить нефть)
        this.generateEnergy();
        // 2.1. потребить энергию шахтами (добыть нефть и железо)
        this.miningConsumption();
        // 2.5. потребить остаток энергиизаводами (потратить железо)

        /************************/
        /* Про рабочих/крестьян */
        // ОБНОВЛЯЕМ СТАТУСЫ ВОРКЕРОВ
        this.updateWorkersBehavior();
        // 3. переместить юнитов
        this.moveUnits();
        // 4. выдать ресурсы рабочему, если надо
        // 5. рабочим построить что-нибудь

        if (this.updated) {
            this.updated = false;
            this.callbacks.updated(this.get());
        }
    }
    
}

module.exports = Economy;