'use strict';

var Reflux = require('reflux');
var ListingActions = require('../actions/Listing');
var ListingApi = require('../api/Listing');

var ProfileChangeLogStore = Reflux.createStore({

    listenables: [ ListingActions ],

    changelogs: [],
   
    onFetchOwnedChangeLogs: function () {
        var me = this;

        ListingApi.getOwnedChangeLogs().then(function(response) {
            if (response._embedded) {
                me.changelogs = response._embedded.item;
            } 
            me.doTrigger();
        });
    },

    doTrigger: function() {
        this.trigger(this.getDefaultData());
    },

    getDefaultData: function() {
        return this.changelogs;
    },

});

module.exports = ProfileChangeLogStore;