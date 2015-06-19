'use strict';

var Reflux = require('reflux');
var ListingApi = require('../api/Listing');
var ListingActions = require('../actions/Listing');

var ListingStore = Reflux.createStore({

    listenables: [ ListingActions ],

    listings: [],
    userListings: [],

    onFetchAllListings: function () {
        var me = this;

        ListingApi.getAllListings().then(function(response) {
            me.listings = response._embedded.item;
            me.doTrigger();
        });
    },

    onFetchOwnedListings: function () {
        var me = this;

        ListingApi.getOwnedListings().then(function(response) {
            if (response._embedded) {
                me.userListings = response._embedded.item;
            }
            me.doUserTrigger();
        });
    },

    doUserTrigger: function () {
        this.trigger(this.getUserDefaultData());
    },

    doTrigger: function() {
        this.trigger(this.getDefaultData());
    },

    getDefaultData: function() {
        return this.listings;
    },

    getUserDefaultData: function () {
        return this.userListings;
    }

});

module.exports = ListingStore;