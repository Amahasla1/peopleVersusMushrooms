// pages/Game/types.ts

/**
 * Тип местности на карте
 * 0 - равнина
 * 1 - вода
 * 2 - горы
 */
export type TerrainType = 0 | 1 | 2;

/**
 * Игровой юнит (споромёт или шампиньеб)
 */
export interface Unit {
  id: string;               
  x: number;                
  y: number;                
  type: 'sporomet' | 'shampigneb';
  hp: number;               
  maxHp: number;            
}

/**
 * Лужа слизи
 */
export interface SlimePuddle {
  x: number;               
  y: number;                
  radius: number;          
}

/**
 * Полное состояние игры
 */
export interface GameState {
  map: TerrainType[][];     
  units: Unit[];            
  slimePuddles: SlimePuddle[]; 
}