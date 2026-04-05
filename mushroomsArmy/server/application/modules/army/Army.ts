import Common from "../common/Common";
import Champigneb, { SlimePuddle } from "./Champigneb";
import Sporomet from "./Sporomet";
import Unit, { MapData, UnitState } from "./Units";

export interface ArmyOptions {
    map: MapData, 
    buildings: any[], 
    guid: string, 
    common: Common, 
    callbacks: any[]
}

export interface ArmyState {
    units: UnitState[], 
    slimePuddles: SlimePuddle[]
}

export class Army{

    public guid: string | undefined;
    public map: MapData = {map: []};
    public buildings: any;
    public units: Unit[] = [];
    public slimePuddle: SlimePuddle[] = [];
    public enemyUnits: Unit[] = [];
    public enemyBuildings: any[] = [];
    public callbacks: any[] = [];

    constructor(options: ArmyOptions){
        this.map = options.map;
        this.buildings = options.buildings;
        this.guid = options.guid;
        this.callbacks = options.callbacks;
        this.create(options.common);
        // setInterval(() => this.update(), 200);
    }

    private create(common: Common) {
        this.units.push(new Sporomet({guid: common.guid(), type: 'sporomet', x: 0, y: 0, hp: 100, maxHp: 100, speed: 1, attackRange: 10}));
        this.units.push(new Sporomet({guid: common.guid(), type: 'sporomet', x: 10, y: 10, hp: 100, maxHp: 100, speed: 1, attackRange: 10}));
        this.units.push(new Sporomet({guid: common.guid(), type: 'sporomet', x: 20, y: 20, hp: 100, maxHp: 100, speed: 1, attackRange: 10}));
        this.units.push(new Champigneb({guid: common.guid(), type: 'champineb', x: 5, y: 5, hp: 50, maxHp: 50, speed: 1, attackRange: 5}));
        this.units.push(new Champigneb({guid: common.guid(), type: 'champineb', x: 15, y: 15, hp: 50, maxHp: 50, speed: 1, attackRange: 5}));
    }

    private update(){
        this.units = 
            this.units.filter(unit => {
                if (unit.isAlive) {
                    let before = JSON.stringify(unit); // unit copy
                    unit.update(this.enemyUnits, this.map, 200);
                    let after = JSON.stringify(unit);
                    if (before != after) {
                        this.callbacks.forEach(cb => cb(unit.guid, unit))
                    }
                    return true;

                } else if (unit.type === 'champineb') {
                    let before = JSON.stringify(unit); // unit copy

                    let champineb = (<Champigneb>unit);
                    champineb.slimePuddle.ttl -= 200;
                    let after = JSON.stringify(unit);
                    
                    if (before != after) {
                        this.callbacks.forEach(cb => cb(unit.guid, unit))
                    }

                    return champineb.slimePuddle.ttl >= 0;                }
                return true;
            });
    }

    public getState(): ArmyState {
        return {
            units: 
                this.units.map(u => u.getState()), 
            slimePuddles: 
                this.units
                    .filter(u => u.type === 'champineb' && !u.isAlive)
                    .map(u => (<Champigneb>u).slimePuddle)
        }
    }

    public getAliveUnits(): Unit[] {
        return this.units.filter(u => u.isAlive)
    }
}