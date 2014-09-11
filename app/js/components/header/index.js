/** @jsx React.DOM */

var React = require('react/addons');
require('bootstrap');
var logo  = './images/Swirl_LtBG_50x50.png';
var appsMallLogo  = './images/AppsMall_Icon.png';
var dashboard  = './images/DashboardIconStatic.png';
//var QuickLaunchIcons = require('../quickLaunchIcons/index.js');
var Alerts = require('../alerts/index.js');

var appsLogos  = ['./images/AppsMall_Icon.png'];


var genTime = function(){
	var date = new Date();
	var hour = date.getHours();
	var min = date.getMinutes();
	var hourStr = hour.toString();
	var minStr = min.toString();
	if (hour < 10){
		hourStr = '0' + hourStr;
	}
	if (min < 10){
		minStr = '0' + minStr;
	}

	return (hourStr + ':' + minStr);
}

var Header = React.createClass({

	getInitialState: function() {
	    return {time: genTime()};
    },

	getTime: function(){
		this.setState({time: genTime()});
  	},

	componentDidMount: function() {
    	this.interval = setInterval(this.getTime, 30000);
  	},

  	componentWillUnmount: function() {
    	clearInterval(this.interval);
  	},

    render: function () {
    	var user = "J Smith";
        $(document).ready(function() {
            $('.modal').on('shown.bs.modal', function() {
                $(".classBanner").last().css({"position" : "fixed", "bottom" : "0%"});
            })
        });
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
				                    <li className="app-dropdown-item"><a href="./images/sampleSites/webtop-screenshot.png"><i className="fa fa-desktop"></i> WebTop</a></li>
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
						        <a id="appsmall-logo" href="./images/sampleSites/AppsMall.png">
					    			<img src={appsMallLogo} />
					    		</a>
				        	</li>
				        	<li>
						        <a className="nav-bar-button" href="./images/sampleSites/webtop-screenshot.png">
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
				    				<b>{this.state.time}</b>
				    			</a>
				        	</li>
				        	<li>
						        <a className="nav-bar-button nav-bar-icon dropdown-icon" data-toggle="dropdown" href="#">
						        	<i className="fa fa-user fa-2x" /><b>{" " + user}</b>
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
    }

});

//<a className="navbar-brand" href="#"><i className="fa fa-list"></i></a>

module.exports = Header;