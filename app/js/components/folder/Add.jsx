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
      var ids = decodeURIComponent(this.props.params.ids);

      ids = JSON.parse(
        JSON.parse(ids)
      );

      var request = [];
      ids.map(id => {
      	request.push({
          listing: {
            id: id.id
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
