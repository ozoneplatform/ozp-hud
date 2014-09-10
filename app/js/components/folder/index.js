/** @jsx React.DOM */
var React = require('react');
var FolderModal = require('../folder/foldermodal.js');

var Folder = React.createClass({
	getInitialState: function() {
	    return {folderName: this.props.folder.folder, apps: this.props.folder.items};
    },
	rename: function(event){
		this.setState({folderName: event.target.value});
	},
    disconnect: function(app){
        var i = this.state.apps.indexOf(app);
        this.state.apps.splice(i, 1);
        this.setState({apps: this.state.apps});
    },
	render: function(){
		//TODO make this work for repeated folder names
        var apps = this.state.apps;
		var modalID = 'folder-modal-lg-' + this.state.folderName.replace(/\W/g, '')

		var thumbnails = apps.map(function(app){
            console.log(app);
			return(<img key={app.name} src={app.img}/>);

		});

		return (<div>
					<a href="#" data-toggle="modal" data-target={'#' + modalID}>
						<div className="app-folder">
							{thumbnails}
						</div>
					</a>
					<h5 className="ozp-lib-name">{this.state.folderName}</h5>
					<FolderModal folderName={this.state.folderName} apps={apps} disconnect={this.disconnect} modalID={modalID} rename={this.rename}/>

				</div>
			);
	}
});
module.exports = Folder;