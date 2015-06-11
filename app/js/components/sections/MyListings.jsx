'use strict';

var Reflux = require('reflux');
var React = require('react');
var ListingApi = require('../../api/Listing');
var ListingActions = require('../../actions/Listing');
var ChangeLog = require('./ChangeLog.jsx');

var ListingStore = Reflux.createStore({

    listenables: [ ListingActions ],

    listings: [],
    changelogs: [],

    onFetchListings: function () {
        var me = this;

        ListingApi.getOwnedListings().then(function(response) {
            me.listings = response._embedded.item;
            me.doTrigger();
        });
    },

    doTrigger: function() {
        this.trigger(this.getDefaultData());
    },

    getDefaultData: function() {
        return this.listings;
    }

});

var ChangeLogStore = Reflux.createStore({

    listenables: [ ListingActions ],

    changelogs: [],

    onFetchAllChangeLogs: function () {
        var me = this;

        ListingApi.getOwnedChangeLogs().then(function(response) {
            me.changelogs = response._embedded.item;
            me.doTrigger();
        });
    },

    doTrigger: function() {
        this.trigger(this.getDefaultData());
    },

    getDefaultData: function() {
        return this.changelogs;
    }

});

var MyListings = React.createClass({

    mixins: [
        Reflux.connect(ListingStore, 'listings'),
        Reflux.connect(ChangeLogStore, 'changelogs')
    ],

    getInitialState: function() {
        return {
            listings: [],
            changelogs: []
        };
    },
    
    renderChangeLogs: function () {
        return this.state.changelogs.map(function (changeLog) {

            return [
                <ChangeLog showListingName={true} changeLog={changeLog}>
                    { changeLog.listing.iconUrl ? <img className="recent-activity-icon" src={ changeLog.listing.iconUrl } /> : <div></div> }
                </ChangeLog>,
                <br/>
            ];
        });
    },

    renderCounts: function () {
        var counts = this.state.listings.reduce(function (acc, i) {
            (acc[i.approvalStatus])++;
            return acc;
        }, {
            APPROVED: 0,
            APPROVED_ORG: 0,
            REJECTED: 0,
            PENDING: 0,
            IN_PROGRESS: 0
        });

        return (
            <div className="MyListings__counts">
                <div className="MyListings__approved">
                    <i className="icon-thumbs-up-14-greenDark"></i>
                    <span>{counts.APPROVED}</span><br />
                    <span>Approved</span>
                </div>
                <div className="MyListings__pending">
                    <i className="icon-loader-12-blueDark"></i>
                    <span>{counts.APPROVED_ORG + counts.PENDING}</span><br />
                    <span>Pending</span>
                </div>
                <div className="MyListings__rejected">
                    <i className="icon-exclamation-12-redOrangeDark"></i>
                    <span>{counts.REJECTED}</span><br />
                    <span>Returned</span>
                </div>
                <div className="MyListings__draft">
                    <i className="icon-paper-12-grayDark"></i>
                    <span>{counts.IN_PROGRESS}</span><br />
                    <span>Draft</span>
                </div>
            </div>
        );
    },

    render: function() {
        return( 
            <div className="Widget">
                <div className="MyListings">
                    <h3>My Listings</h3>
                        { this.renderCounts() }
                </div>
                <div className="RecentActivity">
                    <h3>Recent Activity</h3>
                    <div className="scrollable RecentActivity__activities">
                        { this.renderChangeLogs() }
                    </div>
                </div>
            </div>
        );

    }

});

module.exports = MyListings;