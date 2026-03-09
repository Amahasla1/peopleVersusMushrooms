/**
 * Менеджер для обработки чат сообщений через сокеты
 * Принимает сокеты, медиатор и конфиг, обрабатывает сообщения и рассылку
 */
class ChatManager {
    constructor(mediator, io, config) {
        this.mediator = mediator;
        this.io = io;
        this.config = config;
        
        // Регистрируем триггеры в медиаторе
        this.mediator.set(this.mediator.TRIGGERS.SOCKET_HANDLE_MESSAGE, this.handleMessage.bind(this));
        this.mediator.set(this.mediator.TRIGGERS.SOCKET_BROADCAST_TO_ALL, this.broadcastToAll.bind(this));
        
        // Подписываемся на события
        this.mediator.subscribe(this.mediator.EVENTS.SOCKET_MESSAGE_RECEIVED, (data) => {
            console.log(`[ChatManager] Получено сообщение:`, data);
        });
        
        this.mediator.subscribe(this.mediator.EVENTS.SOCKET_BROADCAST_MESSAGE, (data) => {
            console.log(`[ChatManager] Рассылка сообщения:`, data);
            this.broadcastToAll(data);
        });
        
        this.initializeSocketHandlers();
    }

    /**
     * Инициализация обработчиков сокетов
     * Устанавливает обработчики для подключения, отключения и сообщений
     */
    initializeSocketHandlers() {
        this.io.on(this.config.SOCKET.EVENTS.CONNECTION, (socket) => {
            console.log(`[Chat] Клиент подключился: ${socket.id}`);
            
            // Обработчик входящих сообщений от клиента
            socket.on(this.config.SOCKET.EVENTS.MESSAGE_FROM_CLIENT, (data) => {
                console.log(`[Chat] Сообщение от клиента ${socket.id}:`, data);
                
                // Вызываем триггер через медиатор
                this.mediator.get(this.mediator.TRIGGERS.SOCKET_HANDLE_MESSAGE, {
                    socketId: socket.id,
                    message: data,
                    timestamp: new Date().toISOString()
                });
            });
            
            // Обработчик отключения клиента
            socket.on(this.config.SOCKET.EVENTS.DISCONNECT, () => {
                console.log(`[Chat] Клиент отключился: ${socket.id}`);
            });
        });
        
        console.log('[ChatManager] Обработчики сокетов инициализированы');
    }

    /**
     * Обработка входящего сообщения
     * Генерирует события для медиатора о получении и рассылке сообщения
     * @param {Object} data - данные сообщения (socketId, message, timestamp)
     */
    handleMessage(data) {
        // Генерируем событие о получении сообщения
        this.mediator.call(this.mediator.EVENTS.SOCKET_MESSAGE_RECEIVED, data);
        
        // Генерируем событие для рассылки всем клиентам
        // Рассылка произойдет через подписчика в конструкторе
        this.mediator.call(this.mediator.EVENTS.SOCKET_BROADCAST_MESSAGE, {
            type: 'message',
            data: data.message,
            from: data.socketId,
            timestamp: data.timestamp
        });
    }

    /**
     * Рассылка сообщения всем подключенным клиентам, кроме отправителя
     * @param {Object} data - данные для рассылки (type, data, from, timestamp)
     */
    broadcastToAll(data) {
        if (this.io) {
            // Отправляем всем клиентам, кроме отправителя
            this.io.except(data.from).emit(this.config.SOCKET.EVENTS.MESSAGE_TO_CLIENTS, data);
            console.log(`[ChatManager] Сообщение разослано всем клиентам (кроме ${data.from}):`, data);
        }
    }
}

module.exports = ChatManager;
