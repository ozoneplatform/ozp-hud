'use strict';

var React = require('react');

var ProfileWindow = require('ozp-react-commons/components/profile/ProfileWindow.jsx');
var ListingDetailsLink = require('../ListingDetailsLink.jsx');

var CurrentProfileWindow = React.createClass({
    render: function() {
        /*jshint ignore:start */
        return (
            <ProfileWindow
                listingLinkEl={ListingDetailsLink}
                profileId="self"
                backRoute="/"/>
        );
        /*jshint ignore:end */
    }
});

module.exports = CurrentProfileWindow;
