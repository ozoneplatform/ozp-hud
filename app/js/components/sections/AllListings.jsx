'use strict';

var Reflux = require('reflux');
var React = require('react');
var ChangeLog = require('./ChangeLog.jsx');
var ListingActions = require('../../actions/Listing');
var ListingStore = require('../../store/Listing');
var ChangeLogStore = require('../../store/ChangeLog');
var SelfStore = require('ozp-react-commons/stores/SelfStore');
var ListingManagementLink = require('../ListingManagementLink.jsx');

var AllListings = React.createClass({

    mixins: [
        Reflux.connect(ListingStore, 'listings'),
        Reflux.connect(ChangeLogStore, 'changelogs'),
        Reflux.connect(SelfStore, 'profile')
    ],

    componentWillMount: function () {
        ListingActions.fetchAllChangeLogs();
        ListingActions.fetchAllListings();
    },

    getInitialState: function() {
        return {
            listings: [],
            changelogs: ChangeLogStore.getDefaultData(),
            profile: SelfStore.getDefaultData()
        };
    },
    
    renderChangeLogs: function () {
        if (!Array.isArray(this.state.changelogs)) {
            this.state.changelogs = [this.state.changelogs];
        }

        return this.state.changelogs.map(function (changeLog) {

            return [
                <ChangeLog showListingName={true} changeLog={changeLog}>
                    { changeLog.listing.iconUrl ? <img className="recent-activity-icon" src={ changeLog.listing.iconUrl } /> : <div></div> }
                </ChangeLog>,
                <br/>
            ];
        });
    },    

    renderOrgCounts: function () {
        var profile = this.state.profile.currentUser;

        if (profile && profile.stewardedOrganizations.length > 0) {

            if (!Array.isArray(this.state.listings)) {
                this.state.listings = [this.state.listings];
            }

            var listings = this.state.listings.filter(function (listing) {
                return profile.stewardedOrganizations.indexOf(listing.organization);
            });

            var counts = listings.reduce(function (acc, i) {
                (acc[i.approvalStatus])++;
                return acc;
            }, {
                APPROVED: 0,
                APPROVED_ORG: 0,
                REJECTED: 0,
                PENDING: 0,
                IN_PROGRESS: 0
            });

            var link = profile.isAdmin() ? "" : <ListingManagementLink>Listing Management <i className="icon-caret-right-blueDark"></i></ListingManagementLink>;

            return (
                <div className="Listings">
                    <h3>Org Listings</h3>
                    { link }
                    <div className="Listings__counts">
                        <div className="AllListings__approved">
                            <i className="icon-thumbs-up-36-green"></i>
                            <span>{ counts.APPROVED }</span><br />
                            <span>Approved</span>
                        </div>
                        <div className="AllListings__pending">
                            <i className="icon-exclamation-36-redOrange"></i>
                            <span>{ counts.PENDING }</span><br />
                            <span>Pending, Org.</span>
                        </div>
                        <div className="AllListings__submitted">
                            <i className="icon-loader-36-blue"></i>
                            <span>{ counts.APPROVED_ORG }</span><br />
                            <span>Org Approved</span>
                        </div>
                        <div className="AllListings__rejected">
                            <i className="icon-reload-36-blue"></i>
                            <span>{ counts.REJECTED }</span><br />
                            <span>Returned</span>
                        </div>
                        <div className="AllListings__draft">
                            <i className="icon-paper-36-white"></i>
                            <span>{ counts.IN_PROGRESS }</span><br />
                            <span>Draft</span>
                        </div>
                    </div>
                </div>     
            );
        }
    },

    renderAdminCounts: function () {
        if (this.state.profile && this.state.profile.currentUser &&
                this.state.profile.currentUser.isAdmin()) {

            if (!Array.isArray(this.state.listings)) {
                this.state.listings = [this.state.listings];
            }   

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
                <div className="Listings">
                    <h3>Marketplace Listings</h3>
                    <ListingManagementLink>Listing Management <i className="icon-caret-right-blueDark"></i></ListingManagementLink>
                    <div className="Listings__counts">
                        <div className="AllListings__approved">
                            <i className="icon-thumbs-up-36-green"></i>
                            <span>{ counts.APPROVED }</span><br />
                            <span>Approved</span>
                        </div>
                        <div className="AllListings__pending">
                            <i className="icon-exclamation-36-redOrange"></i>
                            <span>{ counts.APPROVED_ORG }</span><br />
                            <span>Pending</span>
                        </div>
                        <div className="AllListings__submitted">
                            <i className="icon-loader-36-blue"></i>
                            <span>{ counts.PENDING }</span><br />
                            <span>Submitted</span>
                        </div>
                        <div className="AllListings__rejected">
                            <i className="icon-reload-36-blue"></i>
                            <span>{ counts.REJECTED }</span><br />
                            <span>Returned</span>
                        </div>
                        <div className="AllListings__draft">
                            <i className="icon-paper-36-white"></i>
                            <span>{ counts.IN_PROGRESS }</span><br />
                            <span>Draft</span>
                        </div>
                    </div>
                </div>     
            );
        }
    },


    render: function() {
        return( 
            <div className="Widget">
                { this.renderAdminCounts() }
                { this.renderOrgCounts() }
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

module.exports = AllListings;