/** @jsx React.DOM */
'use strict';

var React = require('react');
var FolderModal = require('../folder/foldermodal');

var Folder = React.createClass({

    getInitialState: function () {
        return {
            folderName: this.props.folder.folder,
            apps: this.props.folder.items
        };
    },

    rename: function (event) {
        this.setState({folderName: event.target.value});
        this.props.rename.renameFolder(this.state.folderName, event.target.value);
    },

    render: function () {
        //TODO make this work for repeated folder names
        var apps = this.state.apps;
        var modalID = 'folder-modal-lg-' + this.state.folderName.replace(/\W/g, '');
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
                <h5 className="ozp-lib-name">{this.state.folderName}</h5>
                <FolderModal folderName={this.state.folderName} apps={apps} disconnect={this.props.disconnect} modalID={modalID} rename={rename} />
            </div>
        );
        /*jshint ignore:end */
    }

});
module.exports = Folder;