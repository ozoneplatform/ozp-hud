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
    library: null,

    init: function() {
        this.library = Immutable.List();
        this.listenToMany(LibraryActions);
    },

    updateLibrary: function(entries) {
        this.library = Immutable.List(entries.map(function(e) {
            return Object.freeze(e);
        }));

        this.trigger(this.library);
    },

    onFetchLibrary: function () {
        LibraryApi.get().then(this.updateLibrary.bind(this));
    },

    onUpdateLibrary: function(libraryEntries) {
        LibraryApi.save(libraryEntries).then(this.updateLibrary.bind(this));
    },

    onRemoveFromLibrary: function(libraryEntry) {
        var idToRemove = libraryEntry.listing.id,
            me = this;

        LibraryApi.del(idToRemove).then(function() {
            me.library = me.library.filter(function (entry) {
                return entry.listing.id !== idToRemove;
            });

            me.trigger(me.library);
        });
    }
});

module.exports = LibraryStore;
