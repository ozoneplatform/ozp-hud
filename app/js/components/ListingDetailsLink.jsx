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
    propTypes: {
        listingId: React.PropTypes.number.isRequired,
        tab: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {tab: 'overview'};
    },

    getURI: function() {
        var id = this.props.listingId,
            tab = this.props.tab;

        return `${centerUrl}#/home?listing=${encodeURIComponent(id)}&action=view&tab=${tab}`;
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
