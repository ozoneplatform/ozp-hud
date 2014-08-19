/** @jsx React.DOM */

var React = require('react/addons');
require('bootstrap');
var data = require('../../../data.js');

var apps = data.launcherApps;


var QuickLaunchIcons = React.createClass({
	render: function(){
		var icons = apps.map(function(app){
						return(
							<li key={app.img}>
								<a href={app.url}>
					    			<img src={app.img} height='30px'/>
				    			</a>
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