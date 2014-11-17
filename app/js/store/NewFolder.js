'use strict';

var Reflux = require('reflux');
var LibraryActions = require('../actions/Library');

//a store that holds the name of the current "New Folder" - a folder that has just
//been created but not explicitly named yet.  This store exists so that the UI
//can figure out which listing to auto-open the editable on
var NewFolderStore = Reflux.createStore({
    //the current new folder, whose title hasn't yet been specified by the user
    newFolderName: null,

    init: function() {
        this.listenToMany(LibraryActions);
    },

    setName: function(name) {
        this.newFolderName = name;
        this.trigger(this.newFolderName);
    },

    onFolderCreated: function(name) {
        this.setName(name);
    },

    onRenameFolder: function(oldName) {
        if (this.newFolderName === oldName) {
            this.setName(null);
        }
    },

    onUnFolder: function(name) {
        if (this.newFolderName === name) {
           this.setName(name);
        }
    },

    getDefaultData: function() {
        return this.newFolderName;
    }
});

module.exports = NewFolderStore;
