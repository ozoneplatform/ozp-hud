'use strict';

var React = require('react');
var { CENTER_URL } = require('ozp-react-commons/OzoneConfig');

//append / to CENTER_URL if necessary
var centerUrl = CENTER_URL.indexOf('/', CENTER_URL.length - 1) === -1 ?
    CENTER_URL + '/' : CENTER_URL;

/**
 * A component for creating <a> tags that link to the listing details view in the store
 */
var ListingDetailsLink = React.createClass({
    getURI: function() {
        return `${centerUrl}#/user-management/recent-activity`;
    },

    render: function() {
        var uri = this.getURI();

        return (
            <a className={this.props.className} href={uri}>
                {this.props.children}
            </a>
        );
    }
});

module.exports = ListingDetailsLink;
