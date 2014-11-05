'use strict';

var Immutable = require('immutable');

/**
 * Simple immutable class to represent a folder.
 * @param folder Another Folder object to copy.  Can be null to create a totally new folder
 * @param entry An entry to add to the folder
 */
function Folder(folder, entry) {
    if (folder) {
        if (entry.folder !== folder.name) {
            throw new Error('Attempting to add entry to wrong folder');
        }

        this.name = folder.name;
        this.entries = folder.entries.push(entry);
    }
    else {
        this.entries = Immutable.List.of(entry);
        this.name = entry.folder;
    }

    Object.freeze(this);
}

module.exports = Folder;
