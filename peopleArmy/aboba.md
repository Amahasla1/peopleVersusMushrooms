Снижение горизонтальной зависимости кода

Создаётся класс, поддерживающий возможность подписываться неограниченному количеству элементов на какое-либо событие. Также он позволяет вызывать какие-либо события. Должна быть возможность обмена данными между абонентами так называемым безопасным способом, которые подразумевает, что ответ на запрос придёт в любом случае, даже если указанного абонента просто не существует. Event emiter'ы очень полезно использовать как в бекенде, так и на фронте. 

class Mediator {
    constructor({EVENTS, TRIGGERS}) { 
        this.events = {},
        this.triggers = {},
        this.EVENTS = EVENTS,
        this.TRIGGERS = TRIGGERS
        Object.keys(EVENTS).forEach(key => this.events[this.EVENTS[key]] = []);
        Object.keys(TRIGGERS).forEach(key => this.triggers[this.TRIGGERS[key]] = () => null);
    }

    //EVENTS
    
    // Получить названия событий
    getEventTypes() { 
        return this.EVENTS;
    }

    // Подписаться на событие
    subscribe(name, func) { 
        if (this.events[name] && func instanceof Function) {
            this.events[name].push(func)
        }
    }

    // Вызвать событие
    call(name, data) { 
        if (this.events[name]) {
            this.events[name].foreach(event => {
                if (event instanceof Function) {
                    event(data);
                }
            })
        }
    }

    // В классы передавать экземпляр медиатора, чтобы в каждом классе иметь возможность подписываться на события и вызывать их.

    unsubscribe(name, _func) {
        if (!this.events[name]) {
            return;
        }

        const handlerEntry = this.events[name]
        .map((func, i) => ([func, i]))
        filter(([func]) => func === _func)[0];
        if (hanlderEntry) {
            this.events[name].splice(handlerEntry[1], 1);
        }
    }

    // Написать метод unsubsribeAll

    unsubsribeAll() {
        if (this.events) {
            this.events.forEach(name => {unsubscribe(name, _func)})
        }
    }


    // TRIGGERS

    getTriggersTypes() {
        return this.TRIGGERS;
    }

    set(name, func) {
        if (this.triggers[name] && func instanceof Function) {
            this.triggers[name] = func;
        }
    }

    get(name, data) {
        if (this.triggers[name] && this.triggers[name] instanceof Function) {
            return this.triggers[name](data)
        }
        return null;
    }

    // Если компонентам приложения нужны какие-то данные из другой компоненты, то в этой компоненте устанавливается триггер (set), а другие компоненты по этому триггеру получаю необходимые данные (get)

    // Необходимо следить и не допускать циклического вызова событий
}


application/modules/Mediator.js - здесь лежит медиатор

app.js
// ... requires

cons mediator = new Mediator({EVENTS, TRIGGERS (события и триггеры из конфига)});

new UserManager({mediator, db});

const router = new Router(mediator);
app.use('/', router);

// Реализовать медиатор

Активные записи
— сущности, совмещающие в себе данные, относящиеся к этой сущности и самостоятельно следяющие за записью и изменением своего состояние в базе данных.


