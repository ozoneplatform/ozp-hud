'use strict';

var Reflux = require('reflux');
var $ = require('jquery');
var React = require('react');
var ChangeLog = require('./ChangeLog.jsx');
var ListingActions = require('../../actions/Listing');
var ListingStore = require('../../store/Listing');
var ChangeLogStore = require('../../store/ChangeLog');
var ListingManagementLink = require('../ListingManagementLink.jsx');

var AllListings = React.createClass({

    mixins: [
        Reflux.connect(ListingStore, 'listings'),
        Reflux.connect(ChangeLogStore, 'storedata')
    ],

    propTypes: {    
        profile: React.PropTypes.object
    },

    componentWillMount: function () {
        ListingActions.fetchAllChangeLogs();
        ListingActions.fetchAllListings();
    },

    getInitialState: function() {
        return {
            listings: ListingStore.getDefaultData(),
            storedata: ChangeLogStore.getDefaultData()
        };
    },

    renderChangeLogs: function () {
        var logs = this.state.storedata.changelogs;
        if (!Array.isArray(logs)) {
            logs = [logs];
        } else if (logs.length > 25) {
            logs.splice(25, logs.length-1);
        }

        return logs.map(function (changeLog) {
            return [
                <ChangeLog showListingName={true} changeLog={changeLog}>
                    { changeLog.listing.iconUrl ? <img className="recent-activity-icon" src={ changeLog.listing.iconUrl } /> : <div></div> }
                </ChangeLog>,
                <br/>
            ];
        });
    },    

    renderOrgCounts: function () {
        var profile = this.props.profile.currentUser;

        if (profile && profile.stewardedOrganizations.length > 0) {

            if (!Array.isArray(this.state.listings)) {
                this.state.listings = [this.state.listings];
            }

            var orglistings = [];

            $.each(this.state.listings, function (index, listing) {
                if (profile.stewardedOrganizations.indexOf(listing.agency) > -1) {
                    orglistings.push(listing);
                }
            });

            var counts = orglistings.reduce(function (acc, i) {
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
                <div className="Listings__bar">
                    <h1>Org Listings</h1>
                    { link }
                    <div className="Listings__counts">
                        <div className="OrgListings__pending">
                            <i className="icon-exclamation-36-redOrange"></i>
                            <span className="count">{ counts.PENDING }</span><br />
                            <span>Needs Action</span>
                        </div>
                        <div className="OrgListings__approved">
                            <i className="icon-thumbs-up-36-green"></i>
                            <span className="count">{ counts.APPROVED }</span><br />
                            <span>Approved</span>
                        </div>
                        <div className="OrgListings__submitted">
                            <i className="icon-loader-36-blue"></i>
                            <span className="count">{ counts.APPROVED_ORG }</span><br />
                            <span>Pending</span>
                        </div>
                        <div className="OrgListings__rejected">
                            <i className="icon-reload-36-blue"></i>
                            <span className="count">{ counts.REJECTED }</span><br />
                            <span>Returned</span>
                        </div>
                        <div className="OrgListings__draft">
                            <i className="icon-paper-36-white"></i>
                            <span className="count">{ counts.IN_PROGRESS }</span><br />
                            <span>Draft</span>
                        </div>
                    </div>
                </div>     
            );
        }
    },

    renderAdminCounts: function () {
        var profile = this.props.profile.currentUser;

        if (profile && profile.isAdmin()) {

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
                <div className="Listings__bar">
                    <h1>Marketplace Listings</h1>
                    <ListingManagementLink>Listing Management <i className="icon-caret-right-blueDark"></i></ListingManagementLink>
                    <div className="Listings__counts">
                        <div className="AllListings__pending">
                            <i className="icon-exclamation-36-redOrange"></i>
                            <span className="count">{ counts.APPROVED_ORG }</span><br />
                            <span>Needs Action</span>
                        </div>
                        <div className="AllListings__approved">
                            <i className="icon-thumbs-up-36-green"></i>
                            <span className="count">{ counts.APPROVED }</span><br />
                            <span>Approved</span>
                        </div>
                        <div className="AllListings__submitted">
                            <i className="icon-loader-36-blue"></i>
                            <span className="count">{ counts.PENDING }</span><br />
                            <span>Pending</span>
                        </div>
                        <div className="AllListings__rejected">
                            <i className="icon-reload-36-blue"></i>
                            <span className="count">{ counts.REJECTED }</span><br />
                            <span>Returned</span>
                        </div>
                        <div className="AllListings__draft">
                            <i className="icon-paper-36-white"></i>
                            <span className="count">{ counts.IN_PROGRESS }</span><br />
                            <span>Draft</span>
                        </div>
                    </div>
                </div>     
            );
        }
    },


    render: function() {
        var profile = this.props.profile.currentUser;
        if (profile && (profile.stewardedOrganizations.length > 0 || profile.isAdmin())) {
            return(
                <div className="custom-hud-component">
                    <div className="TableRowZero">
                        { this.renderAdminCounts() }
                        { this.renderOrgCounts() }
                    </div>
                    <div className="TableRow">
                        <div className="CaptureFrame">
                            <div className="RecentActivity">
                                <h1>Recent Activity</h1>
                                <div className="RecentActivity__activities">
                                    { this.renderChangeLogs() }
                                </div>
                            </div>
                        </div>
                    </div>
                    { this.props.children }
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }

});

module.exports = AllListings;