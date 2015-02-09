/** @jsx React.DOM */
'use strict';
var dragged;
var folderNum = 1;

function noop () {}

var Sortable = {
    getDefaultProps: function () {
        return {
            draggable : true,
            onDragStart: noop,
            onDragStop: noop
        };
    },

    update: function (to, from) {
        var data = this.props.data.items;
        data.splice(to, 0, data.splice(from,1)[0]);
        this.props.sort(data, to);
    },

    sortStart: function (e) {
        this.props.onDragStart();
        dragged = e.currentTarget.dataset ?
            e.currentTarget.dataset.id :
            e.currentTarget.getAttribute('data-id');

        e.dataTransfer.effectAllowed = 'move';

        try {
            e.dataTransfer.setData('text/html', null);
        } catch (ex) {
            e.dataTransfer.setData('text', '');
        }
    },

    sortEnd: function (e) {
      console.log('sortEnd');
        var dragging;
        var folderName;
        var target = e.currentTarget.dataset.id;
        if (typeof dragged === 'undefined') {
            return;
        }
        if (typeof this.props.data.dragging === 'undefined') {
            dragging = Number(dragged);
        }
        else{
            dragging = this.props.data.dragging;
        }
        //All this "sort" does it cause the react object state to update
        this.props.sort(this.props.data.items, undefined);

        if (Number(target) !== dragging) {
            if(this.props.data.items[dragging].folder !== null && this.props.data.items[target].folder !== null){
                return;
            }else if(this.props.data.items[dragging].folder !== null){
                folderName = this.props.data.items[dragging].folder;
                this.props.assignToFolder(this.props.data.items[Number(target)], folderName);
            }else if(this.props.data.items[target].folder !== null){
                folderName = this.props.data.items[target].folder;
                this.props.assignToFolder(this.props.data.items[dragging], folderName);
            } else{
                folderName = 'New Folder' + folderNum;
                folderNum++;
                this.props.assignToFolder(this.props.data.items[dragging], folderName);
                this.props.assignToFolder(this.props.data.items[Number(target)], folderName);
            }
            console.log('(' + target + ',' + dragging + ')');            
            this.props.rename.putToBackend();
        }
        dragged = null;
        e.stopPropagation();
        e.preventDefault();
        this.props.onDragStop();
    },

    move: function (over,append) {
        var to = Number(over.dataset.id);
        var from = this.props.data.dragging !== undefined ? this.props.data.dragging : Number(dragged);

        if(typeof this.props.data.dragging === 'undefined'){
          from = Number(dragged);
        }else{
          from = this.props.data.dragging;
        }


        this.update(to, from);
    },

    dragOver: function (e) {
        console.log('dragOver');

        var over = e.currentTarget;
        var target = e.currentTarget.dataset.id;
        var relX = e.clientX - over.getBoundingClientRect().left;
        var relY = e.clientY - over.getBoundingClientRect().top;
        var dragging ;

        if (typeof this.props.data.dragging === 'undefined') {
            dragging = Number(dragged);
        }
        else {
            dragging = this.props.data.dragging;
        }
        //console.log('(' + relX+  ',' + relY + ')');
        //console.log(this.props['data-id']);
        //console.log('dragging: '+  dragging);
        //console.log('target: ' + e.currentTarget.dataset.id);

        e.preventDefault();
        if (this.props.data.dragging !== Number(e.currentTarget.dataset.id) && ((relX > 150 && dragging < target) || (relX < 50 && dragging > target))) {
            this.move(e.currentTarget, true);
        }
    },

    isDragging: function () {
        return this.props.data.dragging === this.props.key;
    }
};

module.exports = Sortable;
