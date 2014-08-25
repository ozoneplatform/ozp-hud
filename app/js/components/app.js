/** @jsx React.DOM */

'use strict';

var React = require('react/addons');
var Header = require('./header');
var Library = require('./library');
var HelpModal = require('./header/helpmodal.js');

var APP = React.createClass({

    render: function () {
        /*jshint ignore:start */
        return (
            <div>
            	<Header />            	
                <Library />
                <HelpModal />
            </div>
        );
        /*jshint ignore:end */
    }

});



module.exports = APP;