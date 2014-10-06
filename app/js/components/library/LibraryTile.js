/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Sortable = require('../sortable/Sortable');
var Folder = require('../folder');

var launchApplication = function (url) {
    window.open(url);
};

var ApplicationTile = React.createClass({

    render: function () {
        var app = this.props.app;
        var listing = app.listing;
        var removeBookmark = this.props.removeBookmark;

        /*jshint ignore:start */
        return (
            <div>
                <i className="fa fa-ellipsis-h fa-2x tileIcon" data-toggle="dropdown"></i>
                <ul className="dropdown-menu tileIcon-dropdown" role="menu">
                    <li onClick={ removeBookmark.bind(null, app) }>Remove Bookmark</li>
                </ul>
                <img className="applib-tiles" src={ listing.imageLargeUrl } onClick={ launchApplication.bind(null, listing.launchUrl) }/>
                <h5 className="ozp-lib-name">{ listing.title }</h5>
            </div>
        );
        /*jshint ignore:end */
    }
});

var LibraryTile = React.createClass({

    mixins: [ Sortable ],

    render: function () {
        var click = this.clickImage;
        var app = this.props.item;
        var removeBookmark = this.props.removeBookmark;
        var isListing = app.folder === null || !!app.listing;
        var id = (app.folder || app.listing.title).replace(/\W/g, '');

        /*jshint ignore:start */
        return this.transferPropsTo(
            <li id={ id }
                className={ this.isDragging() ? 'dragging' : '' }
                onDragStart={this.sortStart}
                onDragOver={this.dragOver}
                onDrop={this.sortEnd}>
                {
                    isListing ?
                        <ApplicationTile app={ app } removeBookmark={ removeBookmark }/> :
                        <Folder folder={app} removeBookmark={ removeBookmark } rename={this.props.rename}/>
                }
            </li>
        );
        /*jshint ignore:end */
    }

});

module.exports = LibraryTile;