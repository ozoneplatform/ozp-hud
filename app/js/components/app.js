/** @jsx React.DOM */

'use strict';

var React = require('react');

var Header = require('./header');
var Library = require('./library');
var Settings = require('./settings');
var HelpModal = require('./header/helpmodal.js');

var LibraryActions = require('../actions/Library');
var FolderLibraryStore = require('../store/FolderLibrary');


var App = React.createClass({

    componentDidMount: function() {
        this.interval = setInterval(LibraryActions.fetchLibrary, 5000);
        LibraryActions.fetchLibrary();
    },

    componentDidUnmount: function () {
        clearInterval(this.interval);
    },

    render: function () {
        /*jshint ignore:start */
        return (
            <div>
                <Header />
                <Library store={FolderLibraryStore} />
                <Settings />
                <HelpModal />
                <this.props.activeRouteHandler />
            </div>
        );
        /*jshint ignore:end */
    }
});

module.exports = App;
