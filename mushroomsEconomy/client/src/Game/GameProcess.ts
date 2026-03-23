import Server from "../services/Server/Server";
import Mediator from "../services/Mediator/Mediator";
import CONFIG from "../config";
import { TMap } from "../services/Server/types";

const { SET_MAP } = CONFIG.MEDIATOR.TRIGGERS;

export default class GameProcess {

    map: TMap;
    mapGuid: string;

    server;
    mediator;

    constructor(server: Server, mediator: Mediator) {
        this.map = {guid: "", map: []};
        this.mapGuid = '';
        this.server = server;
        this.mediator = mediator;
        this.mediator.set(SET_MAP, (data) => this.setMap(data));
        this.server.getMap(this.mapGuid);
    }

    setMap(map: TMap) {
        this.server.getMap(this.mapGuid);
        this.map = map;
        //console.log(map)
    }
    
    get () {
        return {
            map: this.map,
        }
    }

}