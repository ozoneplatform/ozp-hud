'use strict';
var Reflux = require('reflux');

var ListingActions = Reflux.createActions(
    ['fetchListings', 'fetchAllChangeLogs']
);

module.exports = ListingActions;