/** @jsx React.DOM */
var React = require('react');
var FolderModal = require('../folder/foldermodal.js');
var data = require('../../../data.js');
//var apps = data.folder;

var Folder = React.createClass({
	getInitialState: function() {
        return {folderName: this.props.folderName};
    },

	render: function(){
		//TODO make this work for repeated folder names
        var apps = this.props.apps;
        debugger;
        var modalID = 'folder-modal-lg-' + this.state.folderName.replace(/ /g,'');
        var folderName = this.state.folderName;
        var thumbnails = apps.map(function(app){
            return(<img key={app.name} src={app.img}/>);
        });

        return (<li><div>
            <a href="#" data-toggle="modal" data-target={'#' + modalID}>
                <div className="app-folder">
                        {thumbnails}
                </div>
            </a>
            <h5 className="ozp-lib-name">{folderName}</h5>
            <FolderModal apps={apps} folderName={folderName} modalID={modalID}/>
        </div></li>
            );
	}
});
module.exports = Folder;