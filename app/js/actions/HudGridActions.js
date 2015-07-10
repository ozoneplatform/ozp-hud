'use strict';
var Reflux = require('reflux');

var HudGridActions = Reflux.createActions(
    [
        "clearWidgets",
        "addWidget",
        "moveWidget"
    ]
);

module.exports = HudGridActions;