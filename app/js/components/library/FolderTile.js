/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Sortable = require('../sortable/Sortable');
var LibraryActions = require('../../actions/Library');
var Link = require('react-router').Link;
var Constants = require('../../Constants');

var FolderTile = React.createClass({

    onDragStart: function(evt) {
        var folder = this.props.folder,
            json = JSON.stringify(folder),
            dt = evt.dataTransfer;

        dt.setData(Constants.folderDataType, json);
        dt.setData('application/json', json);
        dt.setData('text/plain', folder.name);

        dt.effectAllowed = 'move';
    },

    render: function() {
        var folder = this.props.folder,
            entryIcons = folder.entries.map(function(entry) {
                var src = entry.listing.imageMediumUrl;

                /* jshint ignore:start */
                return <img key={src} src={src} draggable="false" />;
                /* jshint ignore:end */
            });

        /* jshint ignore:start */
        return (
            <li className="FolderTile" data-folder-name={folder.name} draggable="true"
                    onDragStart={this.onDragStart}>
                <Link className="FolderTile__folderView" to="folder"
                        params={{name: folder.name}} draggable="false">
                    {entryIcons.toArray()}
                </Link>
                <h5>{folder.name}</h5>
            </li>
        );
        /* jshint ignore:end */
    }
});

module.exports = FolderTile;
