'use strict';

var Reflux = require('reflux');
var GridActions = require('../actions/HudGridActions');

var HudGridStore = Reflux.createStore({

    widgets: [],
    widgetsFormatted: [],

    listenables: [GridActions],

    onAddWidget: function (widget, width, height) {
        this.widgets.push( {type: widget, width: width, height: height} );
        this.formatWidgets();
        this.trigger(this.widgetsFormatted);
    },

    onClearWidgets: function () {
        this.widgets = [];
        this.formatWidgets();
        this.trigger(this.widgetsFormatted);
    },

    onMoveWidget: function (oldPosition, newPosition) {
        newPosition = (oldPosition < newPosition) ? Math.floor(newPosition) : Math.ceil(newPosition);
        if (oldPosition !== newPosition) {
            var widget = this.widgets.splice(oldPosition,1)[0];
            this.widgets.splice(newPosition,0,widget);
            this.formatWidgets();
        }
        this.trigger(this.widgetsFormatted);
    },

    formatWidgets: function (){
        var tiles = [[],[]],
            list = [],
            length = 0,
            side,
            i;
        this.widgets.forEach( function (widget, index) {
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
                while(tiles[0].length !== tiles[1].length){
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


        length = tiles[0].length > tiles[1].length ? tiles[0].length : tiles[1].length;
        for(var row = 0; row < length; row++){
            for(var col = 0; col < 2; col++){

                if(tiles[col][row] !== null){

                    if( tiles[col][row] >= 0) {
                        var fullWidget = {
                            type: this.widgets[tiles[col][row]].type,
                            width: this.widgets[tiles[col][row]].width,
                            height: this.widgets[tiles[col][row]].height,
                            x: col,
                            y: row
                        };
                        list.push( fullWidget);

                    }else if ( tiles[col][row] === -1){
                        list.push({type: "empty", width: 1, height: 1, x:col, y:row});
                    }
                }

            }
        }
        this.widgetsFormatted = list;
    },

    getDefaultData: function () {
        return this.widgetsFormatted;
    }
});

module.exports = HudGridStore;