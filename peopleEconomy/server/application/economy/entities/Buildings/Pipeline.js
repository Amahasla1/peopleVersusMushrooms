const EasyStar = require('easystarjs');

class Pipeline {
    constructor({ startX, startY, endX, endY, map, guid, economy }) {
        this.guid = guid;
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        
        this.map = map;
        this.economy = economy;
        this.path = [];

        this.hp = 100;
        this.size = { width: 1, height: 1 };
        
        this._buildPath();
    }
    
    //строим путь
    _buildPath() {
        const easystar = new EasyStar.js();
        
        //получаем сетку проходимости из карты
        const grid = this.map.getPassability(); // такого метода нет, обудмать хорошечно
        easystar.setGrid(grid);
        
        //разрешаем ходить только по определенным тайлам (1)
        easystar.setAcceptableTiles([1]);
        
        //ищем путь 
        easystar.findPath(this.startX, this.startY, this.endX, this.endY, (path) => {
            if (path) {
                this.path = path;
                //сообщаем экономике, что состояние изменилось
                this.economy.updated = true;
            }
        });
        
        easystar.calculate();
    }
    
    get() {
        return {
            guid: this.guid,
            start: { x: this.startX, y: this.startY },
            end: { x: this.endX, y: this.endY },
            path: this.path,
            hp: this.hp,
            size: this.size
        };
    }
    
    //переместить ресурс
    transferResources(resource) {
        //находим здание в конце трубопровода по координатам
        const targetBuilding = this.economy.buildings.find(b => 
            b.x === this.endX && b.y === this.endY
        );
        
        //если здание найдено и у него есть метод addResource(?) - добавляем ресурс
        if (targetBuilding && targetBuilding.addResource) {
            targetBuilding.addResource(resource);
        }
        
        this.economy.updated = true;
        return true;
    }
    
    //проверить, проходит ли трубопровод через указанную клетку
    containsCoord(x, y) {
        return this.path.some(point => point.x === x && point.y === y);
    }
    
    //получить все клетки, которые занял трубопровод
    getOccupiedCells() {
        return this.path;
    }
    
    //уничтожить трубу
    destroy() {
        this.path = [];
        this.economy.updated = true;
    }
}

module.exports = Pipeline;