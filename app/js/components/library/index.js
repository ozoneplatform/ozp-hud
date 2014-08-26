/** @jsx React.DOM */
var React = require('react');

var data = require('../../../data.js');
var appsMallLogo  = './images/AppsMall_Icon.png';

var apps = data.appLibrary;

var Library = React.createClass({
	
	clickImage: function(url){
		window.open(url);
	},
	
	disconnect: function(app){
		var i = this.state.appArray.indexOf(app);
		this.state.appArray.splice(i, 1);
		this.setState({appArray: apps});
	},
	
	componentWillMount : function(){
		this.setState({appArray: apps});
	},

    render: function () {
    	var click = this.clickImage;
    	var disconnnect = this.disconnect;
    	var showApps = false;
    	if(showApps) {
	    	var icons = this.state.appArray.map(function(app){
	    		return(
					<li key={app.img}>					
						
						<i id="tileIcon" className="fa fa-ellipsis-h fa-2x" data-toggle="dropdown"></i>
						<ul className="dropdown-menu" role="menu" id= "tileIcon-dropdown">
		                	<li onClick={disconnnect.bind(this, app)}>Disconnect</li>
		                </ul>					
						<img id="applib-tiles" src={app.img} onClick={click.bind(this, app.url)}/>						
						<h5 className="ozp-lib-name">{app.name}</h5>
	    			</li>
				);
			});
	    	
	    	return (
	            <div id="search">
	            	<h3 id="applib"><b>Application Library</b></h3>
	            	<ul id="applib" className="nav navbar-nav">
			            {icons}
					</ul>
	            </div>
	        );
    	}
    	else {
    		return (
    	            <div id="search">
    	            	<h3 id="applib"><b>Application Library</b></h3>
    	            	<h1 id="empty-app-text">You Currently have no <br />
    	            	Apps to display</h1>
    	            	<h2 id="visit-appsmall">Visit the AppsMall to discover <br />
    	            	Apps you can start using</h2>
    	            	<button id="empty-text-button"><img src={appsMallLogo} /> AppsMall</button>
    	            </div>
    	        );
    	}
    }

});

module.exports = Library;