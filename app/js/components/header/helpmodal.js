/** @jsx React.DOM */

var React = require('react');
require('bootstrap');

var HELP_OPTIONS = 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.';
var HELP_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.';

var HelpModal = React.createClass({

    render: function () {
        /*jshint ignore:start */
        return (
            <div className="modal custom fade help-modal-lg" role="dialog" aria-hidden="true">
                <div className="modal-dialog" id="help-modal">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button type="button" className="close btn-close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
                            <h2 className="modal-title help-modal-title">OZONE Help Zone</h2>
                            <div className="help-modal-textarea">
                                <div className="help-modal-left">
                                    <p>{ HELP_OPTIONS }</p>
                                </div>
                                <div className="help-modal-right">
                                    <p className="help-text">{ HELP_TEXT }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        /*jshint ignore:end */
    }

});

module.exports = HelpModal;