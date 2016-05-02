'use strict';

var React = require('react');
var Immutable = require('immutable');
var LibraryActions = require('../../actions/Library');
var Constants = require('../../Constants');
var DragAndDropUtils = require('../../util/DragAndDrop');

var ListingDetailsLink = require('../ListingDetailsLink.jsx');
var LaunchLink = require('ozp-react-commons/components/LaunchLink.jsx');

var LibraryApi = require('../../api/Library').LibraryApi;

var ActionMenu = React.createClass({

    getInitialState: function() {
      return {
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

    render: function() {
        var entry = this.props.entry,
            listing = entry.listing,
            removeBookmark = LibraryActions.removeFromLibrary.bind(null, entry),
            duplicateBookmark = () => {
              LibraryApi.create({
                listing: {
                  id: entry.listing.id
                }
              }, () => {
                LibraryActions.fetchLibrary();
              });
            };

        //use hidden checkbox to manage menu toggle state
        return (
            <label className="LibraryTile__actionMenu">
                <input ref="checkbox" type="checkbox" checked={this.state.checked} onChange={() => {
                    this.setState({checked: true});
                  }}/>
                <span className="LibraryTile__actionMenuButton">
                     <i className="icon-caret-down-14-grayLightest" />
                </span>
                <ul>
                    <li>
                        <ListingDetailsLink listingId={listing.id} tab="resources">
                            Get help
                        </ListingDetailsLink>
                    </li>
                    <li><a onClick={removeBookmark}>Remove Bookmark</a></li>
                    <li><a onClick={duplicateBookmark}>Duplicate Bookmark</a></li>
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

        var recordLaunch = function() {
            var eventName = Constants.metrics.applicationsNewTab;
            window._paq.push(['trackEvent', eventName, listing.title, listing.agencyShort]);
        };

        return (
            <div className={classes} data-listing-id={listing.id}
                    onDragOver={this.onDragOver} onDragEnter={this.onDragOver}
                    onDragLeave={this.onDragLeave} onDrop={this.onDrop}
                    draggable="true" onDragStart={this.onDragStart}>
                <ActionMenu entry={entry} />
                <LaunchLink listing={listing} newTab={newTabSpec} draggable="false" afterClick={recordLaunch}>
                    <img ref="banner" draggable="false" className="LibraryTile__img"
                     src={listing.banner_icon.url} />
                </LaunchLink>
                <h5>{listing.title}</h5>
            </div>
        );
    }
});

module.exports = LibraryTile;
