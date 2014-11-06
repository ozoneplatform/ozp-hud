'use strict';

var Reflux = require('reflux');

module.exports = Reflux.createActions([
    //fetch the library data from the backend
    'fetchLibrary',

    /**
     * Low-level reorder/update of the library.
     * @param A flat list of libraryEntries
     */
    'updateLibrary',

    /**
     * remove the specified library entry on the backend
     * @param libraryEntry
     */
    'removeFromLibrary',

    /**
     * Move an entry within a folder (or within the top level), or move a folder within the
     * top level
     * Only one of newBefore and newAfter is necessary,
     * and newAfter will be ignored with newBefore is specified.
     * Do not use this to move entries in or out of folders
     * @param newBefore The entry or folder that is before the moved entry, in its new position
     * @param toMove The entry or folder to move
     * @param newAfter The entry or folder that is after the moved entry, in its new position
     */
    'reorder',

    /**
     * Create a new folder At the position of the first entry in the entries array
     * @param name the name of the folder
     * @param entries The initial entries in this folder (as an array)
     */
    'createFolder',

    /**
     * Delete a folder and put its contents in its place in the top-level list
     * @param name The folder name
     */
    'unFolder',

    /**
     * Remove the specified Listing from its folder and place it at the top level
     * @param entry The listing to remove from the folder
     */
    'removeFromFolder',

    /**
     * Add the entry to specified folder
     * @param folder the Folder object to add to
     * @param entry the library entry to add to the folder
     */
    'addToFolder',

    /**
     * Indicate that a specific folder is being viewed
     * @param name The folder name
     */
    'viewFolder',

    /**
     * Indicate that no specific folder is currently being viewed
     */
    'stopViewingFolder'
]);
