'use strict';

var React = require('react');
var LibraryActions = require('../../actions/Library');

var FolderTitle = React.createClass({
    getInitialState: function() {
        return { editing: false };
    },

    onNameChange: function() {
        var newName = this.refs.name.getDOMNode().innerText,
            oldName = this.props.name;

        if (newName !== oldName) {
            LibraryActions.renameFolder(oldName, newName);
        }

        this.setState({editing: false});

        if (this.props.onChange) {
            this.props.onChange(newName);
        }
    },

    editTitle: function() {
        this.setState({editing: true}, function() {
            this.refs.name.getDOMNode().focus();
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
        var element = this.props.element;

        return element({
                ref: 'name',
                onBlur: this.onNameChange,
                onDoubleClick: this.editTitle,
                onKeyDown: this.finishEditOnEnter,
                contentEditable: this.state.editing
            },
            this.props.name
        );
    }
});

module.exports = FolderTitle;
