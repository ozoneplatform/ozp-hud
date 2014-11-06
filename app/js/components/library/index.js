/** @jsx React.DOM */
'use strict';

var React = require('react');
var Reflux = require('reflux');
var Immutable = require('immutable');

var LibraryActions = require('../../actions/Library');
var FolderLibraryStore = require('../../store/FolderLibrary');
var LibraryTile = require('./LibraryTile');
var FolderTile = require('./FolderTile');
var Folder = require('../../api/Folder');
var Constants = require('../../Constants');


/**
 * A separator for use as a drop target for reordering listings. This should be inserted between
 * each item in the library
 */
var DropSeparator = React.createClass({

    getInitialState: function() {
        return { dropHighlight: false };
    },

    getDefaultProps: function() {
        return {allowFolderCreate: true};
    },

    onDrag: function(evt) {
        var dt = evt.dataTransfer;

        if (((dt.types.indexOf(Constants.libraryEntryDataType) !== - 1) ||
                (dt.types.indexOf(Constants.folderDataType) !== - 1)) &&
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
        var classes = React.addons.classSet({
            DropSeparator: true,
            'drag-hover': this.state.dropHighlight
        });

        /* jshint ignore:start */
        return (
            <li className={classes}
                onDragEnter={this.onDrag} onDragOver={this.onDrag}
                onDragLeave={this.onDragLeave} onDragStop={this.onDragLeave}
                onDrop={this.onDrop} />
        );
        /* jshint ignore:end */
    }
});

/**
 * The view of the user's Application Library
 */
var Library = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState: function() {
        return {library: Immutable.List()};
    },

    onStoreChange: function(library) {
        //this conditional is necessary because, when a folder modal is closed, the same event
        //will both unmount this component and cause this function to get called (the unmount
        //happens first).  Since setState on an unmounted component is illegal, we have to check
        if (this.isMounted()) {
            this.setState({library: library});
        }
    },

    componentDidMount : function () {
        this.listenTo(this.props.store, this.onStoreChange);

        //immediately get whatever data is in the store
        this.onStoreChange(this.props.store.getDefaultData());
    },

    /**
     * Find an entry or folder in the library that "matches" the passed in object, meaning
     * that it has the same listing id or folder name.  This is needed by drag and drop since
     * the passed data there must be serialized as a string
     */
    getModelByData: function(data) {
        return data.listing ?
            this.state.library.find(function(ent) {
                return !(ent instanceof Folder) &&
                    ent.listing.id === data.listing.id;
            }) :
            this.state.library.find(function(ent) {
                return (ent instanceof Folder) &&
                    ent.name === data.name;
            });
    },

    /**
     * given a DOM node that should be either a LibraryTile or a FolderTile, find the
     * record in the state that it was generated from
     */
    getModelByNode: function(node) {
        if (node) {
            var listingId = node.dataset.listingId,
                folderName = node.dataset.folderName;

            if (listingId) {
                return this.state.library.find(function(ent) {
                    return !(ent instanceof Folder) &&
                        ent.listing.id === parseInt(listingId, 10);
                });
            }
            else if (folderName) {
                return this.state.library.find(function(ent) {
                    return ent instanceof Folder &&
                        ent.name === folderName;
                });
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    },

    onDrop: function(evt) {
        var dt = evt.dataTransfer,
            json = dt.getData(Constants.libraryEntryDataType) ||
                dt.getData(Constants.folderDataType),
            data = JSON.parse(json),
            dropTarget = evt.target,
            previousNode = dropTarget.previousSibling,
            nextNode = dropTarget.nextSibling,

            //we want the actual object from the store, not a deserialized copy of it
            entry = this.getModelByData(data),
            previousEntry = this.getModelByNode(previousNode),
            nextEntry = this.getModelByNode(nextNode);

        evt.preventDefault();
        evt.stopPropagation();

        LibraryActions.reorder(previousEntry, entry, nextEntry);
    },

    onDropOnItem: function(evt) {
        var dt = evt.dataTransfer,
            json = dt.getData(Constants.libraryEntryDataType) ||
                dt.getData(Constants.folderDataType),
            data = JSON.parse(json),
            dropTarget = evt.currentTarget,
            droppedEntry = this.getModelByData(data),
            targetItem = this.getModelByNode(dropTarget);

        if (targetItem instanceof Folder) {
            LibraryActions.addToFolder(targetItem, droppedEntry);
        }
        else {
            LibraryActions.createFolder('New Folder',
                    Immutable.List.of(targetItem, droppedEntry));
        }
    },

    render: function () {
        function makeDropSeparator() {
            /* jshint ignore:start */
            return <DropSeparator onDrop={me.onDrop} />;
            /* jshint ignore:end */
        }

        var me = this,
            onDropOnItem = this.props.allowFolderCreate ? this.onDropOnItem : undefined,
            elements = this.state.library.map(function(item) {
                    /* jshint ignore:start */
                    return item instanceof Folder ?
                        <FolderTile key={'folder-' + item.name} folder={item}
                            onDrop={onDropOnItem}/> :
                        <LibraryTile key={'listing-' + item.listing.id} entry={item}
                            onDrop={onDropOnItem}/>
                    /* jshint ignore:end */
                })
                .reduce(function(acc, elem) {
                    //intersperse with DropSeparators
                    return acc.push(elem).push(makeDropSeparator());
                    /* jshint ignore:end */
                }, Immutable.List())
                //need a additional separator at the beginning
                .unshift(makeDropSeparator());


        if (elements.size) {
            /* jshint ignore:start */
            return (
                <ol className="LibraryTiles">
                    {elements.toArray()}
                </ol>
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
                        <p className="visit-button-text"><button type="submit" className="empty-text-button"><img src={Constants.appsMallLogo} /> AppsMall</button></p>
                    </form>
                </div>
            );
            /* jshint ignore:end */
        }
    }
});

module.exports = Library;
