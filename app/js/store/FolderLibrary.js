'use strict';

var Reflux = require('reflux');
var Immutable = require('immutable');
var LibraryStore = require('./Library');
var LibraryActions = require('../actions/Library');

var Folder = require('../api/Folder');

/**
 * @return a new entry that is just like the old one but with
 * its folder set to the old foldername
 */
function updateFolderName(newFolder, entry) {
    var newEntry = Object.create(null, entry);
    newEntry.folder = name;

    return Object.freeze(newEntry);
}

/**
 * Get the name of the folder containing item.  NOTE: If item is a folder itself,
 * this will be the name of the folder containing that folder (currently always null), not the
 * name of the folder itself
 */
function getFolderName(item) {
    if (item instanceof Folder) {
        return null;
    }
    else {
        return item.folder;
    }
}

/**
 * @return the object upon which the position of item is based.  For normal entries, this is the
 * item itself.  For folders, it is the first entry in the folder
 */
function getIndexableItem(item) {
    if (item instanceof Folder) {
        return item.entries[0];
    }
    else {
        return item;
    }
}

function toFlatLibrary(folderedLibrary) {
    return folderedLibrary.flatMap(function(item) {
        return item instanceof Folder ? item.entries : Immutable.List.of(item);
    });
}

/**
 * This store provides a view in front of LibraryStore which
 * organizes the entries into folders.  It contains the logic for implementing various
 * high-level reordering and foldering actions
 */
var FolderLibraryStore = Reflux.createStore({
    //reference to the data from the LibraryStore
    flatLibrary: null,

    folderedEntries: null,

    init: function() {
        this.flatLibrary = Immutable.List();
        this.folderedEntries = Immutable.List();

        this.listenTo(LibraryStore, this.onBackingStoreChange);
        this.listenToMany(LibraryActions);
    },

    onBackingStoreChange: function(entries) {

        //a list where each element is either an entry or a folder of entries
        var folderedEntries = entries.reduce(function(acc, ent) {
            if (!ent.folder) {
                return acc.push(ent);
            }
            else {
                var existingFolder = acc.find(function(el) {
                    return el instanceof Folder && el.name === ent.folder;
                });

                if (existingFolder) {
                    var folderIndex = acc.indexOf(existingFolder);
                    return acc.splice(folderIndex, 1, new Folder(existingFolder, ent));
                }
                else {
                    return acc.push(new Folder(null, ent));
                }
            }
        }, Immutable.List());

        this.flatLibrary = entries;
        this.folderedEntries = folderedEntries;

        this.trigger(folderedEntries);
    },

    onReorder: function(newBefore, toMove, newAfter) {
        if (!(newBefore || newAfter)) {
            throw new Error('Trying to reorder without specifying either adjacency');
        }

        if ((newBefore && getFolderName(newBefore) !== getFolderName(toMove)) ||
                    (newAfter && getFolderName(newAfter) !== getFolderName(toMove))) {
            throw new Error('Attempting to reorder of items that are not ' +
                    'in the same folder');
        }

        var removalIndex = this.folderedEntries.indexOf(toMove),
            folderedEntriesAfterRemove = this.folderedEntries
                .splice(removalIndex, 1),
            insertionIndex = newBefore ?
                folderedEntriesAfterRemove.indexOf(newBefore) + 1 :
                folderedEntriesAfterRemove.indexOf(newAfter),
            newFolderedEntries = folderedEntriesAfterRemove.splice(insertionIndex, 0, toMove);

        LibraryActions.updateLibrary(toFlatLibrary(newFolderedEntries));
    },

    onCreateFolder: function(name, entries) {
        if (entries.find(function(entry) { return entry.folder || entry instanceof Folder; })) {
            throw new Error('Trying to create folder with invalid entries');
        }

        var folderIndex = this.folderedEntries.indexOf(entries[0]),
            newEntries = entries.map(updateFolderName.bind(null, name)),
            newFolder = new Folder(name, newEntries),
            newFolderedEntries = this.folderedEntries
                //add folder
                .splice(folderIndex, 0, newFolder)
                //remove old, unfoldered entries
                .filter(Immutable.List.prototype.contains.bind(entries));

        LibraryActions.updateLibrary(toFlatLibrary(newFolderedEntries));
    },

    onUnFolder: function(name) {
        function findFolderEntry(entry) {
            return entry instanceof Folder && entry.name === name;
        }

        var folderIndex = this.folderedEntries.findIndex(findFolderEntry),
            folder = this.folderedEntries.find(findFolderEntry),
            folderedEntries = folder.entries,
            newEntries = folderedEntries.map(updateFolderName.bind(null, null)),
            newFolderedEntries = this.folderedEntries.splice(folderIndex, 1, newEntries);

        LibraryActions.updateLibrary(toFlatLibrary(newFolderedEntries));
    },

    getDefaultData: function() {
        return this.folderedEntries;
    }
});

module.exports = FolderLibraryStore;
