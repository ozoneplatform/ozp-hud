/** @jsx React.DOM */
var React = require('react');
var FolderModal = require('../folder/foldermodal.js');
var data = require('../../../data.js');
//var apps = data.folder;

var Folder = React.createClass({
	getInitialState: function() {
        //return {folderName: this.props.folderName};
        return {folderNames: this.props.folders};
    },

	render: function(){
		//TODO make this work for repeated folder names
        var apps = this.props.apps;
        //var folderComponents = this.state.folderNames.map(function(folder){
            /*var modalID = 'folder-modal-lg-' + this.state.folderNames[0].replace(/ /g,'');

            var folderName =  this.state.folderNames[0];

            var thumbnails = apps.map(function(app){
                if(app.folder === folderName) {
                    return(<img key={app.name} src={app.img}/>);
                }
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
                );*/
        //});

        var folderComponents = this.state.folderNames.map(function(folder){
            return (
                <li><div>
                    <a href="#" >
                        <div className="app-folder">
                        </div>
                    </a>
                    <h5 className="ozp-lib-name">{folder}</h5>
                </div></li>
                );
        });

        return (<div>{folderComponents}</div>);


	}
});
module.exports = Folder;