'use strict';

var React = require('react');
require('bootstrap');

var HELP_OPTIONS = 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.';
var HELP_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.';

var helpPDF = 'assets/PlaceholderUserGuide.pdf';

var HelpModal = React.createClass({

    render: function () {
        /*jshint ignore:start */
        return (
            <div id="help-modal" className="modal custom fade" role="dialog" aria-hidden="true">
                <div className="modal-dialog  modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                                <h4 className="modal-title">OZONE Help Zone</h4>
                        </div>
                        <div className="modal-body">
                            <embed width="100%" height="500px" name="plugin" src={helpPDF} type="application/pdf"></embed>
                        </div>
                    </div>
                </div>
            </div>
        );
        /*jshint ignore:end */
    }

});

module.exports = HelpModal;
