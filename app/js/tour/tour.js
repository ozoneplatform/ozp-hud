'use strict';
var ProfileSearchActions = require('../actions/ProfileSearchActions');
var $ = require('jquery');
var ObjectDB = require('object-db');
//console.log(this.db);

// Setup our LocalstorageDB we will use this to talk between Center,
// Webtop and Hud tours.
var tourDB = new ObjectDB('ozp_tour').get();
//var tourDB = new ObjectDB('ozp_tour').set({
//  hud: {
//    ran: false,
//    startHudTour: false
//  }
//});

console.log(tourDB);

var { hudTour } = require('./');  //var { globalTour, hudTour } = require('./');

var hudStatus = tourDB.get('hud');
//console.log(tourDB);console.log("initiate");console.log(hudStatus.ran);

var initTour = function() {
  // If tour has never run before, start it.
  if(!hudStatus.ran) {
    hudTour.init();
    hudTour.start();
  }
};

ProfileSearchActions.tourCheck.listen(() => {
  // If we close the tour, remember to not show the tour again.
  $(document).on('click', '#end-tour-btn', function() {
    tourDB.set({
      hud: {
        ran: true
      }
    });
  });

  initTour();
});

$(document).on('click', '#tour-start', function(e){
  e.preventDefault();
  hudTour.restart().goTo(1);
});

//console.log(tourDB);
