/** @jsx React.DOM */
'use strict';

var React = require('react');

var appsMallLogo  = './images/AppsMall_Icon.png';
var LibraryTile = require('./LibraryTile');

var dirtyLibrary = false;
var dragged;

var Library = React.createClass({

    getInitialState: function () {
        return {
            data: {
                items: []
            }
        };
    },

    clickImage: function (url) {
        window.open(url);
    },

    getData: function () {
        var me = this;

        if (dirtyLibrary) {
            return;
        }

        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: 'http://localhost:8080/marketplace/api/profile/self/library',
            success: function (data) {
                me.setState({
                    data: {
                        items: data
                    }
                });
            },
            failure: function () {
                console.log('MarketPlace REST call failed. Loading with no applications');
            }
        });
    },

    componentWillUnmount: function () {
        clearInterval(this.interval);
    },

    componentWillMount : function () {
        this.interval = setInterval(this.getData, 5000);
        this.getData();
    },

    sort: function (items, dragging) {
        var data = this.state.data;

        var flattenedItems = items.reduce(function(accum, current, index, array) {
            if(current.folder !== null){
                var flatFolder = current.items.reduce(function(a, b) {
                    return a.concat(b);
                }, []);
                return accum.concat(flatFolder);
            } else{
                return accum.concat(current);
            }
        }, []);

        data.items = flattenedItems;
        data.dragging = dragging;
        this.setState({data: data});
    },

    disconnect: function (app) {
        var i = this.state.data.items.indexOf(app);
        this.state.data.items.splice(i, 1);
        this.setState({data: {items: this.state.data.items}});

        $.ajax({
            type: 'DELETE',
            dataType: 'json',
            url: 'http://localhost:8080/marketplace/api/profile/self/library/' + app.serviceItem.id
        });
    },

    folderRename: function (targetFolder, newName) {
        console.log('folderRename');
        if (newName === '') {
            return;
        }
        dirtyLibrary = true;
        var data = this.state.data;
        data.items.forEach(function (app) {

            if (app.folder === targetFolder) {
                app.folder = newName;
            }
        });

        this.setState({data: data});
        this.putToBackend();

    },

    putToBackend: function () {
        $.ajax({
            type: 'PUT',
            dataType: 'json',
            contentType: 'application/json',
            url: 'http://localhost:8080/marketplace/api/profile/self/library/',
            data: JSON.stringify(this.state.data.items),
            success: function (data) {
                dirtyLibrary = false;
                console.log('PUT sucessful.');
            }
        });
    },

    assignToFolder: function (app, folder) {
        dirtyLibrary = true;
        var items = this.state.data.items;
        var appIndex = items.indexOf(app);
        items[appIndex].folder = folder;
        this.setState({data: {items: items}});
    },

    render: function () {
        var me = this;
        var foldersAndApps = [];
        this.state.data.items.map(function (app, i) {
            if (app.folder === null) {
                foldersAndApps.push(app);
            }
            else {
                var index = foldersAndApps.map(function (e) { return e.folder;}).indexOf(app.folder);
                if (index === -1) {
                    var tempFolder = {};
                    tempFolder.folder = app.folder;
                    tempFolder.items = [];
                    tempFolder.items.push(app);
                    foldersAndApps.push(tempFolder);
                }
                else {
                    foldersAndApps[index].items.push(app);
                }
            }
        }, this);

        /*jshint ignore:start */
        if (this.state.data.items.length >= 1) {       
            var data = {};
            data.items = foldersAndApps;
            data.dragging = this.state.data.dragging
            var disconnect = this.disconnect;
            var sort = this.sort;
            var rename = {renameFolder: this.folderRename, putToBackend: this.putToBackend};
            var assignToFolder = this.assignToFolder;
            var applicationList = foldersAndApps.map(function (app, i) {
                return (
                    <LibraryTile
                        sort={sort}
                        data={data}
                        key={i}
                        data-id={i}
                        item={app}
                        disconnect={disconnect}
                        rename={rename}
                        assignToFolder={ assignToFolder }
                        onDragStart={ me.onDragStart }
                        onDragEnd={ me.onDragEnd } />
                );
            });
            return (
                <div className="applib-main">
                    <h3 className="applib"><b>Application Library</b></h3>
                    <ul className="nav navbar-nav applib">
                        {applicationList}
                    </ul>
                </div>
            );
        }
        else {
            return (
                <div className="applib-main">
                    <h3 className="applib"><b>Application Library</b></h3>
                    <h1 className="empty-app-text">You currently have no <br /> Apps to display</h1>
                    <h2 className="visit-appsmall">Visit the AppsMall to discover <br />Apps you can start using</h2>
                    <form method="get" action="http://ozone-development.github.io/center-ui/dist/index.html">
                        <p className="visit-button-text"><button type="submit" className="empty-text-button"><img src={appsMallLogo} /> AppsMall</button></p>
                    </form>
                </div>
            );
        }
        /*jshint ignore:end */
    },

    onDragStart: function () {
        dirtyLibrary = true;
    },

    onDragEnd: function () {
        this.putToBackend();
        dirtyLibrary = false;
    }

});

module.exports = Library;