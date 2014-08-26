/** @jsx React.DOM */

var React = require('react/addons');
require('bootstrap');
var data = require('../../../data.js');



var Alerts = React.createClass({
	getInitialState: function() {
	    return {alerts: data.alerts, newAlertNum: 2};
    },

	removeAlert: function(alert) {
		var i = this.state.alerts.indexOf(alert);
		this.state.alerts.splice(i, 1);
		this.setState({alerts: this.state.alerts});
    },
	componentDidMount: function() {
    	//this.interval = setInterval(this.getTime, 30000);
    	//Check for alerts!
    	var self = this;
    	setTimeout(function(){
    		self.setState({alert: self.state.alerts.unshift({text:'Possum Breach!', img: './images/appIcons/bread.png', time:'12/12/12 00:00'}), newAlertNum: (self.state.newAlertNum+1)});
    	},8000);
    	/*$(function() {
		 	$("#alert-dropdown-menu").on("click", function(e) {
		 			       		console.log(e);

		 		if(e.target.className !== "remove-alert"){
		       		e.stopPropagation();
		       	}else{
		       		console.log("click");
		       		$("#alert-anchor").click();
		       	}
		    });
		});*/
		$('#alert-anchor').on('hide.bs.dropdown', function () {
    		return false;
		});
  	},

  	componentWillUnmount: function() {
  	},

  	alertsViewed: function(){
		this.setState({newAlertNum: 0});
  	},

	render: function(){
		var menuContents;
		var removeAlert = this.removeAlert;
		var anchorClass = 'nav-bar-button';
		var displayedAlertNum = this.state.newAlertNum;
		if (this.state.newAlertNum !== 0) {
			anchorClass += ' ozp-notifications';
		}else{
			displayedAlertNum = '';
		}
		if(this.state.alerts.length != 0){
			var alertItems =  this.state.alerts.map(function(alert,index){
						return(							
							<tr key={alert.text+index}>
			    				<td><img className="alert-thumbnail" src={alert.img} /> </td>
			    				<td className="alert-text">{alert.text}<br/><i>{alert.time}</i></td>
			    				<td className="close"><span className="remove-alert" onClick={removeAlert.bind(this, alert)}>X</span></td>
			    			</tr>
						);
					});
			menuContents = 	<ul className="dropdown-menu" role="menu" id= "alert-dropdown-menu">
								<li data-stopPropagation="true"><table><tbody>{alertItems}</tbody></table></li>
            				</ul>;
		}else {
			menuContents = 	<ul className="dropdown-menu" role="menu" id= "alert-dropdown-menu">
								<li><table className="no-alerts">No new alerts!</table></li>
							</ul>;
		};

		return (
				<li onBlur={this.alertsViewed}>
					<a id="alert-anchor" className={anchorClass} data-toggle="dropdown" href="#" >
			    		<span className="fa-stack"><i className="fa fa-bell fa-2x fa-stack-2x" />
			    		<i id="notification-number" className="fa fa-stack-1x">{displayedAlertNum}</i></span>
					</a>
					{menuContents}
        		</li>
			);
	}
});

module.exports = Alerts;