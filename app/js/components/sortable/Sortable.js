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
    //console.log('sortEnd');
    this.props.sort(this.props.data.items, undefined);
    //console.log(this.props.data.items);
    e.stopPropagation();
    e.preventDefault();

  },
  sortStart: function(e) {
    //console.log('sortStart');
    this.dragged = e.currentTarget.dataset ?
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
    var from = this.props.data.dragging != undefined ? this.props.data.dragging : Number(this.dragged);
    this.update(to,from);
  },
  dragOver: function(e) {
    e.preventDefault();
    if(this.props.data.dragging !== Number(e.currentTarget.dataset.id)){
      this.move(e.currentTarget,true);
    }
  },
  isDragging: function() {
   if(this.props.data.dragging == this.props.key){
       //console.log('isDragging ' + this.props['data-id']);
   }
    return this.props.data.dragging == this.props.key
  }
}

module.exports = Sortable;
