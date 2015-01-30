'use strict';

var Reflux = require('reflux');

var SelfApi = require('../api/Self').SelfApi;

var SelfStore = Reflux.createStore({

    currentProfile: null,

    init: function() {
        var me = this;

        SelfApi.fetchSelf().then(function(profile) {
            me.currentProfile = profile;

            me.trigger(profile);
        });
    },

    getDefaultData: function() {
        return this.currentProfile;
    }
});

module.exports = SelfStore;
