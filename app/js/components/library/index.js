/** @jsx React.DOM */
var React = require('react');

var data = require('../../../data');
var appsMallLogo  = './images/AppsMall_Icon.png';

var apps = data.appLibrary;

var Folder = require('../folder');
var Sortable = require('../sortable/Sortable');

var Library = React.createClass({
	componentWillMount : function(){
		this.setState({data: {items: apps}});
	},
	sort: function(items, dragging) {
		var data = this.state.data;
		data.items = items;
		data.dragging = dragging;
		this.setState({data: data});
  	},
    render: function () {
    	var showApps = true;
    	if(showApps) {
	    	/*var icons = this.state.appArray.map(function(app){
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
				return(<AppBlock data={app}/>);
			});*/

	    	 var icons = this.state.data.items.map(function(app, i) {
		      return (
		        <AppBlock
		          sort={this.sort}
		          data={this.state.data}
		          key={i}
		          data-id={i}
		          item={app} />
		      );
		    }, this);

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

var AppBlock = React.createClass({
	mixins: [Sortable],
	clickImage: function(url){
		window.open(url);
	},
	disconnect: function(app){
		var i = this.state.appArray.indexOf(app);
		this.state.appArray.splice(i, 1);
		this.setState({appArray: apps});
	},
	render: function(){
    	var click = this.clickImage;
    	var disconnnect = this.disconnect;
    	var app = this.props.item;

		return this.transferPropsTo(
				<li key={app.name} className={this.isDragging() ? "dragging" : ""} onDragStart={ this.sortStart } onDragOver={ this.dragOver }  onDrop={ this.sortEnd }>
					<i className="fa fa-ellipsis-h fa-2x tileIcon" data-toggle="dropdown"></i>
					<ul className="dropdown-menu tileIcon-dropdown" role="menu">
	                	<li onClick={disconnnect.bind(null, app)}>Disconnect</li>
	                </ul>
					<img className="applib-tiles" src={app.img} onClick={click.bind(null, app.url)}/>
					<h5 className="ozp-lib-name">{app.name}</h5>
    			</li>
			);
	}
});

module.exports = Library;