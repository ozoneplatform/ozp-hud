/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Sortable = require('../sortable/Sortable');
var LibraryActions = require('../../actions/Library');
var Link = require('react-router').Link;
var Constants = require('../../Constants');

var FolderTitle = require('../folder/FolderTitle');

var FolderTile = React.createClass({

    getInitialState: function() {
        return {
            dropHighlight: true,
            editingTitle: false
        };
    },

    onDragStart: function(evt) {
        var folder = this.props.folder,
            json = JSON.stringify(folder),
            dt = evt.dataTransfer;

        dt.setData(Constants.folderDataType, json);
        dt.setData('application/json', json);
        dt.setData('text/plain', folder.name);

        dt.effectAllowed = 'move';
    },

    onDragOver: function(evt) {
        var dt = evt.dataTransfer;

        if ((dt.types.indexOf(Constants.libraryEntryDataType) !== - 1) &&
                dt.effectAllowed.toLowerCase().indexOf('move') !== -1) {
            evt.preventDefault();
            dt.dropEffect = 'move';
            this.setState({dropHighlight: true});
        }
    },

    onDragLeave: function() {
        this.setState({dropHighlight: false});
    },

    onDrop: function(evt) {
        this.onDragLeave();
        this.props.onDrop(evt);
    },

    render: function() {
        var folder = this.props.folder,
            classes = React.addons.classSet({
                FolderTile: true,
                'drag-hover': this.state.dropHighlight
            }),
            entryIcons = folder.entries.map(function(entry) {
                var src = entry.listing.imageMediumUrl;

                /* jshint ignore:start */
                return <img key={src} src={src} draggable="false" />;
                /* jshint ignore:end */
            });

        /* jshint ignore:start */
        return (
            <li className={classes} data-folder-name={folder.name}
                    onDragOver={this.onDragOver} onDragEnter={this.onDragOver}
                    onDragLeave={this.onDragLeave} onDragStop={this.onDragLeave}
                    onDrop={this.onDrop}
                    draggable="true" onDragStart={this.onDragStart}>
                <Link className="FolderTile__folderView" to="folder"
                        params={{name: folder.name}} draggable="false">
                    {entryIcons.toArray()}
                </Link>
                <FolderTitle name={folder.name} element={React.DOM.h5}/>
            </li>
        );
        /* jshint ignore:end */
    }
});

module.exports = FolderTile;
