'use strict';
var ProfileSearchActions = require('../actions/ProfileSearchActions');
var $ = require('jquery');

var ObjectDB = require('object-db');

// Setup our LocalstorageDB we will use this to talk between Center,
// Webtop and Hud tours.
var tourDB = new ObjectDB('ozp_tour').init({
  hud: {
    ran: false,
    startHudTour: false,
    myName: 'russell'
  },
  hud_name: 'russell',
  hud_start: false,
  hud_ran: false
});



//  rjk
//var tourDB = new ObjectDB('ozp_tour').init();
//
//// Setup our LocalstorageDB we will use this to talk between Center,
//// Webtop and Hud tours.
//
//console.log(tourDB);
//if(!tourDB.hud_ran){
//  tourDB.set({
//    hud: {
//      ran: false,
//      startHudTour: false,
//      myName: 'russell'
//    },
//    hud_name: 'russell',
//    hud_start: false,
//    hud_ran: false
//  });
//}

//var { hudTour } = require('./');  //var { globalTour, hudTour } = require('./');
var hudStatus = tourDB.get('hud');

var initTour = function() {
  // If tour has never run before, start it.
  window.startTour = function(libraryLoaded) {
  //var hudStatus = new ObjectDB('ozp_tour').get();
  //console.log(hudStatus);
  //console.log(hudStatus.hud.ran);
  if(!hudStatus.ran) {
    //window.HUD.startTour = function() {
    //window.startTour = function(libraryLoaded) {
      console.log('launch');
      if(libraryLoaded === true){
        var tourDB = new ObjectDB('ozp_tour').set({
          library: true,
        });
      }else{
        var tourDB = new ObjectDB('ozp_tour').set({
          library: false,
        });
      }
      var { hudTour } = require('./');
      hudTour.init();
      hudTour.start();
      //hudTour.setCurrentStep(7);
      //hudTour.getStep(7);
    }
  }
};


ProfileSearchActions.tourCheck.listen(() => {
  // If we close the tour, remember to not show the tour again.
  $(document).on('click', '#end-tour-btn', function() {
    console.log('end');
    tourDB.set({
      hud: {
        ran: true
      },
      hud_ran: true
    });
    console.log(tourDB);
  });

  initTour();
});

$(document).on('click', '#tour-start', function(e){
  var { hudTour } = require('./');
  e.preventDefault();
  hudTour.restart().goTo(7);
});
