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

        return { editing: false, error: false };
    },

    componentDidMount: function() {
        this.listenTo(NewFolderStore, this.onNewFolderChange);
        this.focusForEdit();
    },

    focusForEdit: function() {
        var node = this.refs.name.getDOMNode(),
            wasFocused = document.activeElement === node;

        if (this.state.editing) {
            node.focus();
            if (!wasFocused) {
                //highlight the contents of the contenteditable region
                document.execCommand('selectAll', false, null);
            }
        }
    },

    componentDidUpdate: function() {
        this.focusForEdit();
    },

    onNewFolderChange: function(newFolderName) {
        this.setState({ editing: this.props.name === newFolderName });
    },

    onNameChange: function(evt) {
        var newName = this.refs.name.getDOMNode().textContent.trim(),
            oldName = this.props.name,
            error = false;
        if (newName === '') {
            error = 'Folder name cannot be blank';
        }
        else if (newName.length > 256) {
            error = 'Folder name cannot be longer than 256 characters';
        }
        else if (newName !== oldName && FolderLibrary.findFolder(newName)) {
            error = 'There is already a folder with this name';
        }
        else {
            LibraryActions.renameFolder(oldName, newName);
        }

        if (!error) {
            this.setState({editing: false, error: false});

            if (this.props.onChange) {
                this.props.onChange(newName);
                LibraryActions.fetchLibrary();
            }
        }
        else {
            evt.preventDefault();
            evt.stopPropagation();
            this.setState({error: error});
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
            this.onNameChange(evt);
            evt.preventDefault();
        }
    },

    //retrieve the plain text from a paste and prevent rich-text pasting
    interceptPaste: function(evt) {
        var text = evt.clipboardData.getData('text/plain');

        evt.preventDefault();
        document.execCommand('insertText', false, text);
    },

    backToOldName: function() {
      //stop editing and revert back to old name
      this.setState({editing:false});
      LibraryActions.fetchLibrary();
    },

    render: function() {
        //element prop should be a react virtual DOM element constructor
        var element = this.props.element,
            classes = React.addons.classSet({
                FolderTitle: true,
                error: !!this.state.error
            });

        return (
            <div className={classes}>
                <span className="small validation-err-msg">{this.state.error}</span>
                {element({
                        ref: 'name',
                        onBlur: this.backToOldName,
                        onDoubleClick: this.editTitle,
                        onKeyDown: this.finishEditOnEnter,
                        onPaste: this.interceptPaste,
                        contentEditable: this.state.editing
                    },
                    this.props.name
                )}
            </div>
        );
    }
});

module.exports = FolderTitle;
