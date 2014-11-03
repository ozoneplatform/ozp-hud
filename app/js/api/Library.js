'use strict';

var $ = require('jquery');

module.exports.LibraryApi = {
    get: function() {
        return $.getJSON(API_URL + '/api/profile/self/library')
            .fail(function(response) {
                console.log('Error fetching library', response.status,
                    response.responseJSON || response.responseText);
            });
    },

    save: function(libraryEntries) {
        return $.ajax({
            type: 'PUT',
            dataType: 'json',
            contentType: 'application/json',
            url: API_URL + '/api/profile/self/library',
            data: JSON.stringify(libraryEntries)
        }).fail(function(response) {
            console.error('Error updating library', response.status,
                    response.responseJSON || response.responseText);
        });
    },
    del: function(listingId) {
        return $.ajax({
            type: 'DELETE',
            dataType: 'json',
            url: API_URL + '/api/profile/self/library/' + encodeURIComponent(listingId)
        }).fail(function(response) {
            console.error('Error removing Listing with id ' + listingId + 'from library',
                    response.status, response.responseJSON || response.responseText);
        });
    }
};
