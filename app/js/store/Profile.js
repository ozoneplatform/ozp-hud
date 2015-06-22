'use strict';

var Reflux = require('reflux');
var ListingApi = require('../api/Listing');
var ListingActions = require('../actions/Listing');

var ProfileStore = Reflux.createStore({

    listenables: [ ListingActions ],

    listings: [],

	onFetchOwnedListings: function () {
        var me = this;

        ListingApi.getOwnedListings().then(function(response) {
            if (response._embedded) {
                me.listings = response._embedded.item;
            }
            me.doTrigger();
        });
	},

	doTrigger: function () {
	        this.trigger(this.getDefaultData());
	},

	getDefaultData: function () {
	        return this.listings;
	}
});

module.exports = ProfileStore;