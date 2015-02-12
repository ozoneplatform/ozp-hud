'use strict';

var React = require('react');
var Immutable = require('immutable');
var LibraryActions = require('../../actions/Library');
var Constants = require('../../Constants');
var DragAndDropUtils = require('../../util/DragAndDrop');

var ListingDetailsLink = require('../ListingDetailsLink.jsx');
var WebtopLaunchLink = require('ozp-react-commons/components/WebtopLaunchLink.jsx');
var TabLaunchLink = require('ozp-react-commons/components/TabLaunchLink.jsx');
var LaunchLink = require('ozp-react-commons/components/LaunchLink.jsx');


var ActionMenu = React.createClass({
    render: function() {
        var entry = this.props.entry,
            listing = entry.listing,
            removeBookmark = LibraryActions.removeFromLibrary.bind(null, entry);

        //use hidden checkbox to manage menu toggle state
        return (
            <label className="LibraryTile__actionMenu">
                <input ref="checkbox" type="checkbox" />
                <span className="LibraryTile__actionMenuButton" />
                <ul>
                    <li>
                        <WebtopLaunchLink listing={listing} newTab={false}>
                            Launch in Webtop
                        </WebtopLaunchLink>
                    </li>
                    <li>
                        <TabLaunchLink listing={listing} newTab={true}>
                            Launch in new tab
                        </TabLaunchLink>
                    </li>
                    <li>
                        <ListingDetailsLink listingId={listing.id} tab="resources">
                            Get help
                        </ListingDetailsLink>
                    </li>
                    <li><a onClick={removeBookmark}>Remove Bookmark</a></li>
                </ul>
            </label>
        );
    }
});

var LibraryTile = React.createClass({

    getInitialState: function() {
        return {dropHighlight: false};
    },

    onDragStart: function(evt) {
        var entry = this.props.entry;

        DragAndDropUtils.startDrag(entry, entry.listing.title, Constants.libraryEntryDataType,
                this.refs.banner.getDOMNode(), evt);
    },

    onDragOver: function(evt) {
        if (this.props.allowFolderCreate) {
            var allowDrop =
                DragAndDropUtils.dragOver(
                    Immutable.List([Constants.libraryEntryDataType]),
                    evt);

            if (allowDrop) {
                this.setState({dropHighlight: true});
            }
        }
    },

    onDragLeave: function() {
        this.setState({dropHighlight: false});
    },

    onDrop: function(evt) {
        var dropInfo = DragAndDropUtils.getDropInfo(evt),
            data = dropInfo.data,
            droppedEntry = this.props.store.getModelByData(data);

        LibraryActions.createFolder(Immutable.List.of(this.props.entry, droppedEntry));
        this.onDragLeave();

        evt.preventDefault();
    },

    render: function() {
        var entry = this.props.entry,
            listing = entry.listing,
            classes = React.addons.classSet({
                LibraryTile: true,
                'drag-hover': this.state.dropHighlight
            }),
            newTabSpec = {
                webtop: false,
                tab: true
            };


        return (
            <div className={classes} data-listing-id={listing.id}
                    onDragOver={this.onDragOver} onDragEnter={this.onDragOver}
                    onDragLeave={this.onDragLeave} onDrop={this.onDrop}
                    draggable="true" onDragStart={this.onDragStart}>
                <ActionMenu entry={entry} />
                <LaunchLink listing={listing} newTab={newTabSpec} draggable="false">
                    <img ref="banner" draggable="false" className="LibraryTile__img"
                        src={listing.imageLargeUrl} />
                </LaunchLink>
                <h5>{listing.title}</h5>
            </div>
        );
    }
});

module.exports = LibraryTile;
