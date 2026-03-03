const Example = require("./Example");
const BaseManager = require('../BaseManager');

class ExampleManager extends BaseManager {
    constructor(options) {
        super(options);
    }
    
    check(token) {
        console.log('пример манагера!');
    }

}

module.exports = ExampleManager;