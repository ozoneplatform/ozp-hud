'use strict';

var React = require('react');

var SettingsWindow = require('ozp-react-commons/components/profile/SettingsWindow.jsx');

var HudSettingsWindow = React.createClass({
    render: function() {
        return (
            <SettingsWindow backRoute="/" />
        );
    }
});

module.exports = HudSettingsWindow;
