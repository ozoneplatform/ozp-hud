'use strict';

var React = require('react');
var Reflux = require('reflux');

var Router = require('react-router');
var Navigation = Router.Navigation;
var LibraryActions = require('../../actions/Library');

var FolderModal = React.createClass({
    mixins: [Navigation, Reflux.ListenerMixin],

    componentDidMount: function() {
      var folderName = decodeURIComponent(this.props.params.name);
      var ids = this.props.params.ids;
      if(ids){
        ids = ids.split(',').map(Number);
      }
      var request = [];
      ids.map(id => {
      	request.push({
          listing: {
            id: id
          },
          folder: folderName
        });
      });

      LibraryActions.makeSharedFolder(request);
    },

    render: function() {
        return (<div></div>);
    }
});

module.exports = FolderModal;
