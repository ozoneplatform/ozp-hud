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
            widgetResizeConfig: null,
            widgetHeight: 220,
            widgetSpacing: 30
        };
    },

    componentWillMount: function () {
        ListingActions.fetchOwnedListings();
        this.getGrid (0);
    },

    getGrid: function (wait) {
        var profile = this.state.profile.currentUser,
            listings = this.state.mylistings,
            tryAgain = false;

        if (profile && listings) {
            var isAdmin = profile.isAdmin() || profile.stewardedOrganizations.length > 0,
                ownsListings = listings.length > 0;

            if (!isAdmin || !ownsListings) {
                tryAgain = true;
            }

            GridActions.clearWidgets();
            if (isAdmin && ownsListings) {
                GridActions.addWidget("MyListings",1,2);
                GridActions.addWidget("AllListings",1,2);
                GridActions.addWidget("Library",2,2);
            } else if (!isAdmin && ownsListings) {
                GridActions.addWidget("MyListings",1,4);
                GridActions.addWidget("Library",1,4);
            } else if (isAdmin && !ownsListings) {
                GridActions.addWidget("AllListings",1,4);
                GridActions.addWidget("Library",1,4);
            } else {
                GridActions.addWidget("Library",2,4);
            }
        } else {
            tryAgain = true;
        }

        wait += 25;
        if (tryAgain && (wait <= 1000)) {
            setTimeout(this.getGrid.bind(this,wait), wait);
        }
    },

    generateCell: function (widget, index, key) {
        var me = this;

        //Position
        var left = widget.left === 0 ? "2%" : "51%",
            width = widget.width === 1 ? "47%" : "96%",
            top = widget.top * this.state.widgetHeight + 30 + "px",
            height = widget.height * this.state.widgetHeight - this.state.widgetSpacing + "px";

        var divStyle = {
            width: width,
            height: height,
            left: left,
            top: top
        };

        //Handlers
        var allowDrop = function (event) {
            event.preventDefault();
        };

        var dragStart = function (event) {
            event.dataTransfer.setData("operation", "widgetDrag");
            event.dataTransfer.setData("index", index);
            event.stopPropagation();
        };

        var onDrop = function (event) {
            event.preventDefault();
            if (event.dataTransfer.getData("operation") === "widgetDrag") {
                var srcIndex = event.dataTransfer.getData("index");
                GridActions.moveWidget(srcIndex, index);
                event.stopPropagation();
            }
        };

        var mouseDown = function (event) {
            me.setState({
                widgetResizeConfig: {
                    index: index,
                    mouseY: event.clientY,
                    left: widget.left,
                    width: widget.width,
                    height: widget.height
                }
            });
            console.log("Start:"+event.clientY);
            event.stopPropagation();
        };

        var child = null;
        if (widget.type === "AllListings") {
            child = <AllListings profile={this.state.profile}/>;
        } else if (widget.type === "MyListings") {
            child = <MyListings listings={this.state.mylistings}/>;
        } else if (widget.type === "Library") {
            child = <Library />;
        }

        switch (widget.type) {
        case "AllListings":
        case "MyListings":
        case "Library":
            return (
                <span className="GridCell" key={key} style={divStyle}>

                    <span className="case" draggable="true" onDragStart={dragStart} onDragOver={allowDrop} onDrop={onDrop}>
                        {child}
                    </span>

                    <span className="DragGrip" draggable="false"
                        onMouseDown={mouseDown}>
                    </span>

                </span>
            );
        default :
            return (
                <span className="GridCell EmptyCell" key={key} style={divStyle}
                    draggable="false" onDragOver={allowDrop} onDrop={onDrop}>
                </span>
            );
        }
    },

    onMouseMove: function (event) {
        if (this.state.widgetResizeConfig) {
            var mousePercentX = event.clientX / $(document).width(),
                config = this.state.widgetResizeConfig,
                offset = event.clientY - config.mouseY,
                newWidth = null,
                newHeight = null;
            console.log(offset);
            //Horizontal
            if (config.width === 2){
                if (mousePercentX >= 0.1 && mousePercentX <= 0.6) {
                    newWidth = 1;
                }
            } else if (config.left === 0) {
                if (mousePercentX >= 0.65 && mousePercentX <= 1) {
                    newWidth =  2;
                }
            } else {
                if (mousePercentX >= 0.99 && mousePercentX <= 1) {
                    newWidth = 2;
                }
            }

            //Vertical
            if (config.height > 2 && offset < -(this.state.widgetHeight/2) ) {
                newHeight = config.height - 1;
                config.mouseY -= this.state.widgetHeight;
            } else if (config.height < 4 && offset > this.state.widgetHeight/2) {
                newHeight = config.height + 1;
                config.mouseY += this.state.widgetHeight;
            }

            if (newWidth || newHeight) {
                var modifiedWidget = GridStore.onResizeWidget(config.index, newWidth, newHeight);

                this.setState({
                    widgetResizeConfig: {
                        index: config.index,
                        mouseY: config.mouseY,
                        left: modifiedWidget.left,
                        width: modifiedWidget.width,
                        height: modifiedWidget.height
                    }
                });
            }
        }
    },

    onMouseUp: function () {
        if (this.state.widgetResizeConfig) {
            this.setState({
                widgetResizeConfig: null
            });
        }
    },

    render: function () {
        var me = this,
            index = -1,
            key = 0;
        var widgets = this.state.grid.map( function (widget) {
            var i = widget.type === "empty" ? index + 0.5 : ++index;
            var cell = me.generateCell(widget, i, key++);
            return cell;
        });
        var layoutClass = (this.state.widgetResizeConfig === null) ? "layout" : "layout resizing";
        return (
            <div className={layoutClass} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp} onMouseLeave={this.onMouseUp}>
                {widgets}
            </div>
        );
    }
});

module.exports = HudGrid;