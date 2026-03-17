# Описание SOCKET

Здесь описано всё взаимодействие через WebSocket, используемое в приложении для реального времени, с описанием структур данных.

**Содержание**

1. Общее
   * 1.1. Адрес сервера
   * 1.2. Протокол подключения
2. Структуры данных
   * 2.1. Общий формат сообщения
   * 2.2. Пользователь
   * 2.3. Соощение
3. События (Server → Client)
   * 3.1. Общие ошибки
4. События (Client → Server)
   * 4.1. Общие ошибки
5. Подробно (Server → Client)
   * 5.1. battleUpdate
   * 5.2. battleEnd
   * 5.3. enemyDisconnected
   * 5.4. enemyReconnected
   * 5.5. error

## 1. Общее

### 1.1. Адрес сервера

`ws://localhost:3005/ws`

### 1.2. Протокол подключения

Подключение происходит по протоколу WebSocket. После установки соединения клиент должен авторизоваться, отправив событие `auth` с токеном.

Формат всех сообщений — `JSON`.

## 2. Структуры данных

### 2.1. Общий формат сообщения

```
SocketMessage<T>: {
    event: string;    // название события
    data?: T;         // данные события
    error?: {         // ошибка (если есть)
        code: number;
        message: string;
    };
}
```

### 2.2. Пользователь

```
User: {
    id: number;
    token: string;
    name: string;
}
```

### 2.3. Сообщение

```
Message: {
    message: string;
    author: string;
    created: string;
}
```

```

```

## 3. События (Server → Client)

| Событие    | О чем                                         |
| ----------------- | ------------------------------------------------- |
| battleUpdate      | Обновление состояния боя    |
| battleEnd         | Завершение боя                       |
| enemyDisconnected | Противник отключился           |
| enemyReconnected  | Противник переподключился |
| error             | Ошибка                                      |

### 3.1. Общие ошибки

* `4001` - неавторизованный запрос
* `4002` - неверный формат сообщения
* `4003` - бой не найден
* `4004` - нет доступа к бою
* `4005` - действие недопустимо в текущем состоянии

## 4. События (Client → Server)

| Событие | О чем                           |
| -------------- | ----------------------------------- |
| auth           | Авторизация              |
| joinBattle     | Подключиться к бою  |
| leaveBattle    | Покинуть бой             |
| moveUnits      | Переместить юнитов |
| attack         | Атаковать                  |
| battleReady    | Игрок готов к бою     |

### 4.1. Общие ошибки

Те же, что в 3.1

## 5. Подробно (Server → Client)

### 5.1. battleUpdate

Отправляется при любых изменениях в бою

**Данные**

```
{
    battleId: number;
    units?: Unit[];                    // изменившиеся юниты
    buildings?: Building[];             // изменившиеся здания
    corpses?: Corpse[];                 // новые трупы
    ruins?: Ruin[];                      // новые руины
    removedUnits?: number[];             // id удалённых юнитов
    removedBuildings?: number[];         // id удалённых зданий
}
```

### 5.2. battleEnd

Бой завершён

**Данные**

```
{
    battleId: number;
    winner: 'attacker' | 'defender';
    reward?: {                           // награда победителю
        money: number;
        experience: number;
    };
}
```

### 5.3. enemyDisconnected

Противник отключился

**Данные**

```
{
    battleId: number;
    message: string;
}
```

### 5.4. enemyReconnected

Противник переподключился

**Данные**

```
{
    battleId: number;
    message: string;
}
```

### 5.5. error

Ошибка

**Данные**

```
{
    code: number;
    message: string;
    originalEvent?: string;     // событие, вызвавшее ошибку
}
```

## 6. Подробно (Client → Server)

### 6.1. auth

Авторизация после подключения

**Данные**

```
{
    token: string;
}
```

**Ответ (server → client)**

```
{
    event: 'auth',
    data: {
        success: boolean;
        userId?: number;
        userName?: string;
    }
}
```

### 6.2. joinBattle

Подключиться к бою

**Данные**

```
{
    battleId: number;
}
```

**Ответ (server → client)**
Если успешно, приходит полное состояние боя через `battleUpdate`

### 6.3. leaveBattle

Покинуть бой (сдаться)

**Данные**

```
{
    battleId: number;
}
```

### 6.4. moveUnits

Переместить юнитов

**Данные**

```
{
    battleId: number;
    moves: PositionUpdate[];
}
```

### 6.5. attack

Атаковать

**Данные**

```
{
    battleId: number;
    attacks: {
        attackerId: number;
        targetId: number;
        targetType: 'unit' | 'building';
    }[];
}
```

### 6.6. battleReady

Игрок загрузил бой и готов начать

**Данные**

```
{
    battleId: number;
}
```

Когда оба игрока отправили `battleReady`, бой начинается (таймер запускается)
