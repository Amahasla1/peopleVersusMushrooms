interface UnitConstructorOptions {
    guid: string;
    type: string;
    hp: number;
    maxHp: number;
    speed: number;
    x: number;
    y: number;
    attackRange: number;
    fireDamageMultiplier: number; 
}

interface UnitState {
  guid: string;
  type: string;
  x: number;
  y: number;
  hp: number;
  maxHp: number;
  isAlive: boolean;
}

interface MapData {
  map: number[][];
}

class Unit {
    public guid: string;
    public type: string;
    public hp: number;
    public maxHp: number;
    public speed: number;
    public x: number;
    public y: number;
    public targetX: number;
    public targetY: number;
    public isAlive: boolean;
    public attackRange: number;
    public fireDamageMultiplier: number = 2;
    
    private decisionAccumulator: number = 0;
    private readonly DECISION_INTERVAL: number = 0.5; 

    constructor({guid, type, x, y, hp, maxHp, speed, attackRange, fireDamageMultiplier = 2}: UnitConstructorOptions) {
        this.guid = guid;
        this.type = type;
        this.x = x;
        this.y = y;
        this.hp = hp;
        this.maxHp = maxHp;
        this.speed = speed;
        this.attackRange = attackRange;
        this.fireDamageMultiplier = fireDamageMultiplier;
        this.targetX = x;
        this.targetY = y;
        this.isAlive = true;
    }

    update(enemies: Unit[], mapData: MapData, deltaTime: number): void {
        if (!this.isAlive) return;
        
        this.decisionAccumulator += deltaTime;
        
        if (this.decisionAccumulator >= this.DECISION_INTERVAL) {
            this.decisionAccumulator = 0;
            this.makeDecision(enemies, mapData);
        }
        
        this.moveTo(this.targetX, this.targetY, mapData, deltaTime);
    }
    
    private makeDecision(enemies: Unit[], mapData: MapData): void {
        let nearestEnemy: Unit | null = null;
        let nearestDistance: number = Infinity;
        
        for (const enemy of enemies) {
            if (!enemy.isAlive) continue;
            
            const dx = enemy.x - this.x;
            const dy = enemy.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestEnemy = enemy;
            }
        }
        
        if (nearestEnemy) {
            this.onEnemyFound(nearestEnemy, nearestDistance);
        } else {
            this.targetX = 25;
            this.targetY = 25;
        }
    }

    moveTo(targetX: number, targetY: number, mapData: MapData, deltaTime: number): void {
        if (!this.isAlive) return;

        const dx = targetX - this.x;
        const dy = targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 0.01) return;

        const step = this.speed * deltaTime;
        const ratio = Math.min(step / distance, 1);

        const nextX = this.x + dx * ratio;
        const nextY = this.y + dy * ratio;

        const mapX = Math.floor(nextX);
        const mapY = Math.floor(nextY);

        const map = mapData.map;
        const tile = map[mapY][mapX];

        if (tile === 1) {
            this.die();
            return;
        }
        
        this.x = nextX;
        this.y = nextY;
    }

    takeDamage(amount: number, type: string): void {
        if (!this.isAlive) return;

        const finalAmount = type === 'fire' ? amount * this.fireDamageMultiplier : amount;

        this.hp -= finalAmount;
        
        if (this.hp <= 0) {
            this.die();
        }
    }

    die(): void {
        this.isAlive = false;
        this.onDeath();
    }
    
    getState(): UnitState {
        return {
            guid: this.guid,
            type: this.type,
            x: this.x,
            y: this.y,
            hp: this.hp,
            maxHp: this.maxHp,
            isAlive: this.isAlive,
        };
    }

    protected onDeath(): void {}
    protected onEnemyFound(enemy: Unit, distance: number): void {}
}

export default Unit;