/** @jsx React.DOM */
'use strict';
var React = require('react');

var Router = require('react-router');
var Routes = Router.Routes;
var Route = Router.Route;

var FolderModal = require('./components/folder/FolderModal');

var $ = require('jquery');

$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
    options.xhrFields = {
        withCredentials: true
    };
});

var App = require('./components/app');

// Enable React developer tools
window.React = React;
window.$ = $;
window.jQuery = $;

/*jshint ignore:start */
React.renderComponent(
    <Routes>
        <Route path="/" handler={App}>
            <Route name="folder" path="folder/:name" handler={FolderModal} />
        </Route>
    </Routes>,
    document.getElementById('main')
);
/*jshint ignore:end */
