const autoBind = require("auto-bind");

class Controller {
    constructor() {
        autoBind(this)
    }
}

module.exports = {
    ControllerBase: new Controller(),
}
