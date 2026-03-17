import { TUser } from "../server/types";
import Mediator from '../Mediator/Mediator';
import { EMESSAGES } from "../../config";

const TOKEN = 'token';

class Store {
    user: TUser | null = null;
    mediator: Mediator;

    constructor(mediator: Mediator) {
        this.mediator = mediator;
        this.initMediator();
    }

    private initMediator(): void {
        this.mediator.subscribe(EMESSAGES.LOGIN, this.handleLogin);
        this.mediator.subscribe(EMESSAGES.REGISTRATION, this.handleRegistration);
        this.mediator.subscribe(EMESSAGES.LOGOUT, this.handleLogout);
        this.mediator.set(EMESSAGES.GET_TOKEN, this.getToken);
    }

    handleLogin(data: TUser): void {
        console.log(data);
    }

    handleRegistration(data: TUser): void {
        console.log(data);
    }

    handleLogout(data: TUser): void {
        console.log(data);
    }

    getToken(): string | null {
        return localStorage.getItem(TOKEN);
    }
}

export default Store;