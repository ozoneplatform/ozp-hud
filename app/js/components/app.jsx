'use strict';

var React = require('react');
var Reflux = require('reflux');
var ReactGridLayout = require('react-grid-layout');
var { RouteHandler } = require('react-router');
var Header = require('./header/index.jsx');
var Settings = require('./settings/index.jsx');

var MyListings = require('./sections/MyListings.jsx');
var AllListings = require('./sections/AllListings.jsx');
var Library = require('./sections/Library.jsx');
var SelfStore = require('ozp-react-commons/stores/SelfStore');
var ListingStore = require('../store/Listing');
var ListingActions = require('../actions/Listing');

var App = React.createClass({

    mixins: [
        Reflux.connect(SelfStore, 'profile'),
        Reflux.connect(ListingStore, 'listings')
    ],

    getInitialState: function() {
        return {
            profile: SelfStore.getDefaultData(),
            listings: []
        };
    },

    componentWillMount: function () {
        ListingActions.fetchOwnedListings();
    },

    componentDidMount: function() {
        $(document).on('show.bs.modal', '.modal', function () {
            $('.classBanner').last().css({
                position : 'fixed',
                bottom : '0%'
            });
        });
    },

    renderSections: function () {
        var profile = this.state.profile.currentUser;
        var listings = this.state.listings;
        // If you're an admin you always see the AllListings
        // If you own listings you always see the MyListings
        var count = 1;
        var elements = [];

        if (profile && profile.isAdmin()) {
            elements.push(
                <div key={count} _grid={{x: 1, y: 0, w: 1, h: 2}}>
                        <AllListings />
                </div>
            );
            count++;
        } 

        if (listings.length > 0) {
            elements.push(
                <div key={count} _grid={{x: 0, y: 0, w: 1, h: 2}}>
                    <MyListings />
                </div>
            );
            count++;
        } 

        elements.push(
            <div key={count} _grid={{x: 0, y: 1, w: 2, h: 2}}>
                <Library />
            </div>
        );
        
        return (
            <ReactGridLayout className="layout" cols={2} rowHeight={200} isResizeable={true}>
                { elements }
            </ReactGridLayout>
        );

    },


    render: function () {
        return (
            <div>
                <Header />
                    { this.renderSections() }
                <Settings />
                <RouteHandler params={ this.props.params } />
            </div>
        );
    }
});

module.exports = App;
