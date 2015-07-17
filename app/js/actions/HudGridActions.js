'use strict';
var Reflux = require('reflux');

var HudGridActions = Reflux.createActions(
    [
        "clearWidgets",
        "addWidget",
        "moveWidget",
        "resizeWidget",
        "setGridWidth"
    ]
);

module.exports = HudGridActions;