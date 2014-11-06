'use strict';

var Reflux = require('reflux');
var Immutable = require('immutable');
var FolderLibraryStore = require('./FolderLibrary');
var LibraryActions = require('../actions/Library');
var Folder = require('../api/Folder');


/**
 * Constructor for a store that provides the listings within a given folder
 */
var CurrentFolderStore = Reflux.createStore({
    init: function() {
        this.listenTo(FolderLibraryStore, this.onBackingStoreChange);
        this.listenTo(LibraryActions.viewFolder, this.onNameChange);
        this.listenTo(LibraryActions.stopViewingFolder, this.onNameChange.bind(this, null));

        this.name = null;
    },

    onNameChange: function(folderName) {
        this.name = folderName;
        this.trigger(this.getFolderData(FolderLibraryStore.getDefaultData()));
    },

    onBackingStoreChange: function(library) {
        this.trigger(this.getFolderData(library));
    },

    getDefaultData: function() {
        return this.getFolderData(FolderLibraryStore.getDefaultData());
    },

    getFolderData: function(library) {
        var me = this,
            folder = library.find(function(item) {
                return item instanceof Folder && item.name === me.name;
            });

        return folder ? folder.entries : Immutable.List();
    }
});

module.exports = CurrentFolderStore;
