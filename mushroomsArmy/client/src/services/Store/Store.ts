import { TUser } from "../server/types";

type TData = {
    token: string | null;
    name: string | null;
    [key: string]: unknown;
}

class Store {
    private data: TData = {
        token: null,
        name: null
    }

    set<K extends keyof TData>(name: K, value: TData[K]) {
        this.data[name] = value;
    }

    get<K extends keyof TData>(name: K): TData[K] {
        return this.data[name];
    }

    clear<K extends keyof TData>(name: K) {
        if (name in this.data) {
            this.data[name] = null;
        }
    }

    setUser(user: TUser) {
        this.data.token = user.token;
        this.data.name = user.name;
    }

    getUser(): { token: string | null; name: string | null } {
        return {
            token: this.data.token,
            name: this.data.name
        };
    }

    clearUser() {
        this.data.token = null;
        this.data.name = null;
    }
}

export default Store;