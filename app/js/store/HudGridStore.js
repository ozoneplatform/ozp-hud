'use strict';

var Reflux = require('reflux');
var GridActions = require('../actions/HudGridActions');

var widgets = [],
    widgetsFormatted = [],
    gridWidth = 0;

var HudGridStore = Reflux.createStore({

    listenables: [GridActions],

    onAddWidget: function (widget, width, height) {
        widgets.push( {type: widget, width: width, height: height} );
        this.formatWidgets();
    },

    onClearWidgets: function () {
        widgets = [];
        this.formatWidgets();
    },

    onMoveWidget: function (oldPosition, newPosition) {
        newPosition = (oldPosition < newPosition) ? Math.floor(newPosition) : Math.ceil(newPosition);

        if (oldPosition !== newPosition) {
            var widget = widgets.splice(oldPosition,1)[0];
            widgets.splice(newPosition,0,widget);
            this.formatWidgets();
        }
    },

    onResizeWidget: function (index, newWidth, newHeight) {
        if (newWidth) {
            widgets[index].width = newWidth;
        }
        if (newHeight) {
            widgets[index].height = newHeight;
        }
        if (newWidth || newHeight) {
            return this.formatWidgets(index);
        }
        return null;
    },

    onSetGridWidth: function (width) {
        if (gridWidth !== width) {
            gridWidth = width;
            this.formatWidgets();
        }
    },

    formatWidgets: function (returnIndex=null) {
        var returnWidget = null;
        
        if (gridWidth === 1) {
            var thisTop = 0,
                nextTop = 0;
            widgetsFormatted = widgets.map ( function (widget) {
                thisTop = nextTop;
                nextTop += widget.height;
                var newWidget = 
                     {
                        type: widget.type,
                        width: 2,
                        height: widget.height,
                        left: 0,
                        top: thisTop,
                    };
                return (
                    newWidget
                );
            });
        } else if (gridWidth === 2) {
            var tiles = [[],[]],
                list = [],
                length = 0,
                side,
                i;

            widgets.forEach( function (widget, index) {
                switch (widget.width) {
                case 1:
                    side = tiles[0].length > tiles[1].length ? tiles[1] : tiles[0]; // pick shorter side
                    side.push(index);
                    for (i = 2; i <= widget.height; i++) {
                        side.push(-10); //-10 = fill
                    }
                    break;
                case 2:
                    side = tiles[0].length > tiles[1].length ? tiles[1] : tiles[0]; // pick shorter side
                    while (tiles[0].length !== tiles[1].length) {
                        side.push(-1); // -1 = empty space
                    }
                    tiles[0].push(index);
                    tiles[1].push(-10);
                    for (i = 2; i <= widget.height; i++) {
                        tiles[0].push(-10);
                        tiles[1].push(-10);
                    }
                    break;
                }
            });

            while (tiles[0].length !== tiles[1].length) {
                if (tiles[0].length > tiles[1].length) {
                    tiles[1].push(-1);
                } else if (tiles[0].length < tiles[1].length) {
                    tiles[0].push(-1);
                }
            }

            length = tiles[0].length > tiles[1].length ? tiles[0].length : tiles[1].length;

            for (var row = 0; row < length; row++) {
                for (var col = 0; col < 2; col++) {
                    var index = tiles[col][row];
                    if (index !== null) {
                        if ( index >= 0) {
                            var fullWidget = {
                                type: widgets[index].type,
                                width: widgets[index].width,
                                height: widgets[index].height,
                                left: col,
                                top: row,
                            };
                            list.push( fullWidget );
                            if (index === returnIndex) {
                                returnWidget = fullWidget;
                            }
                        } else if ( index === -1) {
                            var tempHeight = 1,
                                tempRow = row + 1;
                            while (tiles[col][tempRow] === -1){//find size of empty space
                                tiles[col][tempRow] = -2;
                                tempHeight++;
                                tempRow++;
                            }

                            list.push({type: "empty", width: 1, height: tempHeight, left:col, top:row});
                        }
                    }

                }
            }
            widgetsFormatted = list;
        }
        //Error: Invariant Violation: replaceState(...) ...
        //this.trigger is being called when it isn't mounted?
        //figure out why this error is being thrown.
        this.doTrigger();
        return returnWidget;
    },

    doTrigger: function () {
        this.trigger(this.getDefaultData());
    },

    getDefaultData: function () {
        return widgetsFormatted;
    },
});

module.exports = HudGridStore;