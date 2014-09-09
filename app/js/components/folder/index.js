/** @jsx React.DOM */
var React = require('react');
var FolderModal = require('../folder/foldermodal.js');
var data = require('../../../data.js');
var apps = data.folder;

var Folder = React.createClass({
	getInitialState: function() {
	    return {folderName: 'Multimedia'};
    },
	rename: function(event){
		this.setState({folderName: event.target.value});
	},
	render: function(){
		//TODO make this work for repeated folder names
		var modalID = 'folder-modal-lg-' + this.state.folderName.replace(/\W/g, '')

		var thumbnails = apps.map(function(app){
			return(<img key={app.name} src={app.thumb}/>);

		});

		return (<div>
					<a href="#" data-toggle="modal" data-target={'#' + modalID}>
						<div className="app-folder">
							{thumbnails}
						</div>
					</a>
					<h5 className="ozp-lib-name">{this.state.folderName}</h5>
					<FolderModal folderName={this.state.folderName} modalID={modalID} rename={this.rename}/>

				</div>
			);
	}
});
module.exports = Folder;