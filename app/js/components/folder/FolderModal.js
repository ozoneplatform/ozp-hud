/** @jsx React.DOM */
'use strict';

var React = require('react');
var Reflux = require('reflux');
var Immutable = require('immutable');

var Router = require('react-router');
var Navigation = Router.Navigation;

var FolderLibraryStore = require('../../store/FolderLibrary');

var LibraryTile = require('../library/LibraryTile');

var FolderModal = React.createClass({
    mixins: [Reflux.listenTo(FolderLibraryStore, 'onStoreChange', 'onStoreChange'), Navigation],

    getInitialState: function() {
        return {
            name: '',
            entries: Immutable.List()
        };
    },

    onStoreChange: function(library) {
        var name = this.props.params.name,
            folder = library.find(function(item) {
                return FolderLibraryStore.isFolder(item) && item.name === name;
            });

        if (folder) {
            this.setState(folder);
        }
    },

    componentDidMount: function () {
        var me = this;

        $(this.getDOMNode())
            .one('hidden.bs.modal', function () {
                me.onHidden();
            })
            .modal({
                backdrop: 'static',
                keyboard: false,
                show: true
            });
    },

    onHidden: function() {
        this.goBack();
    },

    close: function () {
        $(this.getDOMNode()).modal('hide');
    },

    render: function() {
        var libraryTiles = this.state.entries.map(function(entry) {
            /* jshint ignore:start */
            return <LibraryTile entry={entry} />
            /* jshint ignore:end */
        });

        /* jshint ignore:start */
        return (
            <div className="modal FolderModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button className="close" onClick={this.close}>&times;</button>
                            <h3>{this.state.name}</h3>
                        </div>
                        <div className="modal-body">
                            <ol className="LibraryTiles">{libraryTiles.toArray()}</ol>
                        </div>
                    </div>
                </div>
            </div>
        );
        /* jshint ignore:end */
    }
});

module.exports = FolderModal;
