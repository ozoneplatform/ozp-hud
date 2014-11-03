/** @jsx React.DOM */
'use strict';

var React = require('react');
var Reflux = require('reflux');
var Immutable = require('immutable');

var LibraryActions = require('../../actions/Library');
var FolderLibraryStore = require('../../store/FolderLibrary');
var LibraryTile = require('./LibraryTile');

var appsMallLogo  = './images/AppsMall_Icon.png';

//var dirtyLibrary = false;
//var dragged;

var Library = React.createClass({
    mixins: [Reflux.connect(FolderLibraryStore, 'library')],

    getInitialState: function() {
        return {library: Immutable.List()};
    },

    componentWillUnmount: function () {
        clearInterval(this.interval);
    },

    componentWillMount : function () {
        this.interval = setInterval(LibraryActions.fetchLibrary, 5000);
        LibraryActions.fetchLibrary();
    },

    //sort: function (items, dragging) {
        //var data = this.state.data;

        //var flattenedItems = items.reduce(function(accum, current, index, array) {
            //if(current.folder !== null){
                //var flatFolder = current.items.reduce(function(a, b) {
                    //return a.concat(b);
                //}, []);
                //return accum.concat(flatFolder);
            //} else{
                //return accum.concat(current);
            //}
        //}, []);

        //data.items = flattenedItems;
        //data.dragging = dragging;
        //this.setState({data: data});
    //},

    //folderRename: function (targetFolder, newName) {
        //console.log('folderRename');
        //dirtyLibrary = true;
        //var data = this.state.data;

       //var folderNames = [];
        //data.items.map(function (item) {
            //if(item.folder !== null){
               //folderNames.push(item.folder);
           //}
        //});

        //if(folderNames.indexOf(newName) !== -1){
            //window.alert('There is already a folder by that name.');
            //return;
        //}


        //data.items.forEach(function (app) {

            //if (app.folder === targetFolder) {
                //app.folder = newName;
            //}
        //});

        //this.setState({data: data});
        ////this.putToBackend();

    //},

    //assignToFolder: function (app, folder) {
        //dirtyLibrary = true;
        //var items = this.state.data.items;
        //var appIndex = items.indexOf(app);
        //items[appIndex].folder = folder;
        //this.setState({data: {items: items}});
    //},

    render: function () {
        var elements = this.state.library.map(function(item) {
            /* jshint ignore:start */
            return FolderLibraryStore.isFolder(item) ?
                <FolderTile folder={item} /> :
                <LibraryTile entry={item} />
            /* jshint ignore:end */
        });

        if (elements.size) {
            /* jshint ignore:start */
            return (
                <ul className="ApplicationLibrary">{elements.toArray()}</ul>
            );
            /* jshint ignore:end */
        }
        else {
            /* jshint ignore:start */
            return (
                <div className="applib-main">
                    <h3 className="applib"><b>Application Library</b></h3>
                    <h1 className="empty-app-text">You currently have no <br /> Apps to display</h1>
                    <h2 className="visit-appsmall">Visit the AppsMall to discover <br />Apps you can start using</h2>
                    <form method="get" action="http://ozone-development.github.io/center-ui/index.html">
                        <p className="visit-button-text"><button type="submit" className="empty-text-button"><img src={appsMallLogo} /> AppsMall</button></p>
                    </form>
                </div>
            );
            /* jshint ignore:end */
        }
    },

    //onDragStart: function () {
        //dirtyLibrary = true;
    //},

    //onDragEnd: function () {
        //this.putToBackend();
        //dirtyLibrary = false;
    //}

});

module.exports = Library;
