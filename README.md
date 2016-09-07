# HUD UI [![Build Status][travis-image]][travis-url]

HUD UI built on [React](http://facebook.github.io/react/), [Gulp](http://gulpjs.com/) and [Webpack](http://webpack.github.io/) build system.

## Getting Started
First clone the repo. Then, install gulp, bower and npm modules.

```
npm install -g gulp
npm install
```

`npm start` then go to http://localhost:8088/webpack-dev-server/dist and browser will automatically reload when any file in /app changes. Alternatively, you can also go to http://localhost:8088/dist, if auto reload is undesirable.

## Available tasks
See `scripts` key in `package.json` for all options.
* `npm start` implements an http server and a live reload server.
* `npm run build` generates production build at ./dist directory with minified versions of JS and CSS. Contents of ./dist directory can then be copied to a web server.
* `npm run deployGhPages` runs a build with demo configs and deploys ./dist to github pages.
