'use strict';

var React = require('react');
var LibraryActions = require('../../actions/Library');
var FolderLibraryStore = require('../../store/FolderLibrary');
var EmptyLibrary = require('../library/EmptyLibrary.jsx');
var Library = require('../library/index.jsx');


var LibraryWidget = React.createClass({

	componentDidMount: function () {
        window.addEventListener('focus', LibraryActions.fetchLibrary);
        LibraryActions.fetchLibrary();
	},

    componentDidUnmount: function () {
        $(document).off('show.bs.modal', '.modal');
        window.removeEventListener('focus', LibraryActions.fetchLibrary);
    },

	render: function () {

		return (
			<div className="custom-hud-component">
                <h1>My Bookmarks</h1>
                <Library store={FolderLibraryStore} emptyView={EmptyLibrary} className="scrollable"/>
            </div>
        );
	}
});

module.exports = LibraryWidget;