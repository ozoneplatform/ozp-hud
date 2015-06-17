'use strict';

var $ = require('jquery');

var { API_URL } = require('OzoneConfig');

var ListingApi = {
    getOwnedListings: function() {
    	return $.getJSON(`${API_URL}/api/profile/self/listing`);
    },

    getAllListings: function() {
        return $.getJSON(`${API_URL}/api/listing`);
    },

    getOwnedChangeLogs: function() {
    	return $.getJSON(`${API_URL}/api/profile/self/listing/activity`);
    },

    getAllChangeLogs: function () {
        return $.getJSON(`${API_URL}/api/listing/activity`);
    }
};

module.exports = ListingApi;