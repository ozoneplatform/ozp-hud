/** @jsx React.DOM */

var React = require('react/addons');
var Header = require('./header');
var Library = require('./library');

var APP = React.createClass({

    render: function () {
        /*jshint ignore:start */
        return (
            <div>
                <Header />
                <Library />
            </div>
        );
        /*jshint ignore:end */
    }

});



module.exports = APP;