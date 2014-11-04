/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Sortable = require('../sortable/Sortable');
var LibraryActions = require('../../actions/Library');
var Link = require('react-router').Link;

var FolderTile = React.createClass({
    render: function() {
        var folder = this.props.folder,
            entryIcons = folder.entries.map(function(entry) {
                /* jshint ignore:start */
                return <img src={entry.listing.imageMediumUrl} />;
                /* jshint ignore:end */
            });

        /* jshint ignore:start */
        return (
            <li className="FolderTile">
                <Link className="FolderTile__folderView" to="folder"
                        params={{name: folder.name}}>
                    {entryIcons.toArray()}
                </Link>
                <h5>{folder.name}</h5>
            </li>
        );
        /* jshint ignore:end */
    }
});

module.exports = FolderTile;
