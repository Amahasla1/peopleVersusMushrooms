import Server from "../services/Server/Server";
import Mediator from "../services/Mediator/Mediator";
import CONFIG from "../config";
import { TMap } from "../services/Server/types";

const { SET_MAP } = CONFIG.MEDIATOR.TRIGGERS;

export default class GameProcess {

    map: TMap;

    server;
    mediator;

    constructor(server: Server, mediator: Mediator) {
        this.map = {guid: "", map: []};
        this.server = server;
        this.mediator = mediator;
        this.mediator.set(SET_MAP, (data) => this.setMap(data));
        this.server.getScene(this.map.guid);
    }

    setMap(map: TMap) {
        this.map = map;
    }
    
    get () {
        return {
            map: this.map,
        }
    }

}