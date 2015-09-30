'use strict';

var React = require('react');

var ContactsWindow = require('ozp-react-commons/components/contacts/ContactsWindow.jsx');

var HudContactsWindow = React.createClass({
    render: function() {
        return (
            <ContactsWindow backRoute="/" />
        );
    }
});

module.exports = HudContactsWindow;
