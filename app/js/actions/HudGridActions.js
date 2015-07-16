'use strict';
var Reflux = require('reflux');

var HudGridActions = Reflux.createActions(
    [
        "clearWidgets",
        "addWidget",
        "moveWidget",
        "resizeWidget"
    ]
);

module.exports = HudGridActions;