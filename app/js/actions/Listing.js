'use strict';
var Reflux = require('reflux');

var ListingActions = Reflux.createActions(
    [
    	'fetchOwnedListings', 'fetchOwnedChangeLogs',
    	'fetchAllListings', 'fetchAllChangeLogs'
    ]
);

module.exports = ListingActions;