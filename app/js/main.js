/** @jsx React.DOM */
var React = require('react');
var $ = require('jquery');

$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
    options.xhrFields = {
        withCredentials: true
    };
});

var APP = require('./components/app');

// Enable React developer tools
window.React = React;
window.$ = $;
window.jQuery = $;

/*jshint ignore:start */
React.renderComponent(<APP />, document.getElementById('main'));
/*jshint ignore:end */
