/** @jsx React.DOM */
'use strict';
var dragged;

function noop () {}

var Sortable = {
//<<<<<<< Updated upstream

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
        var dragging;
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
        //console.log(this.props.data.items);

        if (Number(e.currentTarget.dataset.id) !== dragging) {
            //console.log(this.props.data.items[dragging]);
            this.props.assignToFolder(dragging, 'Untitled');
            this.props.assignToFolder(Number(e.currentTarget.dataset.id), 'Untitled');
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
        console.log('dragging: '+  dragging);
        console.log('target: ' + e.currentTarget.dataset.id);
        //return;

        e.preventDefault();
        if (this.props.data.dragging !== Number(e.currentTarget.dataset.id) && ((relX > 150 && dragging < target) || (relX < 50 && dragging > target))) {
            this.move(e.currentTarget, true);
        }
    },

    isDragging: function () {
        return this.props.data.dragging === this.props.key;
/*=======
  getDefaultProps: function() {
    return {
      draggable : true
    }
  },
  update: function(to, from) {
    var data = this.props.data.items;
    data.splice(to, 0, data.splice(from,1)[0]);
    this.props.sort(data, to);
  },
  sortEnd: function(e) {
    console.log('sortEnd');
    var dragging;
    if(typeof dragged === 'undefined'){
      return;
    }
    if(typeof this.props.data.dragging === 'undefined'){
      dragging = Number(dragged);
    }else{
      dragging = this.props.data.dragging;
    }
    console.log('sortEnd');
    //All this "sort" does it cause the react object state to update
    this.props.sort(this.props.data.items, undefined);
    //console.log(this.props.data.items);

     if(Number(e.currentTarget.dataset.id) !== dragging){
     // alert('Put ' + dragging + ' in '+  e.currentTarget.dataset.id);
      console.log(this.props.data.items[dragging]);
      var  folderNum = + Math.floor(Math.random() * 100 );
      this.props.assignToFolder(dragging, 'newFolder' + folderNum );
      this.props.assignToFolder(Number(e.currentTarget.dataset.id), 'newFolder' + folderNum);
    }
    this.props.rename.putToBackend();
    dragged = null;
    e.stopPropagation();
    e.preventDefault();


  },
  sortStart: function(e) {
    console.log('sortStart');
    this.props.lock.setDirtyLibrary();
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
  move: function(over,append) {
    var to = Number(over.dataset.id);
    var from;// = this.props.data.dragging != undefined ? this.props.data.dragging : Number(dragged);

    if(typeof this.props.data.dragging === 'undefined'){
      from = Number(dragged);
    }else{
      from = this.props.data.dragging;
    }


    this.update(to,from);
  },
  dragOver: function(e) {
    this.props.lock.setDirtyLibrary();
    console.log('dragOver');
    var over = e.currentTarget
    var relX = e.clientX - over.getBoundingClientRect().left;
    var relY = e.clientY - over.getBoundingClientRect().top;
    //console.log(dragged);
    var dragging ;
    if(typeof this.props.data.dragging === 'undefined'){
      dragging = Number(dragged);
    }else{
      dragging = this.props.data.dragging;
    }
    var target = e.currentTarget.dataset.id;
    //console.log('(' + relX+  ',' + relY + ')');
    //console.log(this.props['data-id']);
    console.log('dragging: '+  dragging);
    console.log('target: ' + e.currentTarget.dataset.id);
    //return;

    e.preventDefault();
    if(this.props.data.dragging !== Number(e.currentTarget.dataset.id) && ((relX > 150 && dragging < target) || (relX < 50 && dragging > target))){
      this.move(e.currentTarget,true);
>>>>>>> Stashed changes*/
    }
};

module.exports = Sortable;
