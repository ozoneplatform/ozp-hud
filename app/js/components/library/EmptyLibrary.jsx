'use strict';

var React = require('react');
var Constants = require('../../Constants');

var { CENTER_URL } = require('OzoneConfig');

var EmptyLibrary = React.createClass({
    render: function() {
        return (
            <div className="FolderLibrary__empty">
                <h2>You have no bookmarked apps to display</h2>
                <h4>Visit Marketplace to discover new apps that you can start using.</h4>
                <a target="_blank" href={CENTER_URL}>
                    <img src={Constants.mpLogo} alt="Marketplace"/>
                </a>
            </div>
        );
    }
});

module.exports = EmptyLibrary;
