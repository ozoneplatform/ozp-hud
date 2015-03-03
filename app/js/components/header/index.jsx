'use strict';

var React = require('react');
var Reflux = require('reflux');
var UserNotificationDropdown = require('ozp-react-commons/components/notification/UserNotificationDropdown.jsx');
var HelpModal = require('./helpmodal.jsx');
var { Link } = require('react-router');

var SelfStore = require('ozp-react-commons/stores/SelfStore');

var Role = require('../../Constants').Role;

var {
    CENTER_URL,
    WEBTOP_URL,
    DEVELOPER_RESOURCES_URL,
    METRICS_URL,
    HUD_URL
} = require('OzoneConfig');

var Header = React.createClass({

    mixins: [Reflux.listenTo(SelfStore, 'onStoreChange')],

    getInitialState: function() {
        return {
            showHelp: false,
            profile: SelfStore.getDefaultData().currentUser
        };
    },

    onStoreChange: function(profileData) {
        this.setState({profile: profileData.currentUser});
    },

    render: function () {
        var profile = this.state.profile,
            isAdmin = profile && profile.isAdmin(),
            Metrics = (profile && (isAdmin || this.isOrgSteward())) ?
            <li><a href={METRICS_URL}><i className="icon-bar-graph-2"></i>Metrics</a></li> : '';

        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-left">
                        <ul className="nav navbar-nav">
                            <li className="active"><a className="lrg" href={HUD_URL}><i className="icon-home"></i></a></li>
                            <li><a className="lrg" href={CENTER_URL}><i className="icon-shopping"></i></a></li>
                            <li><a className="lrg" href={WEBTOP_URL}><i className="icon-layout"></i></a></li>
                        </ul>
                    </div>

                    <div className="navbar-right">
                        <ul className="nav navbar-nav">
                            <UserNotificationDropdown />
                            <li>
                                <a href="#" onClick={this.showHelpModal}><i className="icon-question"></i></a>
                            </li>
                            <li className="dropdown">
                                <a href="#" className="lrg" data-toggle="dropdown"><i className="icon-menu"></i></a>
                                <ul className="dropdown-menu">
                                    <li className="dropdown-header">Personalize</li>
                                    <li><a href='#'><i className="icon-ribbon"></i>Bookmarks</a></li>
                                    <li>
                                        <Link to="profile">
                                            <i className="icon-head"/>Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="settings">
                                            <i className="icon-cog"></i>Settings
                                        </Link>
                                    </li>
                                    <li className="divider"></li>
                                    <li className="dropdown-header">Create</li>
                                    <li><a href={CENTER_URL + '#/edit'}><i className="icon-square-plus"></i>Submit a Listing</a></li>
                                    <li><a href={DEVELOPER_RESOURCES_URL}><i className="icon-cloud"></i>Developer Resources</a></li>
                                    <li className="divider"></li>
                                    <li className="dropdown-header">Manage</li>
                                    <li><a href={CENTER_URL + '#/user-management/my-listings'}><i className="icon-layers"></i>Listing Management</a></li>
                                    {
                                        isAdmin &&
                                        <li><a href={CENTER_URL + '#/mall-management/categories'}><i className="icon-shopping-settings"></i>Marketplace Settings</a></li>
                                    }
                                    { Metrics }
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                {
                    this.state.showHelp && <HelpModal onHidden={this.onModalHidden} />
                }
            </nav>
        );
    },

    isOrgSteward: function(){
        var profile = this.state.profile;

        return this.state.profile && (Role[profile.highestRole] >= Role.ORG_STEWARD);
    },

    showHelpModal: function () {
        this.setState({ showHelp: true });
    },

    onModalHidden: function () {
        this.setState({ showHelp: false });
    }
});

module.exports = Header;
