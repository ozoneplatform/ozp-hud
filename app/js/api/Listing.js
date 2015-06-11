'use strict';

var $ = require('jquery');

var { API_URL } = require('OzoneConfig');

var url = API_URL + '/api/listing';

var ListingApi = {
    get: function() {
        return $.getJSON(url)
            .fail(function(response) {
                console.log('Error fetching listings', response.status,
                    response.responseJSON || response.responseText);
            });
    },

    getOwnedListings: function() {
    	return $.getJSON(`${API_URL}/api/profile/self/listing`);
    },

    getOwnedChangeLogs: function() {
    	return $.getJSON(`${API_URL}/api/profile/self/listing/activity`);

    }
};

module.exports = ListingApi;