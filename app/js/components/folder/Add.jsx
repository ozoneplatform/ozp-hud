'use strict';

var React = require('react');
var Reflux = require('reflux');

var Router = require('react-router');
var Navigation = Router.Navigation;
var LibraryActions = require('../../actions/Library');
var LibraryStore = require('../../store/Library');

var {HUD_URL} = require('OzoneConfig');

var FolderModal = React.createClass({
    mixins: [Reflux.listenTo(LibraryActions.hasLoaded, 'onfetchLibraryCompleted'), Reflux.connect(LibraryStore, "libraryStore"), Navigation, Reflux.listenerMixin],

    componentDidMount(){
        LibraryActions.fetchLibrary();
    },

    onfetchLibraryCompleted() {

            if (this.props.params.ids === null){
                history.pushState(null, '', HUD_URL);
            }
            var folderName = decodeURIComponent(this.props.params.name);
            var ids = this.props.params.ids;
            var idList = ids ?ids.split(',').map(Number) : [];

            for (var i = 0; i < this.state.libraryStore.length; i++){
                if (this.state.libraryStore[i].folder === folderName){
                    var index = idList.indexOf(this.state.libraryStore[i].listing.id);
                    if (index > -1) {
                        idList.splice(index, 1);
                    }
                }
            }
            if (this.props.params.ids === null){
                history.pushState(null, '', HUD_URL);
            }
            LibraryActions.makeSharedFolder(folderName, idList);
            this.props.params.ids = null;
    },

    render: function() {
        return (<div></div>);
    }
});

module.exports = FolderModal;
