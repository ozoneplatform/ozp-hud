/** @jsx React.DOM */
var React = require('react');

var data = require('../../../data.js');
var appsMallLogo  = './images/AppsMall_Icon.png';

var apps = data.appLibrary;

var Folder = require('../folder/index.js');


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
    	var showApps = true;
    	if(showApps) {
	    	var icons = this.state.appArray.map(function(app){
	    		return(
					<li key={app.name}>					
						<i className="fa fa-ellipsis-h fa-2x tileIcon" data-toggle="dropdown"></i>
						<ul className="dropdown-menu tileIcon-dropdown" role="menu">
		                	<li onClick={disconnnect.bind(null, app)}>Disconnect</li>
		                </ul>					
						<img className="applib-tiles" src={app.img} onClick={click.bind(null, app.url)}/>						
						<h5 className="ozp-lib-name">{app.name}</h5>
	    			</li>
				);
			});
	    	
	    	return (
	            <div className="applib-main">
	            	<h3 className="applib"><b>Application Library</b></h3>
	            	<ul className="nav navbar-nav applib">
			            {icons}
			            <li><Folder /></li>
					</ul>
	            </div>
	        );
    	}
    	else {
    		return (
    	            <div className="applib-main">
    	            	<h3 className="applib"><b>Application Library</b></h3>    	            	
    	            	<h1 className="empty-app-text">You Currently have no <br />
    	            	Apps to display</h1>
    	            	<h2 className="visit-appsmall">Visit the AppsMall to discover <br />
    	            	Apps you can start using</h2>
    	            	<form method="get" action="./images/sampleSites/AppsMall.png">
    	            		<p className="visit-button-text"><button type="submit" className="empty-text-button"><img src={appsMallLogo} /> AppsMall</button></p>
    	            	</form>
    	            </div>
    	        );
    	}
    }

});

module.exports = Library;