/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Immutable = require('immutable');
var Link = require('react-router').Link;
var Constants = require('../../Constants');
var DragAndDropUtils = require('../../util/DragAndDrop');
var RandomBase16 = require('../../util/RandomBase16');

var LibraryActions = require('../../actions/Library');

var FolderTitle = require('../folder/FolderTitle.jsx');

var FolderTile = React.createClass({

    getInitialState: function() {
        return {
            dropHighlight: false,
            editingTitle: false,
            checked: false
        };
    },
   
    componentDidMount: function() {
        $('html').click(() => {
          if (this.isMounted()) {
            this.setState({checked: false});
          }
        });
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
        var dropInfo = DragAndDropUtils.getDropInfo(evt),
            data = dropInfo.data,
            droppedEntry = this.props.store.getModelByData(data);

        LibraryActions.addToFolder(this.props.folder, droppedEntry);
        this.onDragLeave();

        evt.preventDefault();
    },

    render: function() {
        var folder = this.props.folder,
            classes = React.addons.classSet({
                FolderTile: true,
                'drag-hover': this.state.dropHighlight
            }),
            entryIcons = folder.entries.map(function(entry) {
                var src = entry.listing.large_icon.url;

                return <img key={`${entry.listing.id}-${RandomBase16(6)}`} src={src} draggable="false" />;
            }),
            //react-router doesn't handle special characters correctly so we must escape them ourselves
            nameParam = encodeURIComponent(folder.name);
            var deleteFolder = LibraryActions.deleteFolder.bind(null,folder);

        return (
            <div className={classes} data-folder-name={folder.name}
                    onDragOver={this.onDragOver} onDragEnter={this.onDragOver}
                    onDragLeave={this.onDragLeave} onDrop={this.onDrop}
                    draggable="true" onDragStart={this.onDragStart}>
                <label className="FolderTile__actionMenu">
                    <input ref="checkbox" type="checkbox" checked={this.state.checked} onChange={() => {
                        this.setState({checked: true});
                    }}/>
                    <span className="FolderTile__actionMenuButton">
                        <i className="icon-caret-down-14-grayLightest" />
                    </span>
                    <ul>
                        <li><a onClick={deleteFolder}>Delete Folder</a></li>
                    </ul>
                </label>
                <Link ref="folderView" className="FolderTile__folderView" to="folder"
                        params={{name: nameParam}} draggable="false">
                    {entryIcons.toArray()}
                </Link>
                <FolderTitle name={folder.name} element={React.DOM.h5}/>
            </div>
        );
    }
});

module.exports = FolderTile;
