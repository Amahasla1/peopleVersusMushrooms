/**
 * Ошибка сервера
 */
export type TError = {
    code: number;
    text: string;
}

/**
 * Общий тип ответа сервера
 */
export type TResponse<T> = {
    result: 'ok' | 'error';
    data?: T;
    error?: TError;
}

/**
 * Пользователь
 */
export type TUser = {
    token: string;
    username: string;
    id?: number;
    guid?: string;
}

/**
 * Данные для регистрации
 */
export type TRegistrationData = {
    name: string;
    password: string;
    confirmPassword?: string;
}

/**
 * Данные для входа
 */
export type TLoginData = {
    name: string;
    password: string;
}

/**
 * Данные для выхода
 */
export type TLogoutData = {
    token: string;
    guid: string;
}

//Юнит на карте

export type TUnit = {
    guid: string;
    type: string;
    x: number;
    y: number;
    hp: number;
    maxHp: number;
    isAlive: boolean;
}

// Лужа слайма
export type TSlimePool = {
    x: number;
    y: number;
    radius: number;
    ttl: number;
}

//Данные карты

export type TMapData = {
    grid: number[][];
    width: number;
    height: number;
    cellSize: number;
    center: { x: number; y: number };
}

// Снимок состояния игры
export type TGameState = {
    units: TUnit[];
    slimePools: TSlimePool[];
    mapData: TMapData;
}
