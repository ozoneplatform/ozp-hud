'use strict';

var Reflux = require('reflux');
var ListingActions = require('../actions/Listing');
var ListingApi = require('../api/Listing');

var ChangeLogStore = Reflux.createStore({

    listenables: [ ListingActions ],

    changelogs: [],
    userChangelogs: [],

    onFetchAllChangeLogs: function () {
        var me = this;

        ListingApi.getAllChangeLogs().then(function(response) {
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

    onFetchOwnedChangeLogs: function () {
        var me = this;

        ListingApi.getOwnedChangeLogs().then(function(response) {
            if (response._embedded) {
                me.userChangelogs = response._embedded.item;
            } 
            me.doUserTrigger();
        });
    },

    doUserTrigger: function() {
        this.trigger(this.getUserDefaultData());
    },

    getUserDefaultData: function() {
        return this.userChangelogs;
    }

});

module.exports = ChangeLogStore;