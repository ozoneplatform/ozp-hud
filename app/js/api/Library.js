'use strict';

var $ = require('jquery');

var { API_URL } = require('OzoneConfig');

var url = API_URL + '/api/self/library/';
var LibraryActions = require('../actions/Library');

module.exports.LibraryApi = {
    get: function() {
        return $.getJSON(url)
            .fail(function(response) {
                console.log('Error fetching library', response.status,
                    response.responseJSON || response.responseText);
            });
    },

    share: function(folder, peer, message) {
      return $.ajax({
          type: 'POST',
          dataType: 'json',
          contentType: 'application/json',
          url: API_URL + '/api/notification/',
          data: JSON.stringify({
            "expires_date": new Date(new Date().setYear(new Date().getFullYear() + 1)).toISOString(),
            "message": message,
            "peer": {
              "user": {
                "username": peer
              },
              "folder_name": folder
            }
          })
      });
    },

    save: function(libraryEntries) {
        // Reorder Function
        var libraryEntriesList = libraryEntries.map(function(e,ind){
                                                    var tempObj = {};

                                                    for(var i in e){
                                                        tempObj[i] = e[i];
                                                    }

                                                    tempObj.position = ind;
                                                    return tempObj;
                                                });

        return $.ajax({
            type: 'PUT',
            dataType: 'json',
            contentType: 'application/json',
            url: url + 'update_all/',
            data: JSON.stringify(libraryEntriesList)
        }).fail(function(response) {
            console.error('Error updating library', response.status,
                    response.responseJSON || response.responseText);
        }).done(() => {
            LibraryActions.fetchLibrary();
        });
    },

    create: function(entry, cb) {
        return $.ajax({
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            url: url,
            data: JSON.stringify(entry)
        }).done(res => {
          cb(res);
        });
    },

    del: function(libraryId) {
        return $.ajax({
            type: 'DELETE',
            dataType: 'json',
            url: url + `${encodeURIComponent(libraryId)}/`
        }).fail(function(response) {
            console.error('Error removing Listing with id ' + libraryId + ' from library',
                    response.status, response.responseJSON || response.responseText);
        });
    }
};
