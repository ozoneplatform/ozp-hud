'use strict';

var React = require('react');
var { RouteHandler } = require('react-router');
var Header = require('./header/index.jsx');
var Settings = require('./settings/index.jsx');
var ReactGridLayout = require('react-grid-layout');

var MyListings = require('./sections/MyListings.jsx');
var AllListings = require('./sections/AllListings.jsx');
var Library = require('./sections/Library.jsx');

var App = React.createClass({

    componentDidMount: function() {
        $(document).on('show.bs.modal', '.modal', function () {
            $('.classBanner').last().css({
                position : 'fixed',
                bottom : '0%'
            });
        });
    },

    render: function () {
        return (
            <div>
                <Header />
                <ReactGridLayout className="layout" cols={2} rowHeight={200} isResizeable={true}>
                    <MyListings key={0} _grid={{x: 0, y: 0, w: 1, h: 2}} />
                    <AllListings key={1} _grid={{x: 1, y: 0, w: 1, h: 2}}/>
                    <Library key={2} _grid={{x:0, y:1, w: 2, h: 2}} static={true} />
                </ReactGridLayout>
                <Settings />
                <RouteHandler params={ this.props.params } />
            </div>
        );
    }
});

module.exports = App;
