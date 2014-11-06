/** @jsx React.DOM */
'use strict';

var React = require('react');
var Reflux = require('reflux');
var Immutable = require('immutable');

var Router = require('react-router');
var Navigation = Router.Navigation;

var Library = require('../library');
var CurrentFolderStore = require('../../store/CurrentFolder');
var LibraryActions = require('../../actions/Library');
var Constants = require('../../Constants');
var Folder = require('../../api/Folder');

var FolderModal = React.createClass({
    mixins: [Navigation, Reflux.connect(CurrentFolderStore, 'folder')],

    componentDidMount: function () {
        LibraryActions.viewFolder(this.props.params.name);
    },

    componentDidUpdate: function() {
        var me = this,
            oldNode = this.node;
        this.node = this.getDOMNode();

        if (this.node && !oldNode) {
            $(this.node)
                .one('hidden.bs.modal', function () {
                    me.onHidden();
                })
                .modal({
                    backdrop: 'static',
                    keyboard: false,
                    show: true
                });
        }
        else if (!this.node && oldNode) {
            //the modal was closed/removed, call hide on it to make sure bootstrap's listeners
            //were cleaned up
            $(oldNode).modal('hide');
        }
    },

    onHidden: function() {
        this.goBack();
    },

    onDragOver: function(evt) {
        var dt = evt.dataTransfer;

        //if drag is directly on this element (the background around the modal) and not
        //on the modal itself
        if (evt.currentTarget === evt.target) {
            if (((dt.types.indexOf(Constants.libraryEntryDataType) !== - 1) ||
                    (dt.types.indexOf(Constants.folderDataType) !== - 1)) &&
                        dt.effectAllowed.toLowerCase().indexOf('move') !== -1) {
                evt.preventDefault();
                dt.dropEffect = 'move';
            }
        }
    },

    onDrop: function(evt) {
        var dt = evt.dataTransfer,
            json = dt.getData(Constants.libraryEntryDataType) ||
                dt.getData(Constants.folderDataType),
            data = JSON.parse(json),
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
    },

    render: function() {
        /* jshint ignore:start */
        return (this.state && this.state.folder.size) ? (
            <div className="modal FolderModal" data-show="true"
                    onDragEnter={this.onDragOver} onDragOver={this.onDragOver}
                    onDrop={this.onDrop}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button className="close"
                                    onClick={LibraryActions.stopViewingFolder}>
                                &times;
                            </button>
                            <h3>{this.props.params.name}</h3>
                        </div>
                        <div className="modal-body">
                            <Library allowFolderCreate={false} store={CurrentFolderStore} />
                        </div>
                    </div>
                </div>
            </div>
        ) : null;
        /* jshint ignore:end */
    }
});

module.exports = FolderModal;
