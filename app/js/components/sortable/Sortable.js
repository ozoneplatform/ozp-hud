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
    //console.log('move');
    //console.log('over, append');
    //console.log(over);
    //console.log(append);
    var to = Number(over.dataset.id);
    //console.log("to: "+ to);
    var from = this.props.data.dragging != undefined ? this.props.data.dragging : Number(this.dragged);
    //console.log('from ' + from);
    if(append) to++;
    if(from < to) to--;
    this.update(to,from);
  },
  dragOver: function(e) {
    //console.log('dragOver');
    e.preventDefault();
    var over = e.currentTarget;
    //console.log('currentTarget: ');
    console.log(over.dataset.id);
    var relX = e.clientX - over.getBoundingClientRect().left;
    var relY = e.clientY - over.getBoundingClientRect().top;
    var height = over.offsetHeight / 2;
    console.log("relY: " + relY);
    console.log("height: " + height);
    var placement = this.placement ? this.placement(relX, relY, over) : relY > height;
    console.log(placement);
    this.move(over, placement);
  },
  isDragging: function() {
   if(this.props.data.dragging == this.props.key){
       //console.log('isDragging ' + this.props['data-id']);
   }
    return this.props.data.dragging == this.props.key
  }
}

module.exports = Sortable;
