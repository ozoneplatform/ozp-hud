'use strict';
var React = require('react');
var uuid = require('../../util/uuid');
var timeAgo = require('../../util/timeAgo');
var fieldName = require('ozp-react-commons/constants/index').listingFieldName;
var ListingDetailsLink = require('../ListingDetailsLink.jsx');

var ActionChangeLog = React.createClass({
    render: function() {
        var changeLog = this.props.changeLog;
        return (
            <div>
                {changeLog.author.displayName}
                <span> { changeLog.action.toLowerCase() } </span>
                { this.props.listingName }
            </div>
        );
    }
});

var SetToChangeLog = React.createClass({
    render: function() {
        var changeLog = this.props.changeLog;
        return (
            <div>
                {changeLog.author.displayName}
                <span> set </span>
                { this.props.listingName } to {changeLog.action.toLowerCase()}
            </div>
        );
    }
});

var RejectedChangeLog = React.createClass({
    toggleIcon: function (e) {
        $(e.currentTarget).children('i').toggleClass('icon-minus-10-blueDark icon-plus-10-blueDark');
    },
    render: function () {
        var changeLog = this.props.changeLog;
        var details = 'Details: ' + changeLog.rejectionDescription;
        var id = uuid();

        return (
            <div>
                <div>
                    {changeLog.author.displayName}
                    <span> rejected </span>
                    { this.props.listingName }
                </div>
                <a data-toggle="collapse" data-target={ '#' + id } onClick={ this.toggleIcon }>
                    <i className="icon-plus-10-blueDark"></i> Feedback
                </a>
                <ul id={ id } className="collapse list-unstyled ListingActivity__Changes">
                    <li>{ details }</li>
                </ul>
            </div>
        );
    }
});

var OrgApprovalChangeLog = React.createClass({
    render: function() {
        var changeLog = this.props.changeLog;
        return (
            <div>
                {changeLog.author.displayName}
                <span> approved </span>
                { this.props.listingName } for { changeLog.listing.agency }
            </div>
        );
    }
});

var ModifiedChangeLog = React.createClass({
    toggleIcon: function (e) {
        $(e.currentTarget).children('i').toggleClass('icon-minus-10-blueDark icon-plus-10-blueDark');
    },

    render: function () {
        var changeLog = this.props.changeLog;
        var details = [], extendedDetails = [];
        var id = uuid();

        changeLog.changeDetails.forEach(function (changeDetail, i) {
            var changedField = fieldName[changeDetail.fieldName] || changeDetail.fieldName;

            if (i === changeLog.changeDetails.length - 1 && i !== 0) {
                details[i] =  'and ' + changedField;
            }
            else {
                details[i] = changedField;
            }

            extendedDetails[i] = (
                <li>{ changedField } changed from&nbsp;
                    <span className="OldValue">{ changeDetail.oldValue }</span>
                    <span> to </span>
                    <span className="NewValue">{ changeDetail.newValue }</span>
                </li>
            );
        });

        if (details.length) {
            details = details.join(', ');
            return (
                <div>
                    <div>
                        {changeLog.author.displayName} modified {this.props.listingName}
                    </div>
                    <a data-toggle="collapse" data-target={ '#' + id } onClick={ this.toggleIcon }>
                        <i className="icon-plus-10-blueDark"></i> See {this.props.showListingName ? changeLog.listing.title : 'the listing'} changes
                    </a>
                    <ul id={ id } className="collapse list-unstyled ListingActivity__Changes">
                        { extendedDetails }
                    </ul>
                </div>
            );
        } else {
            return (
                <div>
                    {changeLog.author.displayName}
                    <span> modified </span>
                    { this.props.showListingName ? changeLog.listing.title : 'the listing' }
                </div>
            );
        }
    }
});

var ReviewEditedChangeLog = React.createClass({
    render: function() {
        var changeLog = this.props.changeLog;
        return (
            <div>
                {changeLog.author.displayName}
                <span> edited </span>
                { (changeLog.changeDetails[0] === undefined) ? ' ' : changeLog.changeDetails[0].fieldName } in { this.props.listingName }
            </div>
        );
    }
});

var ReviewDeletedChangeLog = React.createClass({
    render: function() {
        var changeLog = this.props.changeLog;
        return (
            <div>
                {changeLog.author.displayName}
                <span> removed </span>
                { changeLog.changeDetails[0].newValue } review from { this.props.listingName }
            </div>
        );
    }
});

var GenericLegacyChangeLog = React.createClass({
    render: function() {
        var changeLog = this.props.changeLog;
        return (
            <div>
                {changeLog.author.displayName}
                <span> { changeLog.action } </span>
                 on { this.props.listingName }
            </div>
        );
    }
});

var ChangeLog = React.createClass({

    // mixins: [ Navigation, ActiveState],

    actionMapAdmin: {
        'MODIFIED' : ModifiedChangeLog,
        'APPROVED' : ActionChangeLog,
        'SUBMITTED' : ActionChangeLog,
        'ENABLED' : ActionChangeLog,
        'DISABLED' : ActionChangeLog,
        'CREATED' : ActionChangeLog,
        'OUTSIDE' : SetToChangeLog,
        'INSIDE' : SetToChangeLog,
        'REJECTED' : RejectedChangeLog,
        'APPROVED_ORG' : OrgApprovalChangeLog,
        'REVIEW_EDITED' : ReviewEditedChangeLog,
        'REVIEW_DELETED' : ReviewDeletedChangeLog,
    },

    getListingName: function() {
        return (
            <ListingDetailsLink listingId={this.props.changeLog.listing.id} tab="overview">
                { this.props.changeLog.listing.title }
            </ListingDetailsLink>
        );
    },

    render: function() {
        var icon = this.props.children;
        var time = timeAgo(this.props.changeLog.activityDate);
        var Handler = this.actionMapAdmin[this.props.changeLog.action];

        if(!Handler) {
            Handler = GenericLegacyChangeLog;
        }

        return (
            <li>
                { icon }
                <div className="ChangeLogText">
                    <em>{ time }</em>
                    < Handler changeLog={ this.props.changeLog } listingName={ this.getListingName() } />
                </div>
            </li>
        );
    }

});


module.exports = ChangeLog;
