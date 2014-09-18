/** @jsx React.DOM */
var APP = require('./components/app');
var React = require('react');
var $ = require('jquery');

// Enable React developer tools
window.React = React;
window.$ = $;
window.jQuery = $;

/*jshint ignore:start */
React.renderComponent(<APP />, document.getElementById('main'));
/*jshint ignore:end */