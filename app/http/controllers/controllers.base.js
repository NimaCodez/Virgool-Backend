const autoBind = require("auto-bind");

module.exports = class ControllerBase {
    constructor() {
        autoBind(this)
    }
}
