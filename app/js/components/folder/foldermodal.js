/** @jsx React.DOM */
var React = require('react/addons');
require('bootstrap');
var Sortable = require('../sortable/Sortable');

var FolderModal = React.createClass({
	componentWillMount : function(){
        this.setState({data: {items: this.props.apps}});
	},
	sort: function(items, dragging) {
		var data = this.state.data;
		data.items = items;
		data.dragging = dragging;
		this.setState({data: data});
  	},
	showInput: function(){
		$('#'+this.props.folderName.replace(/\W/g, '')+'-header').hide();
		$('#'+this.props.folderName.replace(/\W/g, '')+'-input').show();

	},
	disconnectWrapper: function(app){
		console.log(this.state.data.items.length);
		console.log(app);
		if(this.state.data.items.length === 1){
			$('#' + this.props.modalID).modal('hide');
		}

		var i = this.state.data.items.indexOf(app);
		this.state.data.items.splice(i, 1);
		this.setState({data:{items: this.state.data.items}});
		this.props.disconnect(app);
	},
	render: function(){
    	var click = this.clickImage;
    	var disconnect = this.props.disconnect;
		
		 var icons = this.state.data.items.map(function(app, i) {
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
                        <h2 className="modal-title folder-modal-header"><span id={this.props.folderName.replace(/\W/g, '') + '-header'} > {this.props.folderName}</span></h2>
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

var AppBlock = React.createClass({
	mixins: [Sortable],
	clickImage: function(url){
		window.open(url);
	},
	render: function(){
    	var click = this.clickImage;
    	var app = this.props.item;
    	var disconnect = this.props.disconnect.bind(null,this.props.item);
    	var boxContent;
    	if(app.name !== 'Folder'){
    		boxContent = (
    				<div>
	    				<i className="fa fa-ellipsis-h fa-2x tileIcon" data-toggle="dropdown"></i>
						<ul className="dropdown-menu tileIcon-dropdown" role="menu">
		                	<li onClick={disconnect}>Disconnect</li>
		                </ul>
						<img className="applib-tiles" src={app.img} onClick={click.bind(null, app.url)}/>
						<h5 className="ozp-lib-name">{app.name}</h5>
					</div>
					);
    	}else{
    		boxContent = (
    				<Folder />
    			);
    	}

		return this.transferPropsTo(
				<li key={app.name} className={this.isDragging() ? "dragging" : ""} onDragStart={this.sortStart} 
												onDragOver={this.dragOver}  onMouseUp={this.sortEnd} onDrop={this.sortEnd}>
					{boxContent}
    			</li>
			);
	}
});


module.exports = FolderModal;