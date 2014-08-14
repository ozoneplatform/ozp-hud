/** @jsx React.DOM */

'use strict';

var React = require('react/addons');
var Header = require('./header');

var APP = React.createClass({

    render: function () {
        /*jshint ignore:start */
        return (
            <div>
                <Header />
            </div>
        );
        /*jshint ignore:end */
    }

});



module.exports = APP;