'use strict';

var Immutable = require('immutable');

/**
 * Simple immutable class to represent a folder.
 * @param folder Another Folder object to copy.  Can be null to create a totally new folder
 * @param entry one or more entries to add to the folder
 */
function Folder(folder, entry) {
    var entries = (Immutable.Iterable.isIterable(entry)) ? entry : Immutable.List.of(entry);

    if (folder instanceof Folder) {
        if (entries.find(function(e) { return e.folder !== folder.name; })) {
            throw new Error('Attempting to add entry to wrong folder');
        }

        this.name = folder.name;
        this.entries = folder.entries.concat(entries);
    }
    else if (!folder) {
        this.entries = entries;
        this.name = entry.folder;
    }
    else {
        throw new Error('folder param must be either a Folder object or null');
    }

    Object.freeze(this);
}

module.exports = Folder;
