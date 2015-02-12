'use strict';

var Constants = require('../Constants');

var ieDragAndDrop = !('draggable' in document.createElement('span'));


/**
 * Utility functions for drag and drop.  These should be added to components is such a
 * way that the `this` reference refers to the component
 */
var DragAndDropUtils = {
    startDrag: function(data, title, dataType, dragImageNode, evt) {
        var json = JSON.stringify(data),
            dt = evt.dataTransfer;

        if (ieDragAndDrop) {
            dt.setData('Text', json);
        }
        else {
            try {
                dt.setData(dataType, json);
                dt.setData('application/json', json);
                dt.setData('text/plain', title);
                dt.setDragImage(dragImageNode, -15, -15);
            }
            catch (e) {
                //probably IE11, fall back to old drag and drop style
                ieDragAndDrop = true;
                DragAndDropUtils.startDrag.apply(this, arguments);
                return;
            }
        }

        dt.effectAllowed = 'move';
    },

    dragOver: function(acceptableTypes, evt) {
        var dt = evt.dataTransfer,
            isMove = dt.effectAllowed.toLowerCase().indexOf('move') !== -1,
            retval = false;

        function allowDrop() {
            evt.preventDefault();
            dt.dropEffect = 'move';
            retval = true;
        }

        if (ieDragAndDrop && isMove) {
            allowDrop();
        }
        else {
            var acceptableType = acceptableTypes.find(function(type) {
                //firefox doesn't support indexOf but supports contains.
                //chrome only supports indexOf
                if (dt.types.contains) {
                    return dt.types.contains(type);
                }
                else {
                    return dt.types.indexOf(type) !== - 1;
                }
            });

            if (acceptableType && isMove) {
                allowDrop();
            }
        }

        return retval;
    },

    /**
     * @param evt a drop event
     * @return an object containing the `node` on which the drop occurred, and
     * the `data` from the drop
     */
    getDropInfo: function(evt) {
        var dt = evt.dataTransfer,
            json = ieDragAndDrop ?
                dt.getData('Text') :
                (dt.getData(Constants.libraryEntryDataType) ||
                dt.getData(Constants.folderDataType)),
            data = JSON.parse(json),
            dropTarget = evt.currentTarget;

        return {data: data, node:dropTarget};
    }
};

module.exports = DragAndDropUtils;
