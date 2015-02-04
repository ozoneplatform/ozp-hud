'use strict';

require('bootstrap');
var React = require('react');
var Router = require('react-router');
var { Route } = Router;

var FolderModal = require('./components/folder/FolderModal');
var CurrentProfileWindow = require('./components/header/CurrentProfileWindow');

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
var Routes = (
    <Route name="main" path="/" handler={App}>
        <Route name="folder" path="folder/:name" handler={FolderModal} />
        <Route name="profile" path="profile" handler={CurrentProfileWindow} />
    </Route>
);

Router.run(Routes, function (Handler, state) {
    React.render(<Handler params={ state.params } />, document.getElementById('main'));
});
/*jshint ignore:end */
