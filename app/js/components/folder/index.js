/** @jsx React.DOM */
'use strict';

var React = require('react');
var FolderModal = require('../folder/foldermodal');

var Folder = React.createClass({

    rename: function (event) {
        //this.setState({folderName: event.target.value});
        this.props.rename.renameFolder(this.props.folder.folder, event.target.value);
    },

    render: function () {
        //TODO make this work for repeated folder names
        var apps = this.props.folder.items;
        var modalID = 'folder-modal-lg-' + this.props.folder.folder.replace(/\W/g, '');
        var rename = {renameFolder: this.rename, putToBackend: this.props.rename.putToBackend};

        /*jshint ignore:start */
        var thumbnails = apps.map(function (app) {
            return(<img key={app.serviceItem.title} src={app.serviceItem.imageLargeUrl}/>);

        });

        return (
            <div>
                <a href="#" data-toggle="modal" data-target={'#' + modalID}>
                    <div className="app-folder">
                        {thumbnails}
                    </div>
                </a>
                <h5 className="ozp-lib-name">{this.props.folder.folder}</h5>
                {
                    <FolderModal 
                        modalID={modalID} 
                        folderName={this.props.folder.folder} 
                        apps={apps} 
                        removeBookmark={this.props.removeBookmark} 
                        rename={rename} />
                }
            </div>
        );
        /*jshint ignore:end */
    }

});
module.exports = Folder;