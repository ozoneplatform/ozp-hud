'use strict';

window.Object.assign = require('object-assign');

require('console-polyfill');
require('bootstrap');
var React = require('react');
var Router = require('react-router');
var { Route } = Router;

var FolderModal = require('./components/folder/FolderModal.jsx');
var CurrentProfileWindow = require('./components/header/CurrentProfileWindow.jsx');
var HudSettingsWindow = require('./components/HudSettingsWindow.jsx');
var ListingManagementPage = require('./components/sections/MyListings.jsx');

var ProfileActions = require('ozp-react-commons/actions/ProfileActions');

var { APP_TITLE } = require('ozp-react-commons/OzoneConfig');

var $ = require('jquery');

$.ajaxPrefilter(function(options) {
    options.xhrFields = {
        withCredentials: true
    };
});

var App = require('./components/app.jsx');

// Enable React developer tools
window.React = React;
window.$ = $;
window.jQuery = $;

var Routes = (
    <Route name="main" path="/" handler={App}>
        <Route name="folder" path="folder/:name" handler={FolderModal} />
        <Route name="profile" path="profile" handler={CurrentProfileWindow} />
        <Route name="settings" path="settings" handler={HudSettingsWindow} />
        <Route name="test" path="test" handler={ListingManagementPage} />
    </Route>
);

Router.run(Routes, function (Handler, state) {
    React.render(<Handler params={ state.params } />, document.getElementById('main'));
});

ProfileActions.fetchSelf();

document.title = APP_TITLE;
