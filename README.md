# HUD UI [![Build Status][travis-image]][travis-url]

HUD UI built on [React](http://facebook.github.io/react/), [Gulp](http://gulpjs.com/) and [Webpack](http://webpack.github.io/) build system.

## Getting Started
First clone the repo. Then, install gulp, bower and npm modules.

```
npm install -g gulp
npm install
```

`npm start` or `gulp dev` then go to http://localhost:8080/webpack-dev-server/dist and browser will automatically reload when any file in /app changes. Alternatively, you can also go to http://localhost:8080/dist, if auto reload is undesirable.

## Available tasks
* `gulp` shows all available commands.
* `gulp dev` implements an http server and a live reload server.
* `gulp build --production` generates production build at ./dist directory with minified versions of JS and CSS. Contents of ./dist directory can then be copied to a web server.

[travis-url]: https://travis-ci.org/ozone-development/hud-ui
[travis-image]: https://travis-ci.org/ozone-development/hud-ui.svg