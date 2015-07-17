'use strict';

var Reflux = require('reflux');
var ListingApi = require('../api/Listing');
var ListingActions = require('../actions/Listing');

var ProfileStore = Reflux.createStore({

    listenables: [ ListingActions ],

    listings: null,

	onFetchOwnedListings: function () {
        var me = this;
        ListingApi.getOwnedListings().then(function(response) {
            if (response._embedded) {
                me.listings = response._embedded.item;
                if (!Array.isArray(me.listings)) {
                    me.listings = [me.listings];
                }
            }else{
                me.listings = [];
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