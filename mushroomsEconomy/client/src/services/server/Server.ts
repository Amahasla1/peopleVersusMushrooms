import CONFIG from '../../config';

import Mediator from '../Mediator/Mediator';

import Store from "../Store/Store";
import { TUser } from "./types";

import { io, Socket } from "socket.io-client";

const HOST = CONFIG.HOST;

type Tprops = {
    store: Store;
    mediator: Mediator;
}

class Server {
    HOST = HOST;
    store: Store;
    mediator: Mediator;
    chatInterval: NodeJS.Timer | null = null;
    socket: Socket;
    showErrorCb: (text: string) => void = function () { };

    constructor(props: Tprops) {
        
        this.mediator = props.mediator;
        this.store = props.store;
        this.socket = io(HOST);

        this.socket.on("connect", () => {
            console.log('connect');
        });

        this.mediator.set(
            CONFIG.MEDIATOR.TRIGGERS.SEND_MESSAGE_SOCKET,
            (data: { name: string; text: string }) => this.chatMessage(data.name, data.text)
        )
    }

    private chatMessage(name: string, text: string): void {
        this.socket.emit(CONFIG.SOCKET.CLIENT.SEND_MESSAGE, { name, text });
    }

    private async request<T>(
        method: string,
        params: { [key: string]: string } = {},
        queryParams: { [key: string]: string } = {}
    ): Promise<T | null> {
        try {
            const token = this.store.getToken();
            let url = `${this.HOST}/${method}`;
            const paramValues = Object.values(params);
            if (paramValues.length > 0) {
                url += "/" + paramValues.join("/");
            }
            const queryParts: string[] = [];
            if (token) {
                queryParts.push("token=" + token);
            }
            for (const key in queryParams) {
                queryParts.push(key + "=" + queryParams[key]);
            }
            if (queryParts.length > 0) {
                url += "?" + queryParts.join("&");
            }

            console.log("Request URL:", url);
            const response = await fetch(url);
            const body = await response.json();

            if (body && body.error) {
                this.setError(body.error);
                console.error("Server error:", body.error);
                return null;
            }
            return body as T;
        } catch (e) {
            console.log("Request exception:", e);
            this.setError("Unknown error");
            return null;
        }
    }

    private setError(text: string): void {
        this.showErrorCb(text);
    }

    showError(cb: (text: string) => void) {
        this.showErrorCb = cb;
    }

    async register(username: string, password: string): Promise<boolean> { //Функцию выпилить! Она для примера
        const user = await this.request<TUser & { username?: string; name?: string; id?: number }>("reg", { username, password });
        if (!user) return false;
        const name = user.username ? user.username : user.name;
        this.store.setUser({ token: user.token, name: name, id: user.id });
        return true;
    }
}

export default Server;