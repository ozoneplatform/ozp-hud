'use strict';
var ProfileSearchActions = require('../actions/ProfileSearchActions');
var $ = require('jquery');

var ObjectDB = require('object-db');
var tourDB = new ObjectDB('ozp_tour').init();

// Setup our LocalstorageDB we will use this to talk between Center,
// Webtop and Hud tours.
//var tourDB = new ObjectDB('ozp_tour').init({  //  rjk
if (typeof tourDB.db.data.hud === 'undefined') {
  tourDB.set({
    hud: {
      ran: false,
      startHudTour: false
    }
  });
}

//var { hudTour } = require('./');  //var { globalTour, hudTour } = require('./');  //  rjk
var hudStatus = tourDB.get('hud');

var initTour = function() {
  // If tour has never run before, start it.
  //window.HUD.startTour = function() { //  rjk
  window.startTour = function(libraryLoaded) {
  if(!hudStatus.ran) {
      if(libraryLoaded === true){
        //var tourDB = new ObjectDB('ozp_tour').set({
        tourDB.set({
          library: true,
        });
      }else{
        //var tourDB = new ObjectDB('ozp_tour').set({
        tourDB.set({
          library: false,
        });
      }
      var { hudTour } = require('./');
      hudTour.init();
      hudTour.start();
    }
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
  var { hudTour } = require('./');
  e.preventDefault();
  hudTour.restart().goTo(0);
});
