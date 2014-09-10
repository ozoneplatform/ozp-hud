/** @jsx React.DOM */

var React = require('react/addons');
require('bootstrap');
var data = require('../../../data.js');
//var apps = data.folder;
var apps;


var FolderModal = React.createClass({
	getInitialState: function() {
	    return {appArray: this.props.apps};
    },

    clickImage: function(url){
		window.open(url);
	},

	disconnect: function(app){
		var i = this.state.appArray.indexOf(app);
		this.state.appArray.splice(i, 1);
		this.setState({appArray: this.state.appArray});
	},

	render: function(){
    	var click = this.clickImage;
    	var disconnnect = this.disconnect;
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
			<div className="modal custom fade folder-modal" id={this.props.modalID} tabIndex="-1" role="dialog" aria-hidden="true">
			  <div className="modal-dialog">
			    <div className="modal-content">
					<h2>{this.props.folderName}</h2>
					<div className="modal-body">
			      		<button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
			      			<ul className="nav navbar-nav">
								{icons}			
							</ul>
			      </div>
			    </div>
			  </div>
			</div>
		);

	}
});

module.exports = FolderModal;