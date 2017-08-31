'use strict';

var Reflux = require('reflux');
var Immutable = require('immutable');
var LibraryActions = require('../actions/Library');
var LibraryApi  = require('../api/Library').LibraryApi;
var pass1 = false;

/**
 * This store manages the simple list of library entries
 */
var LibraryStore = Reflux.createStore({
    //the actual object storing the library records
    library: Immutable.List(),

    listenables: LibraryActions,

    init: function(){
      this.listenTo(LibraryActions.viewFolder, this.viewFolder);
    },

    updateLibrary: function(entries) {
        this.library = Immutable.List(entries.map(function(e) {
            return Object.freeze(e);
        }));
        this.trigger(this.library);
    },

    viewFolder: function(){
        LibraryActions.hasLoaded();
    },

    onFetchLibrary: function () {
        LibraryApi.get().then(this.updateLibrary.bind(this)).then(()=>{
            LibraryActions.hasLoaded();
            if(pass1 === false){
              if(this.library.size >= 1){
                window.startTour(true);
              }else{
                window.startTour(false);
              }
              pass1 = true;
            }
        });
    },

    onUpdateLibrary: function(libraryEntries) {


        LibraryApi.save(libraryEntries).then(
            // GET to ensure updateLibrary happens after GET from onFetchLibrary()
            ()=>LibraryApi.get()).then(
                ()=>this.updateLibrary(libraryEntries));
    },

    onRemoveFromLibrary: function(libraryEntry) {
        var libraryId = libraryEntry.id,
            me = this;

        LibraryApi.del(libraryId).then(function() {
            me.library = me.library.filter(function (entry) {
                return entry.id !== libraryId;
            });

            me.trigger(me.library);
            LibraryActions.fetchLibrary();
        });
    }
});

module.exports = LibraryStore;
