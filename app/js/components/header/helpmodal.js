/** @jsx React.DOM */

var React = require('react/addons');
require('bootstrap');

var HelpModal = React.createClass({
	render: function(){
		return (
			<div className="modal custom fade help-modal-lg" role="dialog" aria-hidden="true">
			  <div className="modal-dialog" id="help-modal">
			    <div className="modal-content">
			      <div className="modal-body">
			      	<button type="button" className="close btn-close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
			      	<h2 className="modal-title help-modal-title">OZONE Help Zone</h2>
			      	<div className="help-modal-textarea">			      	
		      			<div className="help-modal-left">
		      				<p>Lorem ipsum <br/> dolor sit amet <br /> consectetur adipiscing elit. <br /> Aenean euismod <br /> bibendum laoreet. <br /> Proin gravida dolor sit <br /> amet lacus accumsan et <br /> viverra justo commodo.</p>
		      			</div>
		      			<div className="help-modal-right">
		      				<p className="help-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.</p>
		      			</div>
		      		</div>			      	
			      </div>
			    </div>
			  </div>
			</div>
		);

	}
});

module.exports = HelpModal;