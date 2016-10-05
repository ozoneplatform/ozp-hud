'use strict';

var React = require('react');
var Reflux = require('reflux');
var Immutable = require('immutable');

var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;
var Library = require('../library/index.jsx');
var CurrentFolderStore = require('../../store/CurrentFolder');
var LibraryActions = require('../../actions/Library');
var Constants = require('../../Constants');
var DragAndDropUtils = require('../../util/DragAndDrop');

var Folder = require('../../api/Folder');

var FolderTitle = require('./FolderTitle.jsx');

//the classname of the element on which a drag out of the folder would drop.
//This has been known to change from version to version of bootstrap.
//NOTE: This property currently can't handle regex special characters
var backgroundDropClass = 'modal-backdrop';
var appIds = [];

var FolderModal = React.createClass({
    mixins: [Navigation, Reflux.ListenerMixin],

    statics: {
        willTransitionTo: function(transition, params) {
            LibraryActions.viewFolder(decodeURIComponent(params.name));
        }
    },

    getInitialState: function(){
      return {
        shareURLToggle: false
      };
    },

    highlightText: function(e){
      var target = e.target;
      setTimeout(function() {
        target.select();
      }, 0);
    },
    onStoreUpdate: function(data) {
        this.setState({folder: data});
        appIds = [];
        for(var a in this.state.folder._tail.array){
          var outObject = {
            "id" : this.state.folder._tail.array[a].listing.id,
            "uuid" : this.state.folder._tail.array[a].listing.uuid
          };
          appIds.push(outObject);
        }
        appIds = JSON.stringify(appIds);
    },

    componentDidMount: function() {
        this.listenTo(LibraryActions.removeFromLibrary, this.onRemoveFromLibrary);
        this.listenTo(CurrentFolderStore, this.onStoreUpdate);

        $(this.getDOMNode())
          .modal({
              backdrop: 'static',
              keyboard: false,
              show: true
          });
        $(this.refs.hastooltips.getDOMNode())
          .find('.tooltiped')
          .each(function(){
            $(this).tooltip({
              delay: 400
            });
          });
    },

    /**
     * When an entry is explicitly removed from the library, check to see if it was the
     * only listing in this folder.  Close the modal if so
     */
    onRemoveFromLibrary: function(entry) {
        var entries = this.state.folder;

        if (entries.size === 1 && entries.get(0) === entry) {
            this._close();
        }
    },

    _close: function() {
        this.transitionTo('/');
    },

    componentWillUnmount: function() {
        $(this.getDOMNode()).modal('hide');
    },

    onDragOver: function(evt) {
        //IE9 doesn't support the much more convenient classList property
        if (evt.target.className.match('(\\s|^)' + backgroundDropClass + '(\\s|$)')) {
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
            this._close();
        }
    },

    /**
     * Open the folder with the new name when this folder is renamed
     */
    onNameChange: function(newName) {
        this.transitionTo('folder', {name: encodeURIComponent(newName)});
        this.onStoreUpdate();
    },
    render: function() {

        //undo the manual escaping of slashes that we must do because react-router doesn't
        var folderName = decodeURIComponent(this.props.params.name);
        var shareFolderButtonText = (!this.state.shareURLToggle ? 'Share ' + folderName : 'Back');
        return (
            <div ref="hastooltips" className="modal FolderModal" data-show="true"
                    onDragEnter={this.onDragOver} onDragOver={this.onDragOver}
                    onDrop={this.onDrop}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                          <Link className="icon-cross-16 vertical-center pull-right" to="main"></Link>
                          <FolderTitle className="vertical-center" name={folderName} element={React.DOM.h3}
                            onChange={this.onNameChange}/>
                        </div>
                        <div className="modal-body clearfix" id="divFolderID">
                            { !this.state.shareURLToggle &&
                              <Library allowFolderCreate={false} store={CurrentFolderStore} />
                            }
                            { this.state.shareURLToggle &&
                              <div className="col-md-12">
                                <div className="form-group">
                                  <p>Enter the username you would like to share <b>{folderName}</b> with.</p>
                                  <input type="text" ref="peer" className="form-control" />
                                </div>
                                <div className="form-group">
                                  <p>Optionally, enter a short message to the user.</p>
                                  <textarea type="text" ref="message" className="form-control" ></textarea>
                                </div>
                                <div className="form-group">
                                  <Link to="main" className="btn btn-primary" onClick={() => {
                                      console.log('test');
                                      LibraryActions.shareFolder({
                                        folder: folderName,
                                        peer: this.refs.peer.getDOMNode().value,
                                        message: this.refs.message.getDOMNode().value
                                      });
                                    }}>
                                    Send {folderName}
                                  </Link>
                                </div>
                              </div>
                            }

                        </div>
                        <div className="modal-footer">
                          <button onClick={()=>{
                              LibraryActions.fetchLibrary();
                              this.setState({
                                shareURLToggle: !this.state.shareURLToggle
                              });
                            }} className="shareFolderButton pull-right btn btn-success" data-toggle="tooltip" data-placement="bottom" title={shareFolderButtonText}>
                            {shareFolderButtonText}
                          </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = FolderModal;
