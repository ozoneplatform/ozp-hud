'use strict';

window.Object.assign = require('object-assign');

require('console-polyfill');
var React = require('react');
var Router = require('react-router');
var { Route } = Router;

require('bootstrap');

var FolderModal = require('./components/folder/FolderModal.jsx');
var CurrentProfileWindow = require('./components/header/CurrentProfileWindow.jsx');
var HudContactsWindow = require('./components/HudContactsWindow.jsx');
var Add = require('./components/folder/Add.jsx');

var ProfileActions = require('ozp-react-commons/actions/ProfileActions');

var {
  API_URL,
  APP_TITLE,
  IE_REDIRECT_URL,
  SYSTEM_HIGH_CLASSIFICATION
} = require('ozp-react-commons/OzoneConfig');

var $ = require('jquery');

var getCookie = function(cookieName) {
    var cookieValue = null;

    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');

        $.each(cookies, function(index, cookie) {
            var cookie = $.trim(cookie);

            // Does this cookie string begin with the cookieName we want?
            if (cookie.substring(0, cookieName.length + 1) === (cookieName + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(cookieName.length + 1));

                // Returning false breaks out of $.each
                return false;
            }
        });
    }

    return cookieValue;
};

$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    options.xhrFields = {
        withCredentials: true
    };

    var requestType = options['type'].toLowerCase();
    if (requestType === 'post' || requestType === 'delete') {
        jqXHR.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
    }
});

var App = require('./components/app.jsx');

// Enable React developer tools
window.React = React;
window.$ = $;
window.jQuery = $;

$(document).ajaxError(function (event, jqxhr, settings, thrownError ) {
    if (settings.url.indexOf('/api/') >= 0 && thrownError === 'FORBIDDEN') {
        window.location = API_URL + '/accounts/login/';
    }
});

var Routes = (
    <Route name="main" path="/" handler={App}>
        <Route name="add" path="add/:name/:ids" handler={Add} />
        <Route name="folder" path="folder/:name" handler={FolderModal} />
        <Route name="profile" path="profile" handler={CurrentProfileWindow} />
        <Route name="contacts" path="contacts" handler={HudContactsWindow} />
    </Route>
);

Router.run(Routes, function (Handler, state) {
    React.render(<Handler params={ state.params } />, document.getElementById('main'));
});

ProfileActions.fetchSelf();

require('tour');
require('./tour/tour.js');

document.title = APP_TITLE;

$(document).classification({
    level: SYSTEM_HIGH_CLASSIFICATION,
    colorBanners: true
});

function detectIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');

    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    // other browser
    return false;
 }

if (detectIE() && detectIE() < 10) {
    /*jshint ignore:start*/
    alert(`
        This site is tested against the following browsers:
        IE 11+
        FireFox 24+
        Chrome 36+
        We have detected that you are using an unsupported browser and some features may not function as expected
    `);
    /*jshint ignore:end*/
    window.open(IE_REDIRECT_URL);
}
