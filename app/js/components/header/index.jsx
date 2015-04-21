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
    HUD_URL,
    FEEDBACK_ADDRESS
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
                <li><a href={METRICS_URL} target="_blank"><i className="icon-bar-graph-2-grayLightest"></i>Metrics</a></li> : null;

        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-left">
                        <ul className="nav navbar-nav">
                            <li className="active"><a className="lrg" href={HUD_URL}><i className="icon-home-blue"></i></a></li>
                            <li><a href={CENTER_URL}><i className="icon-shopping-grayLightest"></i></a></li>
                            <li><a href={WEBTOP_URL}><i className="icon-layout-grayLightest"></i></a></li>
                        </ul>
                    </div>

                    <div className="navbar-right">
                        <ul className="nav navbar-nav">
                            <UserNotificationDropdown />
                            <li>
                                <a href="#" onClick={this.showHelpModal}><i className="icon-question-grayLightest"></i></a>
                            </li>
                            <li className="dropdown user-menu-dropdown">
                                <a href="#" data-toggle="dropdown"><i className="icon-menu-grayLightest"></i></a>
                                <ul className="dropdown-menu">
                                    <li className="dropdown-header">Personalize</li>
                                    <li><a href='#'><i className="icon-ribbon-grayLightest"></i>Bookmarks</a></li>
                                    <li>
                                        <Link to="profile">
                                            <i className="icon-head-grayLightest"/>Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="settings">
                                            <i className="icon-cog-grayLightest"></i>Settings
                                        </Link>
                                    </li>
                                    <li className="divider"></li>
                                    <li className="dropdown-header">Create</li>
                                    <li><a href={CENTER_URL + '#/edit'}><i className="icon-square-plus-grayLightest"></i>Submit a Listing</a></li>
                                    <li><a href={DEVELOPER_RESOURCES_URL}><i className="icon-cloud-grayLightest"></i>Developer Resources</a></li>
                                    <li className="divider"></li>
                                    <li className="dropdown-header">Manage</li>
                                    <li><a href={CENTER_URL + '#/user-management/my-listings'}><i className="icon-layers-grayLightest"></i>Listing Management</a></li>
                                    {
                                        isAdmin &&
                                        <li><a href={CENTER_URL + '#/mall-management/categories'}><i className="icon-shopping-settings-grayLightest"></i>Marketplace Settings</a></li>
                                    }
                                    { Metrics }
                                    <li><a href={'mailto:'+FEEDBACK_ADDRESS} className="caboose"><i className="icon-mail"></i>Submit Feedback</a></li>
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
