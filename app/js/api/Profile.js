'use strict';

var $ = require('jquery');

var selfUrl = API_URL + '/api/profile/self';

module.exports.ProfileApi = {
    fetchSelf: function() {
        return $.getJSON(selfUrl)
            .fail(function(response) {
                console.log('Error fetching self profile', response.status,
                    response.responseJSON || response.responseText);
            });
    }
};
