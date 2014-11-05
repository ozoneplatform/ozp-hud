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

var FolderModal = React.createClass({
    mixins: [Navigation],

    componentDidMount: function () {
        var me = this;

        LibraryActions.viewFolder(this.props.params.name);

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
        /* jshint ignore:start */
        return (
            <div className="modal FolderModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button className="close" onClick={this.close}>&times;</button>
                            <h3>{this.props.params.name}</h3>
                        </div>
                        <div className="modal-body">
                            <Library store={CurrentFolderStore} />
                        </div>
                    </div>
                </div>
            </div>
        );
        /* jshint ignore:end */
    }
});

module.exports = FolderModal;
