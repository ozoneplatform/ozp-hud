'use strict';

var React = require('react');
var Reflux = require('reflux');
var Immutable = require('immutable');
var RandomBase16 = require('../../util/RandomBase16');
var {HUD_URL} = require('OzoneConfig');

var LibraryTile = require('./LibraryTile.jsx');
var FolderTile = require('./FolderTile.jsx');
var LibraryItem = require('./LibraryItem.jsx');
var Folder = require('../../api/Folder');
var LoadingMask = require('../LoadMask.jsx');

var LibraryActions = require('../../actions/Library');

var DefaultEmptyView = React.createClass({
    render: function() {
        return <span>Empty</span>;
    }
});

/**
 * The view of the user's Application Library
 */
var Library = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState: function() {
        return {
            library: Immutable.List(),
            hasLoaded: 0,
            loadMsg: '',
            deletedFolder: false
        };
    },

    getDefaultProps: function() {
        return {
            allowFolderCreate: true,
            emptyView: DefaultEmptyView
        };
    },

    onStoreChange: function(library) {
        //this conditional is necessary because, when a folder modal is closed, the same event
        //will both unmount this component and cause this function to get called (the unmount
        //happens first).  Since setState on an unmounted component is illegal, we have to check
        if (this.isMounted()) {
            this.setState({library: library});
        }
    },

    componentDidMount : function () {
        this.listenTo(this.props.store, this.onStoreChange);

        this.listenTo(LibraryActions.hasLoaded, ()=>{
            this.setState({hasLoaded: true});
        });

        //immediately get whatever data is in the store
        this.onStoreChange(this.props.store.getDefaultData());

        setTimeout(()=>{
          if (this.isMounted()) {
            this.setState({
              loadMsg: 'The request is taking longer than usual, there may be a serverside issue.'
            });
          }
        }, 20000);
    },

    deletedFolder: function(folder){
        var me = this;
        me.setState({deletedFolder: folder});
        setTimeout(function() {
           me.setState({deletedFolder: false});
       }, 10000);
    },

    restoreFolder: function(){
        var bookmarks = '';
        var arr = this.state.deletedFolder.entries._tail.array;
        arr.forEach(function(listing){
            bookmarks += listing.listing.id + ',';
        });
        bookmarks = bookmarks.replace(/,\s*$/, "");

        var url =`${HUD_URL}/#/add/${encodeURI(this.state.deletedFolder.name)}/${bookmarks}`;

        window.location.href = url;
        this.setState({deletedFolder: false});
    },

    closeDeleteNotice: function(e){
        this.setState({deletedFolder: false});
        e.stopPropagation();
    },

    render: function () {
        var me = this,
            elements = this.state.library
                .map(function(elem, index, list) {
                    //create list of all (prev, current, next) tuples
                    return [index ? list.get(index - 1) : undefined, elem, list.get(index + 1)];
                })
                .map(function(tuple) {
                    var prev= tuple[0],
                        curr = tuple[1],
                        next = tuple[2],
                        store = me.props.store,
                        tile;

                    tile = curr instanceof Folder ?
                        <FolderTile store={store} key={`folder-${curr.name}-${RandomBase16(6)}`} folder={curr} deleted={me.deletedFolder}/> :
                        <LibraryTile store={store}
                            allowFolderCreate={me.props.allowFolderCreate}
                            key={`listing-${curr.listing.id}-${RandomBase16(6)}`} entry={curr} />;

                    return (
                        <LibraryItem key={`${tile.props.key}-${RandomBase16(6)}`} store={store} prev={prev} curr={curr} next={next}>
                            {tile}
                        </LibraryItem>
                    );
                });

        if (this.state.hasLoaded && elements.size) {
            return (
                <ol className="LibraryTiles">
                    {this.state.deletedFolder && <div className="restoreFolder" onClick={this.restoreFolder}> Click to restore the deleted folder <span style={{'fontWeight':'bold'}}>{this.state.deletedFolder.name}</span> <span className="deleteFolderConfirm" onClick={this.closeDeleteNotice}>X</span></div>}
                    {elements.toArray()}
                </ol>
            );
        } else if (this.state.hasLoaded){
            return (
                <this.props.emptyView />
            );
        } else{
            return (
                <LoadingMask message={this.state.loadMsg}/>
            );
        }
    }
});

module.exports = Library;
