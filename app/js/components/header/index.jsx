'use strict';

var React = require('react');
var Reflux = require('reflux');
var UserNotificationDropdown = require('ozp-react-commons/components/notification/UserNotificationDropdown.jsx');
var HelpModal = require('./helpmodal.jsx');
var NotificationsModal = require('ozp-react-commons/components/notification/NotificationsModal.jsx');
var ProfileSearchActions = require('../../actions/ProfileSearchActions');
var { Link } = require('react-router');
var LibraryActions = require('../../actions/Library');

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
            profile: SelfStore.getDefaultData().currentUser,
            showNotifications: false,
        };
    },

    showNotifications: function() {
      this.setState({showNotifications: true});
    },

    onStoreChange: function(profileData) {
        this.setState({profile: profileData.currentUser});
    },

    componentDidMount: function(){
      $(this.refs.hastooltips.getDOMNode()).find('.tooltiped').each(function(){
        $(this).tooltip({
          delay: 400
        });
      });

      // TODO: Move this to a backend request checking profile for tour status.
      ProfileSearchActions.tourCheck();
    },

    render: function () {
        var profile = this.state.profile,
            isAdmin = profile && profile.isAdmin(),
            Metrics = (profile && (isAdmin || this.isOrgSteward())) ?
                <li><a href={METRICS_URL} target="_blank"><i className="icon-bar-graph-2-grayLightest"></i>Metrics</a></li> : null;
        var secondParty = true;
        if (this.state.profile !== null){
          secondParty = this.state.profile.secondPartyUser;
        }
        return (
            <nav ref="hastooltips" className="navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-left">
                      <ul className="nav navbar-nav">
                          <li id="tourstop-hud" className="active tooltiped" data-toggle="tooltip" data-placement="bottom" title="HUD"><a className="lrg" href={HUD_URL}><i className="icon-home-grayLightest activeIcon"></i><span className="hidden-span">HUD</span></a></li>
                          <li id="tourstop-center" className="tooltiped" data-toggle="tooltip" data-placement="bottom" title="Center"><a className="lrg" href={CENTER_URL} ><i className="icon-shopping-grayLightest"></i><span className="hidden-span">Center</span></a></li>
                          { ! secondParty &&
                            <li id="tourstop-webtop" className="tooltiped" data-toggle="tooltip" data-placement="bottom" title="Webtop"><a className="lrg" href={WEBTOP_URL}><i className="icon-layout-grayLightest"></i><span className="hidden-span">Webtop</span></a></li>
                          }
                      </ul>
                    </div>

                    <div className="navbar-right">
                        <ul className="nav navbar-nav">
                            <UserNotificationDropdown updateHud={LibraryActions.fetchLibrary} moreNotifications={this.showNotifications}/>
                            <li className="tooltiped" id="tourstop-help" data-toggle="tooltip" data-placement="bottom" title="Help">
                                <a href="#" onClick={this.showHelpModal}><i className="icon-question-grayLightest"></i></a>
                            </li>
                            <li data-toggle="tooltip" id="tourstop-global-menu" data-placement="bottom" title="Menu" className="tooltiped dropdown user-menu-dropdown">
                                <a href="#" data-toggle="dropdown"><i className="icon-menu-grayLightest"></i></a>
                                <ul className="dropdown-menu">
                                    <li className="dropdown-header">Personalize</li>
                                    <li><a href='#'><i className="icon-ribbon-grayLightest"></i>Bookmarks</a></li>
                                    <li>
                                        <Link to="profile">
                                            <i className="icon-head-grayLightest"/>Profile
                                        </Link>
                                    </li>
                                    {!secondParty &&
                                    <li className="divider"></li>
                                    }
                                    {!secondParty &&
                                    <li className="dropdown-header">Create</li>
                                    }
                                    {!secondParty &&
                                    <li><a href={CENTER_URL + '/#/edit'}><i className="icon-square-plus-grayLightest"></i>Submit a Listing</a></li>
                                    }
                                    {!secondParty &&
                                    <li><a href={DEVELOPER_RESOURCES_URL} target="_blank"><i className="icon-cloud-grayLightest"></i>Developer Resources</a></li>
                                    }
                                    {!secondParty &&
                                    <li className="divider"></li>
                                    }
                                    {!secondParty &&
                                    <li className="dropdown-header">Manage</li>
                                    }
                                    {!secondParty &&
                                    <li><a href={CENTER_URL + '/#/user-management/my-listings'}><i className="icon-layers-grayLightest"></i>Listing Management</a></li>
                                    }
                                    {
                                        isAdmin &&
                                        <li><a href={CENTER_URL + '/#/mall-management/categories'}><i className="icon-shopping-settings-grayLightest"></i>Center Settings</a></li>
                                    }
                                    { Metrics }
                                    <li>
                                        <Link to="contacts" className="caboose">
                                            <i className="icon-speech-bubble-grayLightest"></i>Contact
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                {
                    this.state.showHelp && <HelpModal onHidden={this.onModalHidden} />
                }
                {
                    this.state.showNotifications && <NotificationsModal onHidden={this.onModalHidden} backRoute="/"/>
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
        this.setState({ showHelp: false, showNotifications: false });
    }
});

module.exports = Header;
