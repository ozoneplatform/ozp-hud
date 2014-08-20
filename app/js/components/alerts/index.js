/** @jsx React.DOM */

var React = require('react/addons');
require('bootstrap');
var data = require('../../../data.js');



var Alerts = React.createClass({
	getInitialState: function() {
	    return {alerts: data.alerts, newAlerts: true};
    },


	componentDidMount: function() {
    	//this.interval = setInterval(this.getTime, 30000);
    	//Check for alerts!
    	var self = this;
    	setTimeout(function(){
    		self.setState({alert: self.state.alerts.unshift("Made you look!"), newAlerts: true});
    	},8000);
  	},

  	componentWillUnmount: function() {
  	},

  	alertsViewed: function(){
		this.setState({newAlerts: false});
  	},

	render: function(){
		var menuContents;
		var anchorID = 'no-ozp-notifications';
		if (this.state.newAlerts === true) {
			anchorID = 'ozp-notifications';
		}
		if(this.state.alerts.length != 0){
			var alertItems =  this.state.alerts.map(function(alertText,index){
						return(
							<li key={alert+index}>
								<a href="#">
					    			<i className="fa fa-th"></i> {alertText}
				    			</a>
			    			</li>
						);
					});
			menuContents = 	<ul className="dropdown-menu" role="menu" id= "app-dropdown-menu">
								{alertItems}
            				</ul>;
		}else {
			menuContents = 	<ul className="dropdown-menu" role="menu" id= "app-dropdown-menu">
								<li>No new alerts!</li>
							</ul>;
		};

		return (
				<li onBlur={this.alertsViewed}>
					<a id={anchorID} className="nav-bar-button" data-toggle="dropdown" href="#" >
			    		<i className=" fa fa-bell fa-2x" />
					</a>
					{menuContents}
        		</li>
			);
	}
});

module.exports = Alerts;