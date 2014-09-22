/** @jsx React.DOM */
'use strict';

require('bootstrap');
var React = require('react');

var FolderModal = React.createClass({

    componentWillMount: function () {
        this.setState({data: {items: this.props.apps}});
    },

    sort: function (items, dragging) {
        var data = this.state.data;
        data.items = items;
        data.dragging = dragging;
        this.setState({data: data});
    },

//<<<<<<< Updated upstream
    showInput: function () {
        $('#'+this.props.folderName.replace(/\W/g, '')+'-header').hide();
        $('#'+this.props.folderName.replace(/\W/g, '')+'-input').show();
    },
/*=======
		var i = this.state.data.items.indexOf(app);
		this.state.data.items.splice(i, 1);
		this.setState({data:{items: this.state.data.items}});
		this.props.disconnect(app);
	},
	render: function(){
    	var click = this.clickImage;
    	var disconnect = this.props.disconnect;
		
		var icons = this.state.data.items.map(function(app, i) {
		//var icons = this.props.apps.map(function(app, i) {

		      return (
		        <AppBlock
		          sort={this.sort}
		          data={this.state.data}
		          key={i}
		          data-id={i}
		          item={app}
		          disconnect={this.disconnectWrapper} />
		      );
		    }, this);
		//<h2><span id={this.props.folderName.replace(/\W/g, '') + '-header'} onClick={this.showInput}> {this.props.folderName}</span></h2>
        //<input type="text" id={this.props.folderName.replace(/\W/g, '') + '-input'} className="folder-name-text-field" value={this.props.folderName} onChange={this.props.rename} hidden />
        return (
			<div className="modal custom fade folder-modal" id={this.props.modalID} tabIndex="-1" role="dialog" aria-hidden="true">
			  <div className="modal-dialog">
			    <div className="modal-content">
					<div className="modal-body">
                        <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
>>>>>>> Stashed changes*/

    disconnect: function (app) {
        if (this.state.data.items.length === 1) {
            $('#' + this.props.modalID).modal('hide');
        }

        var i = this.state.data.items.indexOf(app);
        this.state.data.items.splice(i, 1);
        this.setState({data:{items: this.state.data.items}});
        this.props.disconnect(app);
    },

    render: function () {
        var click = this.clickImage;
        var disconnect = this.props.disconnect;
        var LibraryTile = require('../library/LibraryTile');

        /*jshint ignore:start */
        var icons = this.state.data.items.map(function (app, i) {
            return (
                <LibraryTile
                    sort={this.sort}
                    data={this.state.data}
                    key={i}
                    data-id={i}
                    item={app}
                    disconnect={this.disconnect}
                    rename={this.props.rename}/>
            );
        }, this);

        return (
            <div className="modal custom fade folder-modal" id={this.props.modalID} tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>

                            <div className="folder-header">
                                <h2 className="modal-title folder-modal-header"><span id={this.props.folderName.replace(/\W/g, '') + '-header'} onClick={this.showInput}> {this.props.folderName}</span></h2>
                                <input type="text" id={this.props.folderName.replace(/\W/g, '') + '-input'} className="folder-name-text-field" value={this.props.folderName} onChange={this.props.rename.renameFolder} onBlur={this.props.rename.putToBackend} hidden />
                            </div>
                            <ul className="nav navbar-nav">
                                {icons}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
        /*jshint ignore:end */
    }

});

module.exports = FolderModal;