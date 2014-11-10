/** @jsx React.DOM */
'use strict';

var React = require('react');
var Constants = require('../../Constants');

var EmptyLibrary = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <div className="FolderLibrary__empty">
                <h1>You currently have no Apps to display</h1>
                <h2>Visit the AppsMall to discover Apps you can start using</h2>
                <a target="_blank" href={CENTER_URL}>
                    <img src={Constants.appsMallLogo} /> AppsMall
                </a>
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = EmptyLibrary;
