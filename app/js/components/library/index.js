/** @jsx React.DOM */
var React = require('react');

var appsMallLogo  = './images/AppsMall_Icon.png';
var Folder = require('../folder');
var Sortable = require('../sortable/Sortable');

var libraryData;

var Library = React.createClass({
	
	clickImage: function(url){
		window.open(url);
	},
	
	disconnect: function(app){
		var i = this.state.appArray.indexOf(app);
		this.state.appArray.splice(i, 1);
		this.setState({appArray: this.state.appArray});
	},

    getData: function(){
        var restApps = [];
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "http://localhost:8080/marketplace/api/profile/self/library",
            async: false,
            success: function(data) {
                console.log(JSON.stringify(data));
                libraryData = data;
                for (var i = 0; i < data.length; i++) {
                    var temp = {};
                    temp.folder = data[i].folder;
                    temp.id = data[i].serviceItem.id;
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
    },

    componentWillUnmount: function() {
        clearInterval(this.interval);
    },

	componentWillMount : function(){
        this.interval = setInterval(this.getData, 5000);
        this.getData();
	},
	sort: function(items, dragging) {
		var data = this.state.data;
		data.items = items;
		data.dragging = dragging;
		this.setState({data: data});
  	},
  	disconnect: function(app){
        var j;
        var i = this.state.data.items.indexOf(app);
		this.state.data.items.splice(i, 1);
		this.setState({data: {items: this.state.data.items}});
       
       for(j = 0 ; j< libraryData.length; j++) {
        if(libraryData[j].serviceItem.id === app.id){
            libraryData.splice(j--,1);
        }
       }
        $.ajax({
            type: "DELETE",
            dataType: "json",
            url: "http://localhost:8080/marketplace/api/profile/self/library/" + app.id,
            async: true,
            success: function(data) {
                console.log("MarketPlace REST successful. Application was deleted");
            },
            failure: function(){
                console.log("MarketPlace REST call failed. Application was not deleted");
            }
        });
	},
    folderRename: function(targetFolder, newName){
        var data = this.state.data;
         var j;
        data.items.forEach(function(app){

            if(app.folder === targetFolder){
                console.log(app.id);
                app.folder = newName;
            }
        });
       
       for(j = 0 ; j< libraryData.length; j++) {
        if(libraryData[j].folder === targetFolder){
            libraryData[j].folder = newName;
        }
       }
       console.log(JSON.stringify(libraryData));
         
       // console.log("rename:");
       // console.log(JSON.stringify(data));
        this.setState({data: data});

    },
    folderRenameOnBlur: function(){
        $.ajax({
            type: "PUT",
            contentType: "application/json",
            url: "http://localhost:8080/marketplace/api/profile/self/library/",
            data: JSON.stringify(libraryData),
            async: true,
            success: function(data) {
                console.log("MarketPlace REST successful. Folder name was updated");
            },
            failure: function(){
                console.log("MarketPlace REST call failed. Folder name was not updated");
            }
        });
    },
    render: function () {
        var foldersAndApps = [];
        this.state.data.items.map(function(app, i) {
            if(app.folder === null)
            {
                foldersAndApps.push(app);
            }
            else
            {
                var index = foldersAndApps.map(function(e){ return e.folder;}).indexOf(app.folder);
                if(index === -1)
                {
                    var tempFolder = {};
                    tempFolder.folder = app.folder;
                    tempFolder.items = [];
                    tempFolder.items.push(app);
                    foldersAndApps.push(tempFolder);
                }
                else
                {
                    foldersAndApps[index].items.push(app);
                }
            }
        }, this);

        if(this.state.data.items.length >= 1) {
            var data = this.state.data;
            var disconnect = this.disconnect;
            var sort = this.sort;
            var rename = {renameFolder: this.folderRename, renameOnBlur: this.folderRenameOnBlur};
            var applicationList = foldersAndApps.map(function(app, i){
                    return (
                        <AppBlock sort={sort} data={data} key={i} data-id={i} item={app} disconnect={disconnect} rename={rename}/>
                    );
            });
            return (
	            <div className="applib-main">
	            	<h3 className="applib"><b>Application Library</b></h3>
	            	<ul className="nav navbar-nav applib">
			            {applicationList}

					</ul>
	            </div>
	        );
    	}
    	else {
    		return (
    	            <div className="applib-main">
    	            	<h3 className="applib"><b>Application Library</b></h3>
    	            	<h1 className="empty-app-text">You currently have no <br />
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
    	var boxContent;
    	if(app.folder === null){
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
    				<Folder folder={app} disconnect={this.props.disconnect} rename={this.props.rename}/>
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

module.exports = Library;