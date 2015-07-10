'use strict';

var React = require('react');
var Reflux = require('reflux');

var SelfStore = require('ozp-react-commons/stores/SelfStore');
var ListingActions = require('../actions/Listing');
var ProfileStore = require('../store/Profile');
var GridStore = require('../store/HudGridStore');
var GridActions = require('../actions/HudGridActions');
var MyListings = require('./sections/MyListings.jsx');
var AllListings = require('./sections/AllListings.jsx');
var Library = require('./sections/Library.jsx');

var GridCell = React.createClass({

    mixins: [
        Reflux.connect(GridStore)
    ],

    allowDrop: function (event) {
        event.preventDefault();
    },

    drag: function (event) {
        event.dataTransfer.setData("index", this.props.index);
    },

    drop: function (event) {
        event.preventDefault();
        var index = event.dataTransfer.getData("index");
        GridActions.moveWidget(index, this.props.index);
    },

    render: function () {
        var left = this.props.x === 0 ? "2%" : "51%";
        var width = this.props.width === 1 ? "47%" : "96%";
        var top = this.props.y * 440 + 50;
        var height = this.props.height * 430 - 30 + "px";
        var divStyle = {
            width: width,
            height: height,
            left: left,
            top: top
        };
        if(this.props.children){
            return (
                <span className="GridCell" ref="cell" style={divStyle}
                    draggable="true" onDragStart={this.drag} onDragOver={this.allowDrop} onDrop={this.drop}>
                        {this.props.children}
                </span>
            );
        } else {
            return (
                <span className="EmptyCell"
                    draggable="false" ref="cell" style={divStyle} onDragOver={this.allowDrop} onDrop={this.drop}/>
            );
        }
    }
});

var HudGrid = React.createClass({

    mixins: [
        Reflux.connect(SelfStore, 'profile'),
        Reflux.connect(ProfileStore, 'mylistings'),
        Reflux.connect(GridStore, 'grid')
    ],

    getInitialState: function () {
        return {
            profile: SelfStore.getDefaultData(),
            mylistings: ProfileStore.getDefaultData(),
            grid: GridStore.getDefaultData(),
            attempt: 0
        };
    },

    componentWillMount: function () {
        ListingActions.fetchOwnedListings();
        this.getGrid();
    },

    getGrid: function () {
        var profile = this.state.profile.currentUser;
        var listings = this.state.mylistings;
        var tryAgain = false;
        if (profile && listings) {

            var isAdmin = profile.isAdmin() || profile.stewardedOrganizations.length > 0;
            var ownsListings = listings.length > 0;

            if (!isAdmin || !ownsListings) {
                tryAgain = true;
            }

            GridActions.clearWidgets();
            if (isAdmin && ownsListings) {
                GridActions.addWidget("MyListings",1,1);
                GridActions.addWidget("AllListings",1,1);
                GridActions.addWidget("Library",2,1);
            } else if (!isAdmin && ownsListings) {
                GridActions.addWidget("MyListings",1,2);
                GridActions.addWidget("Library",1,2);
            } else if (isAdmin && !ownsListings) {
                GridActions.addWidget("AllListings",1,2);
                GridActions.addWidget("Library",1,2);
            } else {
                GridActions.addWidget("Library",2,2);
            }
        } else { 
            tryAgain = true;
        }

        this.setState({attempt: this.state.attempt + 1});
        if (tryAgain && this.state.attempt <= 10) {
            setTimeout(this.getGrid, 25 * this.state.attempt);
        }
    },

    render: function () {
        var me = this;
        var index = -1;
        var key = 0;
        var widgets = this.state.grid.map( function (widget) {
            var child = null;
            if (widget.type === "AllListings"){
                child = <AllListings profile={me.state.profile}/>;
            } else if (widget.type === "MyListings") {
                child = <MyListings listings={me.state.mylistings}/>;
            } else if (widget.type === "Library") {
                child = <Library />;
            }
            var i = widget.type === "empty" ? index + 0.5 : ++index;

            return (
                <GridCell key={key++} index={i}
                    width={widget.width} height={widget.height} x={widget.x} y={widget.y}>
                    {child}
                </GridCell>
            );
        });

        return (
            <div className="layout">
                {widgets}
            </div>
        );
    }
});

module.exports = HudGrid;