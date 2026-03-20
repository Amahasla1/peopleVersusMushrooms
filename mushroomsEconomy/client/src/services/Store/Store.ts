import { TUser, TMessages, TMessage } from "../Server/types";

type TData = {
    token: string | null;
    user: TUser | null;
    [key: string]: any;
}

class Store {
    messages: TMessages = [];
    chatHash: string = 'empty chat hash';

    private data: TData = {
        token: null,
        user: null
    }

    set(name: string, value: any) {
        this.data[name] = value;
    }

    get(name: string) {
        return this.data[name];
    }

    clear(name: string) {
        this.data[name] = null;
    }

    addMessage(message: TMessage): void {
        this.messages = [...this.messages, message];
    }

    addMessages(messages: TMessages): void {
        if (messages?.length) {
            this.messages = messages;
        }
    }

    getMessages(): TMessages {
        return this.messages;
    }

    getChatHash(): string {
        return this.chatHash;
    }

    setChatHash(hash: string): void {
        this.chatHash = hash;
    }
}

export default Store;