/** @jsx React.DOM */
'use strict';

var React = require('react');
var Reflux = require('reflux');
var Immutable = require('immutable');

var LibraryActions = require('../../actions/Library');

var LibraryTile = require('./LibraryTile');
var FolderTile = require('./FolderTile');
var LibraryItem = require('./LibraryItem');
var Folder = require('../../api/Folder');
var DragAndDropUtils = require('../../util/DragAndDrop');

var DefaultEmptyView = React.createClass({
    render: function() {
        /* jshint ignore:start */
        return <span>Empty</span>;
        /* jshint ignore:end */
    }
});

/**
 * The view of the user's Application Library
 */
var Library = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState: function() {
        return {library: Immutable.List()};
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

        //immediately get whatever data is in the store
        this.onStoreChange(this.props.store.getDefaultData());
    },

    render: function () {
        var me = this,
            elements = this.state.library
                .map(function(elem, index, list) {
                    //create list of all (prev, current, next) tuples
                    return [list.get(index - 1), elem, list.get(index + 1)];
                })
                .map(function(tuple) {
                    var prev= tuple[0],
                        curr = tuple[1],
                        next = tuple[2],
                        store = me.props.store,
                        tile;

                    /* jshint ignore:start */
                    tile = curr instanceof Folder ?
                        <FolderTile store={store} key={'folder-' + curr.name} folder={curr} /> :
                        <LibraryTile store={store}
                            allowFolderCreate={me.props.allowFolderCreate}
                            key={'listing-' + curr.listing.id} entry={curr} />;

                    return (
                        <LibraryItem store={store} prev={prev} curr={curr} next={next}>
                            {tile}
                        </LibraryItem>
                    );
                    /* jshint ignore:end */
                });

        if (elements.size) {
            /* jshint ignore:start */
            return (
                <ol className="LibraryTiles">
                    {elements.toArray()}
                </ol>
            );
            /* jshint ignore:end */
        }
        else {
            /* jshint ignore:start */
            return (
                <this.props.emptyView />
            );
            /* jshint ignore:end */
        }
    }
});

module.exports = Library;
