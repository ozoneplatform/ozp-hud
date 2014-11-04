/** @jsx React.DOM */

'use strict';

var React = require('react');

var Header = require('./header');
var Library = require('./library');
var Settings = require('./settings');
var HelpModal = require('./header/helpmodal.js');

var App = React.createClass({

    render: function () {
        /*jshint ignore:start */
        return (
            <div>
                <Header />
                <Library />
                <Settings />
                <HelpModal />
                <this.props.activeRouteHandler />
            </div>
        );
        /*jshint ignore:end */
    }
});

module.exports = App;
