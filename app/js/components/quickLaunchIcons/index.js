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
							<div>
								<a href={app.url}>
					    			<img src={app.img} height='35px'/>
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