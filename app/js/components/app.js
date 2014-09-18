/** @jsx React.DOM */

'use strict';

var React = require('react');
var Header = require('./header');
var Library = require('./library');
var Settings = require('./settings');
var HelpModal = require('./header/helpmodal.js');

var APP = React.createClass({

    render: function () {
        return this.renderHUD();
    },

    renderHUD: function () {
        /*jshint ignore:start */
        return (
            <div>
                <Header />
                <Library />
                <Settings />
                <HelpModal />
            </div>
        );
        /*jshint ignore:end */
    }
});

module.exports = APP;