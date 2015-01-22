/** @jsx React.DOM */
'use strict';

var React = require('react');
var Constants = require('../../Constants');

var EmptyLibrary = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <div className="FolderLibrary__empty">
                <h2>You have no bookmarked apps to display</h2>
                <h4>Visit Marketplace to discover new apps that you can start using.</h4>
                <a target="_blank" href={CENTER_URL}>
                    <img src={Constants.mpLogo} alt="Marketplace"/>
                </a>
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = EmptyLibrary;
