'use strict';

var React = require('react');
var Reflux = require('reflux');
var { RouteHandler } = require('react-router');
var Header = require('./header/index.jsx');
var Library = require('./library/index.jsx');
var EmptyLibrary = require('./library/EmptyLibrary.jsx');
var Settings = require('./settings/index.jsx');

var LibraryActions = require('../actions/Library');
var FolderLibraryStore = require('../store/FolderLibrary');
var CategorySubscriptionActions = require('ozp-react-commons/actions/CategorySubscriptionActions');
var CategorySubscriptionStore = require('ozp-react-commons/stores/CategorySubscriptionStore');
var TagSubscriptionActions = require('ozp-react-commons/actions/TagSubscriptionActions');
var TagSubscriptionStore = require('ozp-react-commons/stores/TagSubscriptionStore');


var App = React.createClass({
    mixins: [Reflux.connect(CategorySubscriptionStore, "categorySubscriptionStore"), Reflux.connect(TagSubscriptionStore, "tagSubscriptionStore"), Reflux.listenerMixin],

    componentDidMount: function() {
        $(document).on('show.bs.modal', '.modal', function () {
            $('.classBanner').last().css({
                position : 'fixed',
                bottom : '0%'
            });
        });

        LibraryActions.fetchLibrary();
        CategorySubscriptionActions.fetchSubscriptions();
        TagSubscriptionActions.fetchSubscriptions();
    },

    componentDidUnmount: function () {
        $(document).off('show.bs.modal', '.modal');
    },

    render: function () {
        return (
            <div>
                <Header />
                <div className="FolderLibrary">
                    <h1></h1>
                    <Library store={FolderLibraryStore} emptyView={EmptyLibrary}/>
                </div>
                <Settings />
                <RouteHandler params={ this.props.params } />
            </div>
        );
    }
});

module.exports = App;
