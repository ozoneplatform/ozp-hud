'use strict';

var Reflux = require('reflux');
var Immutable = require('immutable');
var LibraryActions = require('../actions/Library');
var LibraryApi  = require('../api/Library').LibraryApi;

/**
 * This store manages the simple list of library entries
 */
var LibraryStore = Reflux.createStore({
    //the actual object storing the library records
    library: Immutable.List(),

    listenables: LibraryActions,

    init: function(){
      this.listenTo(LibraryActions.viewFolder, LibraryActions.fetchLibrary);
    },

    updateLibrary: function(entries) {
        this.library = Immutable.List(entries.map(function(e) {
            return Object.freeze(e);
        }));


        this.trigger(this.library);
    },

    onFetchLibrary: function () {
        LibraryApi.get().then(this.updateLibrary.bind(this)).then(()=>{
            LibraryActions.hasLoaded();
        });
    },

    onUpdateLibrary: function(libraryEntries) {
        LibraryApi.save(libraryEntries).then(this.updateLibrary.bind(this));
    },

    onRemoveFromLibrary: function(libraryEntry) {
        var libraryId = libraryEntry.id,
            listingId = libraryEntry.listing.id,
            me = this;

        LibraryApi.del(libraryId).then(function() {
            me.library = me.library.filter(function (entry) {
                return entry.listing.id !== listingId;
            });

            me.trigger(me.library);
        });
    }
});

module.exports = LibraryStore;
