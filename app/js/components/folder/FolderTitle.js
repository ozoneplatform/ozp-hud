/** @jsx React.DOM */
'use strict';

var React = require('react');
var Reflux = require('reflux');
var LibraryActions = require('../../actions/Library');
var FolderLibrary = require('../../store/FolderLibrary');
var NewFolderStore = require('../../store/NewFolder');

var FolderTitle = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState: function() {
        var newFolderName = NewFolderStore.getDefaultData();

        return { editing: this.props.name === newFolderName, error: false };
    },

    componentDidMount: function() {
        this.listenTo(NewFolderStore, this.onNewFolderChange);

        if (this.state.editing) {
            this.refs.name.getDOMNode().focus();

            //highlight the contents of the contenteditable region
            document.execCommand('selectAll', false, null);
        }
    },

    onNewFolderChange: function(newFolderName) {
        this.setState({ editing: this.props.name === newFolderName });
    },

    onNameChange: function(evt) {
        var newName = this.refs.name.getDOMNode().innerText.trim(),
            oldName = this.props.name,
            error = false;

        if (newName !== oldName && FolderLibrary.findFolder(newName)) {
            evt.preventDefault();
            evt.stopPropagation();

            this.setState({error: true});
            error = true;
        }
        else {
            LibraryActions.renameFolder(oldName, newName);
        }

        if (!error) {
            this.setState({editing: false, error: false});

            if (this.props.onChange) {
                this.props.onChange(newName);
            }
        }
    },

    editTitle: function() {
        this.setState({editing: true}, function() {
            this.refs.name.getDOMNode().focus();

            //highlight the contents of the contenteditable region
            document.execCommand('selectAll', false, null);
        });
    },

    //if the key was Enter, stop editing the name
    finishEditOnEnter: function(evt) {
        if (evt.key === 'Enter') {
            evt.target.blur();
            evt.preventDefault();
        }
    },

    render: function() {
        //element prop should be a react virtual DOM element constructor
        var element = this.props.element,
            classes = React.addons.classSet({
                FolderTitle: true,
                error: this.state.error
            });

        /* jshint ignore:start */
        return (
            <div className={classes}>
                <span className="small validation-err-msg">
                    There is already a folder with this name
                </span>
                {element({
                        ref: 'name',
                        onBlur: this.onNameChange,
                        onDoubleClick: this.editTitle,
                        onKeyDown: this.finishEditOnEnter,
                        contentEditable: this.state.editing
                    },
                    this.props.name
                )}
            </div>
        );
        /* jshint ignore:end */
    }
});

module.exports = FolderTitle;
