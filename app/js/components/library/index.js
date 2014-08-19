/** @jsx React.DOM */
var React = require('react');

var data = require('../../../data.js');

var apps = data.appLibrary;

var Library = React.createClass({

    render: function () {
    	var icons = apps.map(function(app){
			return(
				<li key={app.img}>
	                <a href="#">
		    			<img src={app.img} />
	    			</a>
    			</li>
			);
		});
    	
    	return (
            <div id="search">
            	<h3 id="applib"><b>Application Library</b></h3>
            	<ul id="applib" className="nav navbar-nav">
		            {icons}
				</ul>
            </div>
        );
    }

});

module.exports = Library;