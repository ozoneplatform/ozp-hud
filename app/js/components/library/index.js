/** @jsx React.DOM */
var React = require('react');

var data = require('../../../data');
var appsMallLogo  = './images/AppsMall_Icon.png';

//var apps = data.appLibrary;

var Folder = require('../folder');
var Sortable = require('../sortable/Sortable');

var Library = React.createClass({
	
	clickImage: function(url){
		window.open(url);
	},
	
	disconnect: function(app){
		var i = this.state.appArray.indexOf(app);
		this.state.appArray.splice(i, 1);
		this.setState({appArray: this.state.appArray});
	},

	componentWillMount : function(){
        var scope = this;
        var restApps = [];
        var folders = [];
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "http://localhost:8080/marketplace/api/profile/self/library",
            async: false,
            success: function(data) {
                var folderList = [];
                for (var i = 0; i < data.length; i++) {
                    var temp = {};
                    if(folderList.indexOf(data[i].folder) === -1)
                    {
                        folderList.push(data[i].folder);
                    }
                    else
                    {
                        folders.push(data[i].folder);
                    }

                    temp.folder = data[i].folder;
                    temp.img = data[i].serviceItem.imageLargeUrl;
                    temp.name = data[i].serviceItem.title;
                    temp.url = data[i].serviceItem.launchUrl;
                    restApps.push(temp);
                }
            },
            failure: function(){
                console.log("MarketPlace REST call failed. Loading with no applications");
            }
         });
        this.setState({data: {items: restApps}});
        this.setState({folders: folders});
        //this.setState({appArray: restApps});
	},
	sort: function(items, dragging) {
		var data = this.state.data;
		data.items = items;
		data.dragging = dragging;
		this.setState({data: data});
  	},
  	disconnect: function(app){
		var i = this.state.data.items.indexOf(app);
		this.state.data.items.splice(i, 1);
		this.setState({data: {items: this.state.data.items}});
	},
    render: function () {
    	if(this.state.data.items.length >= 1) {
	        var icons = this.state.data.items.map(function(app, i) {
                if(this.state.folders.indexOf(app.folder) === -1) {
                    return (
                        <AppBlock sort={this.sort} data={this.state.data} key={i} data-id={i} item={app} disconnect={this.disconnect} />
                    );
                }
            }, this);

            var tempFolders = [];
            //var folderName;
            this.state.data.items.map(function(app, i) {

                if(this.state.folders.indexOf(app.folder) !== -1) {
                    tempFolders.push(app);
                    //folderName = app.folder;
                }
            }, this);

            var folders = <Folder apps={tempFolders} folders={this.state.folders}/>;
            //var folders = <Folder apps={tempFolders} folderName={folderName}/>;

            //<li><Folder /></li>
            return (
	            <div className="applib-main">
	            	<h3 className="applib"><b>Application Library</b></h3>
	            	<ul className="nav navbar-nav applib">
			            {icons}
                        {folders}
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
	render: function(){
    	var click = this.clickImage;
    	var app = this.props.item;
    	var disconnect = this.props.disconnect.bind(null,this.props.item);
		return this.transferPropsTo(
				<li key={app.name} className={this.isDragging() ? "dragging" : ""} onDragStart={this.sortStart} 
												onDragOver={this.dragOver}  onMouseUp={this.sortEnd} onDrop={this.sortEnd}>
					<i className="fa fa-ellipsis-h fa-2x tileIcon" data-toggle="dropdown"></i>
					<ul className="dropdown-menu tileIcon-dropdown" role="menu">
	                	<li onClick={disconnect}>Disconnect</li>
	                </ul>
					<img className="applib-tiles" src={app.img} onClick={click.bind(null, app.url)}/>
					<h5 className="ozp-lib-name">{app.name}</h5>
    			</li>
			);
	}
});

module.exports = Library;