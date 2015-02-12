/** @jsx React.DOM */
'use strict';

var React = require('react');
var Immutable = require('immutable');
var DragAndDropUtils = require('../../util/DragAndDrop');
var Constants = require('../../Constants');

var LibraryActions = require('../../actions/Library');

/**
 * A separator for use as a drop target for reordering listings. This should be inserted between
 * each item in the library
 */
var DropSeparator = React.createClass({

    getInitialState: function() {
        return { dropHighlight: false };
    },

    onDrag: function(evt) {
        var allowDrop =
            DragAndDropUtils.dragOver(
                Immutable.List([Constants.libraryEntryDataType, Constants.folderDataType]),
                evt);

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

            //we want the actual object from the store, not a deserialized copy of it
            entry = this.props.store.getModelByData(data);

        evt.preventDefault();
        evt.stopPropagation();
        this.onDragLeave();

        LibraryActions.reorder(this.props.prev, entry, this.props.next);
    },

    render: function() {
        var classes = React.addons.classSet({
            DropSeparator: true,
            'drag-hover': this.state.dropHighlight
        });

        return (
            <span className={classes}
                onDragEnter={this.onDrag} onDragOver={this.onDrag}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop} />
        );
    }
});

/**
 * A list item in the application library.  This includes a DragSeparator along with
 * an optional Listing or Folder tile
 * @prop next The next tile in the list after the one represented here
 * @prop prev The previous tile in the list before the one represented here
 */
var LibraryItem = React.createClass({
    render: function() {
        var store = this.props.store,
            prev = this.props.prev,
            curr = this.props.curr,
            next = this.props.next;

        return (
            <li className="LibraryTiles__item">
                <DropSeparator store={store} prev={prev} next={curr}/>
                {this.props.children}
                <DropSeparator store={store} prev={curr} next={next}/>
            </li>
        );
    }
});

module.exports = LibraryItem;
