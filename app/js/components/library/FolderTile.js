/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Immutable = require('immutable');
var Link = require('react-router').Link;
var Constants = require('../../Constants');
var DragAndDropUtils = require('../../util/DragAndDrop');

var FolderTitle = require('../folder/FolderTitle');

var FolderTile = React.createClass({

    getInitialState: function() {
        return {
            dropHighlight: false,
            editingTitle: false
        };
    },

    onDragStart: function(evt) {
        var folder = this.props.folder;

        DragAndDropUtils.startDrag(folder, folder.name, Constants.folderDataType,
                this.refs.folderView.getDOMNode(), evt);
    },

    onDragOver: function(evt) {
        var allowDrop =
            DragAndDropUtils.dragOver(Immutable.List.of(Constants.libraryEntryDataType), evt);

        if (allowDrop) {
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
                <Link ref="folderView" className="FolderTile__folderView" to="folder"
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
