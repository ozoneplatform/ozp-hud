/** @jsx React.DOM */
'use strict';

var React = require('react');
var Reflux = require('reflux');
var Immutable = require('immutable');

var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;

var Library = require('../library');
var CurrentFolderStore = require('../../store/CurrentFolder');
var LibraryActions = require('../../actions/Library');
var Constants = require('../../Constants');
var DragAndDropUtils = require('../../util/DragAndDrop');

var Folder = require('../../api/Folder');

var FolderTitle = require('./FolderTitle');

var FolderModal = React.createClass({
    mixins: [Navigation, Reflux.connect(CurrentFolderStore, 'folder')],

    statics: {
        willTransitionTo: function(transition, params) {
            LibraryActions.viewFolder(params.name);
        }
    },

    componentDidMount: function() {
        $(this.getDOMNode())
            .modal({
                backdrop: 'static',
                keyboard: false,
                show: true
            });
    },

    componentWillUnmount: function() {
        $(this.getDOMNode()).modal('hide');
    },

    onDragOver: function(evt) {
        if (evt.target === evt.currentTarget) {
            DragAndDropUtils.dragOver(Immutable.List.of(Constants.libraryEntryDataType), evt);
        }
    },

    onDrop: function(evt) {
        var data = DragAndDropUtils.getDropInfo(evt).data,
            entry = data.listing ?
                this.state.folder.find(function(ent) {
                    return !(ent instanceof Folder) &&
                        ent.listing.id === data.listing.id;
                }) :
                this.state.folder.find(function(ent) {
                    return (ent instanceof Folder) &&
                        ent.name === data.name;
                });

        evt.preventDefault();
        LibraryActions.removeFromFolder(entry);

        //if the last listing was dragged out, close the folder
        if (this.state.folder.size === 1) {
            this.transitionTo('/');
        }
    },

    onNameChange: function(newName) {
        this.transitionTo('folder', {name: newName});
    },

    render: function() {
        /* jshint ignore:start */
        return (
            <div className="modal FolderModal" data-show="true"
                    onDragEnter={this.onDragOver} onDragOver={this.onDragOver}
                    onDrop={this.onDrop}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <Link className="close" to="main">
                                &times;
                            </Link>
                            <FolderTitle name={this.props.params.name} element={React.DOM.h3}
                                onChange={this.onNameChange}/>
                        </div>
                        <div className="modal-body">
                            <Library allowFolderCreate={false} store={CurrentFolderStore} />
                        </div>
                    </div>
                </div>
            </div>
        );
        /* jshint ignore:end */
    }
});

module.exports = FolderModal;
