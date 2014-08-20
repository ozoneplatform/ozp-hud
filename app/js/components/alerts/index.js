/** @jsx React.DOM */

var React = require('react/addons');
require('bootstrap');
var data = require('../../../data.js');



var Alerts = React.createClass({
	render: function(){
		if (false) {
			var menuContents = <ul className="dropdown-menu" role="menu" id= "app-dropdown-menu">
									<li>No new alerts!</li>
								</ul>;
		}else{
			menuContents = <ul className="dropdown-menu" role="menu" id= "app-dropdown-menu">
								<li><a href="#"><i className="fa fa-th"></i> Box alert weewoo!</a></li>
				           		<li><a href="#"><i className="fa fa-wrench"></i> Wrench Bench Lunch</a></li>
	                		</ul>;
		};

		return (
				<li>
					<a id="ozp-notifications" className="nav-bar-button" data-toggle="dropdown" href="#">
					    	<i  className=" fa fa-bell fa-2x" />
					</a>
				                    {menuContents}
				</li>
			);
	}
});

module.exports = Alerts;