/** @jsx React.DOM */
'use strict';

var React = require('react');
require('bootstrap');
var logo  = './images/Swirl_LtBG_50x50.png';
var appsMallLogo  = './images/AppsMall_Icon.png';
var dashboard  = './images/DashboardIconStatic.png';
var Alerts = require('../alerts/index.js');

var appsLogos  = ['./images/AppsMall_Icon.png'];

var genTime = function () {
    var date = new Date();
    var hour = date.getUTCHours();
    var min = date.getUTCMinutes();

    return (hour + ':' + min + ' Z');
};

var Header = React.createClass({

    getInitialState: function () {
        return {time: genTime()};
    },

    updateTime: function () {
        this.setState({time: genTime()});
    },

    componentDidMount: function () {
        this.interval = setInterval(this.updateTime, 60000);
    },

    componentWillUnmount: function () {
        clearInterval(this.interval);
    },

    render: function () {
        var user = 'J Smith';

        $(document).ready(function () {
            $(document).on('show.bs.modal', '.modal', function () {
                $('.classBanner').last().css({
                    position : 'fixed',
                    bottom : '0%'
                });
            });
        });

        /*jshint ignore:start */
        return (
            <nav id="top-bar" className="navbar navbar-default navbar-inverse app-toolbar no-rounded-corners" role="navigation">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <ul className="nav navbar-nav">
                            <li className="menu-icon">
                                <a className="nav-bar-button nav-bar-icon dropdown-icon" data-toggle="dropdown" href="#">
                                    <i className="fa fa-navicon fa-2x" />
                                </a>
                                <ul className="dropdown-menu app-dropdown-menu" role="menu" >
                                    <li className="app-dropdown-item"><a href="#"><i className="fa fa-th"></i> App Library</a></li>
                                    <li className="app-dropdown-item"><a href="#"><i className="fa fa-wrench"></i> App Builder</a></li>
                                    <li className="app-dropdown-item"><a href="http://ozone-development.github.io/ozp-webtop/#/grid"><i className="fa fa-desktop"></i> WebTop</a></li>
                                    <li className="app-dropdown-item"><a href="#"><i className="fa fa-envelope-o"></i> Submit a Listing</a></li>
                                    <li className="app-dropdown-item"><a href="#"><i className="fa fa-bar-chart-o"></i> Metrics</a></li>
                                    <li className="app-dropdown-item"><a href="#"><i className="fa fa-terminal"></i> Developer Resources</a></li>
                                </ul>
                            </li>
                            <li className="current">
                                <a id="ozp-logo" href="#">
                                    <img src={logo} />
                                </a>
                            </li>
                            <li>
                                <a id="appsmall-logo" href="http://ozone-development.github.io/center-ui/dist/index.html">
                                    <img src={appsMallLogo} />
                                </a>
                            </li>
                            <li>
                                <a className="nav-bar-button" href="http://ozone-development.github.io/ozp-webtop/#/grid">
                                    <i id="ozp-dashboard" className="fa fa-desktop fa-2x" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="navbar-right">
                        <ul className="nav navbar-nav">
                            <Alerts />
                            <li className="no-hover">
                                <a className="nav-bar-button nav-bar-icon" id="ozp-clock" href="#">
                                    {this.state.time}
                                </a>
                            </li>
                            <li>
                                <a className="nav-bar-button nav-bar-icon dropdown-icon" data-toggle="dropdown" href="#">
                                    <i className="fa fa-user fa-2x" />{" " + user}
                                </a>
                                <ul className="dropdown-menu app-dropdown-menu" role="menu">
                                    <li className="app-dropdown-item"><a href="#" data-toggle="modal" data-target=".settings-modal-lg"><i className="fa fa-cogs"></i> Preferences and Settings</a></li>
                                    <li className="app-dropdown-item"><a href="./login.html"><i className="fa fa-sign-out"></i> Log Out</a></li>
                                </ul>
                            </li>
                            <li>
                                <a className="nav-bar-button nav-bar-icon" href="#" data-toggle="modal" data-target=".help-modal-lg">
                                    <i className="fa fa-question-circle fa-2x" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
        /*jshint ignore:end */
    }

});

module.exports = Header;