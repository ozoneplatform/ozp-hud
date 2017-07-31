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

    share: function(folder, peer, message, fn) {
      if(message.replace(/\s/g, '').length === 0){
        message = 'shared folder';
      }
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
      }).fail(function(response) {
          if(peer === '') {
              window.alert('Username not entered');
          } else if(response.responseJSON &&
              response.responseJSON.non_field_errors &&
              response.responseJSON.non_field_errors[0] === 'Valid User is Required'){
              window.alert('The username "' + peer + '" was not found.  Please check the spelling');
          } else {
              window.alert('Error sharing folder.  Please try again.');
          }
          console.log('Error sharing folder: ', response.status,
                  response.responseJSON || response.responseText);
      }).done(() => {
          fn();
          LibraryActions.fetchLibrary();
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
            console.log('Error updating library', response.status,
                    response.responseJSON || response.responseText);
        }).done(() => {
            LibraryActions.fetchLibrary();
        });
    },

    create: function(entry, cb, errorCb) {
        return $.ajax({
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            url: url + 'create_batch/',
            data: JSON.stringify(entry)
        }).fail(res => {if(errorCb){errorCb(res);}
      }).success(res => {if(cb){cb(res);}
            LibraryActions.fetchLibrary();
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
    },

    deleteFolder: function(appId) {
        return $.ajax({
            type: 'DELETE',
            dataType: 'json',
            url: url + `${encodeURIComponent(appId)}/` + 'delete_folder/'
        }).fail(function(response) {
            console.error('Error removing folder containing Listing with id ' + appId + ' from library',
                    response.status, response.responseJSON || response.responseText);
        });
    }
};
