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
      var idList = ids ?ids.split(',').map(Number) : [];

      LibraryActions.makeSharedFolder(folderName, idList);
    },

    render: function() {
        return (<div></div>);
    }
});

module.exports = FolderModal;
