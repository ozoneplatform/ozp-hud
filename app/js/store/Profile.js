'use strict';

var Reflux = require('reflux');

var ProfileApi = require('../api/Profile').ProfileApi;

var ProfileStore = Reflux.createStore({

    currentProfile: null,

    init: function() {
        var me = this;

        ProfileApi.fetchSelf().then(function(profile) {
            me.currentProfile = profile;

            me.trigger(profile);
        });
    },

    getDefaultData: function() {
        return this.currentProfile;
    }
});

module.exports = ProfileStore;
