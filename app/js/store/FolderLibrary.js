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
    var folderName = newFolder ?
        (newFolder instanceof Folder ? newFolder.name : newFolder) :
        null;

    return Object.freeze({folder: folderName, listing: entry.listing});
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

/**
 * Convert a folderedEntries data strcture into a flat list of entries
 */
function toFlatLibrary(folderedLibrary) {
    return folderedLibrary.flatMap(function(item) {
        return item instanceof Folder ? item.entries : Immutable.List.of(item);
    });
}

/**
 * returns whether or not the item is a folder with the given name
 */
function isMatchingFolder(name, item) {
    return item instanceof Folder && item.name === name;
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

    findFolder: function(name) {
        return this.folderedEntries.find(isMatchingFolder.bind(null, name));
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


        var reorderMethod = getFolderName(toMove) ? 'reorderWithinFolder' : 'reorderTopLevel',
            newFolderedEntries = this[reorderMethod](newBefore, toMove, newAfter);

        LibraryActions.updateLibrary(toFlatLibrary(newFolderedEntries));
    },

    reorderTopLevel: function(newBefore, toMove, newAfter) {
        var removalIndex = this.folderedEntries.indexOf(toMove),
            folderedEntriesAfterRemove = this.folderedEntries
                .splice(removalIndex, 1),
            insertionIndex = newBefore ?
                folderedEntriesAfterRemove.indexOf(newBefore) + 1 :
                folderedEntriesAfterRemove.indexOf(newAfter),
            newFolderedEntries = folderedEntriesAfterRemove.splice(insertionIndex, 0, toMove);

        return newFolderedEntries;
    },

    reorderWithinFolder: function(newBefore, toMove, newAfter) {
        var folderIndex = this.folderedEntries.findIndex(
                isMatchingFolder.bind(null, toMove.folder)),
            folder = this.folderedEntries.get(folderIndex),
            entries = folder.entries,
            removalIndex = entries.indexOf(toMove);

        if (removalIndex === -1) {
            throw new Error('Entry not found in expected folder');
        }

        var entriesAfterRemove = entries.splice(removalIndex, 1),
            insertionIndex = newBefore ?
                entriesAfterRemove.indexOf(newBefore) + 1 :
                entriesAfterRemove.indexOf(newAfter),
            newEntries = entriesAfterRemove.splice(insertionIndex, 0, toMove),
            newFolder = new Folder(null, newEntries),
            newFolderedEntries = this.folderedEntries.set(folderIndex, newFolder);

        return newFolderedEntries;
    },

    onCreateFolder: function(name, entries) {
        if (entries.find(function(entry) { return entry.folder || entry instanceof Folder; })) {
            throw new Error('Trying to create folder with invalid entries');
        }

        var folderIndex = this.folderedEntries.indexOf(entries.get(0)),
            newEntries = entries.map(updateFolderName.bind(null, name)),
            newFolder = new Folder(null, newEntries),
            newFolderedEntries = this.folderedEntries
                //add folder
                .splice(folderIndex, 0, newFolder)
                //remove old, unfoldered entries
                .filterNot(Immutable.List.prototype.contains.bind(entries));

        LibraryActions.updateLibrary(toFlatLibrary(newFolderedEntries));
    },

    onUnFolder: function(name) {
        var folderIndex = this.folderedEntries.findIndex(isMatchingFolder.bind(null, name)),
            folder = this.folderedEntries.get(folderIndex),
            folderedEntries = folder.entries,
            newEntries = folderedEntries.map(updateFolderName.bind(null, null)),
            newFolderedEntries = this.folderedEntries.splice(folderIndex, 1, newEntries);

        LibraryActions.updateLibrary(toFlatLibrary(newFolderedEntries));
    },

    onRemoveFromFolder: function(entry) {
        if (entry instanceof Folder || !entry.folder) {
            throw new Error('Cannot remove this item from folder');
        }

        var folderIndex = this.folderedEntries.findIndex(
                    isMatchingFolder.bind(null, entry.folder)),
            folder = this.folderedEntries.get(folderIndex),
            newEntry = updateFolderName(null, entry),
            newFolderedEntries = folder.entries.size > 1 ?

                //remove entry from folder and place it next to it
                this.folderedEntries
                    .update(folderIndex, function(folder) {
                        var newEntries = folder.entries.filter(function(e) {
                            return e !== entry;
                        });

                        return new Folder(null, newEntries);
                    })
                    .splice(folderIndex + 1, 0, newEntry) :

                //folder would be empty - replace it with the entry
                this.folderedEntries.splice(folderIndex, 1, newEntry);

        LibraryActions.updateLibrary(toFlatLibrary(newFolderedEntries));
    },

    onAddToFolder: function(folder, entry) {
        var newEntry = updateFolderName(folder, entry),
            newFolder = new Folder(folder, newEntry),
            folderIndex = this.folderedEntries.indexOf(folder),
            entryIndex = this.folderedEntries.indexOf(entry),
            newFolderedEntries = this.folderedEntries
                .set(folderIndex, newFolder)
                .splice(entryIndex, 1);

        LibraryActions.updateLibrary(toFlatLibrary(newFolderedEntries));
    },

    getDefaultData: function() {
        return this.folderedEntries;
    }
});

module.exports = FolderLibraryStore;
