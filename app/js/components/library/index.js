/** @jsx React.DOM */
var React = require('react');

var data = require('../../../data.js');

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
    	var icons = this.state.appArray.map(function(app){
    		return(
				<li key={app.img}>					
					
					<i id="tileIcon" className="fa fa-ellipsis-h fa-lg" data-toggle="dropdown"></i>
					<ul className="dropdown-menu" role="menu" id= "tileIcon-dropdown">
	                	<li><a href="#" onClick={disconnnect.bind(this, app)}> Disconnect</a></li>
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

});

module.exports = Library;