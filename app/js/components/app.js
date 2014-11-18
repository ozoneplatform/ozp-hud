/** @jsx React.DOM */

'use strict';

var React = require('react');

var Header = require('./header');
var Library = require('./library');
var EmptyLibrary = require('./library/EmptyLibrary');
var Settings = require('./settings');
var HelpModal = require('./header/helpmodal.js');

var LibraryActions = require('../actions/Library');
var FolderLibraryStore = require('../store/FolderLibrary');


var App = React.createClass({

    componentDidMount: function() {
        window.addEventListener('focus', LibraryActions.fetchLibrary);
        LibraryActions.fetchLibrary();
    },

    componentDidUnmount: function () {
        window.removeEventListener('focus', LibraryActions.fetchLibrary);
    },

    render: function () {
        /*jshint ignore:start */
        return (
            <div>
                <Header />
                <div className="FolderLibrary">
                    <h3>Application Library</h3>
                    <Library store={FolderLibraryStore} emptyView={EmptyLibrary}/>
                </div>
                <Settings />
                <HelpModal />
                <this.props.activeRouteHandler />
            </div>
        );
        /*jshint ignore:end */
    }
});

module.exports = App;
