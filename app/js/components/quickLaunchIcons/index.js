/** @jsx React.DOM */

var React = require('react');
require('bootstrap');
var data = require('../../../data');

var apps = data.launcherApps;

var QuickLaunchIcons = React.createClass({

    render: function () {
        var icons = apps.map(function (app) {
            return(
                <li key={app.listing.imageLargeUrl}>
                <div>
                    <a href={app.listing.launchUrl}>
                        <img src={app.listing.imageLargeUrl} height='35px'/>
                    </a>
                    <a>
                        <i className="fa fa-external-link launch-external" />
                    </a>
                </div>
                </li>
            );
        });

        return (
            <ul className="nav navbar-nav">
                <li className="divider-vertical"></li>
                {icons}
            </ul>
        );

    }

});

module.exports = QuickLaunchIcons;