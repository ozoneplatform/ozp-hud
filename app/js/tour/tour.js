'use strict';

var { hudTour } = require('./');

$(document).on('click', '#tour-start', function(){
  window.localStorage.clear();
  hudTour.init();
  hudTour.start();
});
