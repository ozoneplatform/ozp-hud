/** @jsx React.DOM */

var React = require('react/addons');
require('bootstrap');

var appsLogos  = ['./images/appIcons/paperAirplane.png', './images/appIcons/bread.png', './images/appIcons/chat.png', './images/appIcons/clipboard.png'];


var QuickLaunchIcons = React.createClass({
	render: function(){
		var icons = appsLogos.map(function(image){
						return(
							<li key={image}>
								<a href="#">
					    			<img src={image} height='30px'/>
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