'use strict';

var React = require('react');
var Reflux = require('reflux');
var ReactGridLayout = require('react-grid-layout');
var SelfStore = require('ozp-react-commons/stores/SelfStore');
var ListingActions = require('../actions/Listing');
var ProfileStore = require('../store/Profile');
var MyListings = require('./sections/MyListings.jsx');
var AllListings = require('./sections/AllListings.jsx');
var Library = require('./sections/Library.jsx');

var GridLayout = React.createClass({

    mixins: [
        Reflux.connect(SelfStore, 'profile'),
        Reflux.connect(ProfileStore, 'mylistings')
    ],

    getInitialState: function () {
        return {
            profile: SelfStore.getDefaultData(),
            mylistings: ProfileStore.getDefaultData()
        };
    },

    componentWillMount: function () {
        ListingActions.fetchOwnedListings();
    },

    getGrid: function () {
        var profile = this.state.profile.currentUser;
        var listings = this.state.mylistings;
        var grid = { };
        if (profile && listings) {
            var isAdmin = profile.isAdmin() || profile.stewardedOrganizations.length > 0;
            var ownsListings = listings.length > 0;
            if (isAdmin && ownsListings) {
                grid.myListings = {x: 0, y: 0, h: 2, w: 1};
                grid.allListings = {x: 1, y: 0, h: 2, w: 1};
                grid.library = {x:0, y: 1, h: 2, w: 2};
            } else if (!isAdmin && ownsListings) {
                grid.myListings = {x: 0, y: 0, h: 4, w: 1};
                grid.library = {x:1, y: 0, h: 4, w: 1};
            } else if (isAdmin && !ownsListings) {
                grid.allListings = {x: 0, y: 0, h: 4, w: 1};
                grid.library = {x:1, y: 0, h: 4, w: 1};
            } else {
                grid.library = {x:0, y: 0, h: 4, w: 2};
            }
        }

        return grid;
    },

    renderSections: function () {
        var grid = this.getGrid();
        var items = [];
        var count = 0;
        for (var key in grid){
            var component;
            if (key === "myListings") {
                component = <MyListings listings={this.state.mylistings} />;
            } else if (key === "allListings") {
                component = <AllListings profile={this.state.profile} />;
            } else if (key === "library") {
                component = <Library />;
            }

            items.push(
                <div key={count} _grid={ grid[key] } className="custom-hud-component">
                    {component}
                    {this.props.children}
                </div>
            );
            count++;
        }

        return items;
    },


    render: function () {
        return (
            <ReactGridLayout className="layout" cols={2} rowHeight={200}>
                { this.renderSections () }
            </ReactGridLayout>
        );
    }

});

module.exports = GridLayout;