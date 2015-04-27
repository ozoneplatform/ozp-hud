'use strict';

var React = require('react');
var Reflux = require('reflux');
var Immutable = require('immutable');


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
            hasLoaded: 0
        };
    },

    getDefaultProps: function() {
        return {
            allowFolderCreate: true,
            emptyView: DefaultEmptyView
        };
    },

    onStoreChange: function(library) {
        console.log(library);
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
                        <FolderTile store={store} key={'folder-' + curr.name} folder={curr} /> :
                        <LibraryTile store={store}
                            allowFolderCreate={me.props.allowFolderCreate}
                            key={'listing-' + curr.listing.id} entry={curr} />;

                    return (
                        <LibraryItem key={tile.props.key}
                                store={store} prev={prev} curr={curr} next={next}>
                            {tile}
                        </LibraryItem>
                    );
                });

        if (this.state.hasLoaded && elements.size) {
            return (
                <ol className="LibraryTiles">
                    {elements.toArray()}
                </ol>
            );
        } else if (this.state.hasLoaded){
            return (
                <this.props.emptyView />
            );
        } else{
            return (
                <LoadingMask />
            );
        }
    }
});

module.exports = Library;
