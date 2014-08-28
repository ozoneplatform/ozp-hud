/** @jsx React.DOM */

'use strict';

var React = require('react/addons');
var Header = require('./header');
var Library = require('./library');
var Settings = require('./settings');
var HelpModal = require('./header/helpmodal.js');

var APP = React.createClass({

    render: function () {
        //return this.renderHUD();
        return this.renderSettings();
    },

	renderHUD: function(){
		/*jshint ignore:start */
        return (
            <div>
            	<Header />            	
                <Library />
                <HelpModal />
            </div>
        );
        /*jshint ignore:end */ 
	},
	
	renderSettings: function(){
		/*jshint ignore:start */
		return (
            <div>
            	<Header />
            	<Settings />
            </div>
        );
        /*jshint ignore:end */
	}
});

module.exports = APP;