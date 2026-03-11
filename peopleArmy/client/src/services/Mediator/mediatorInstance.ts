import Mediator from "./Mediator";
import CONFIG from "../../config";

const mediatorInstance = new Mediator({
    EVENTS: CONFIG.MEDIATOR.EVENTS,
    TRIGGERS: CONFIG.MEDIATOR.TRIGGERS,
});

export default mediatorInstance;