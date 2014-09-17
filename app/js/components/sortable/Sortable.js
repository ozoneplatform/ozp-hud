/** @jsx React.DOM */
var Sortable = {
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
      this.props.assignToFolder(dragging, 'newFolder');
      this.props.assignToFolder(Number(e.currentTarget.dataset.id), 'newFolder');
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
    var from = this.props.data.dragging != undefined ? this.props.data.dragging : Number(dragged);
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
    }
  },
  isDragging: function() {
    console.log('isDragging');
   if(this.props.data.dragging == this.props.key){
       //console.log('isDragging ' + this.props['data-id']);
   }
    return this.props.data.dragging == this.props.key
  }
}

module.exports = Sortable;
