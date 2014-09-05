/** @jsx React.DOM */
var React = require('react');

var Settings = React.createClass({

    render: function () {
    	return (
    		<div className="modal custom fade settings-modal-lg" role="dialog" aria-hidden="true">
    			<div className="modal-dialog settings-modal">
    				<div className="modal-content">
    					<div className="modal-body settings-body">
	    					<button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
	    		    		<h3 className="modal-title">Settings</h3>
	    		    		<form className="form-horizontal settings-form">
	    		    			<div className="form-group">
	    		    				<label className="setting-labels">Animations</label>
	    		    				<div className="settings-btn-group btn-group">
	    				    			<button type="button" className="btn btn-default settings-btn">Off</button>
	    				  		  		<button type="button" className="btn btn-primary settings-btn">On</button>
	    				    		</div>
	    		    			</div>
	    		    			<div className="form-group">
	    							<label className="setting-labels">Shadows</label>
	    							<div className="settings-btn-group-shadow btn-group">
	    				    			<button type="button" className="btn btn-default settings-btn">Off</button>
	    				  		  		<button type="button" className="btn btn-primary settings-btn">On</button>
	    				    		</div>
	    						</div>
	    						<div className="form-group">
	    							<label className="setting-labels">Time Zone</label>
	    							<div className="btn-group settings-dropdown">
	    							<button className="btn btn-default dropdown-toggle settings-dropdown-button settings-btn" type="button" data-toggle="dropdown">Select Timezone <span className="caret"></span></button>
	    							<ul className="dropdown-menu settings-dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
	    								<li role="presentation"><a role="menuitem" tabIndex="-1" href="#">Coordinated Universal Time (Z)</a></li>
	    								<li role="presentation"><a role="menuitem" tabIndex="-1" href="#">Samoa Standard Time</a></li>
	    								<li role="presentation"><a role="menuitem" tabIndex="-1" href="#">Hawaii-Aleutian Statdard Time</a></li>
	    								<li role="presentation"><a role="menuitem" tabIndex="-1" href="#">Alaska Standard Time</a></li>
	    								<li role="presentation"><a role="menuitem" tabIndex="-1" href="#">Pacific Standard Time</a></li>
	    								<li role="presentation"><a role="menuitem" tabIndex="-1" href="#">Mountain Standard Time</a></li>
	    								<li role="presentation"><a role="menuitem" tabIndex="-1" href="#">Central Statdard Time</a></li>
	    								<li role="presentation"><a role="menuitem" tabIndex="-1" href="#">Eastern Standard Time</a></li>
	    								<li role="presentation"><a role="menuitem" tabIndex="-1" href="#">Atlantic Standard Time</a></li>
	    								<li role="presentation"><a role="menuitem" tabIndex="-1" href="#">Chamorro Standard Time</a></li>
	    							</ul>
	    							</div>
	    						</div>
	    						<div className="form-group">
	    							<label className="setting-labels">Default Launch <br /> Method</label>
	    							<div className="settings-btn-group-launch btn-group">
	    				    			<button type="button" className="btn btn-default settings-btn">Dashboard</button>
	    				  		  		<button type="button" className="btn btn-primary settings-btn">Webtop</button>
	    				    		</div>
	    						</div>
	    		    			<div className="settings-submit-btn-group">
	    							<button type="button" className="settings-submit-btn btn btn-default settings-btn">Reset to Default</button>
	    							<button type="button" className="settings-submit-btn btn btn-primary settings-btn">Save Settings</button>
	    		  		  		</div>
	    		    		</form>
    					</div>
    				</div>
    			</div>
    		</div>);
    }

});

module.exports = Settings;