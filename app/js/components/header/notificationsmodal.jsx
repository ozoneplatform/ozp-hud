'use strict';

var React = require('react');
var Reflux = require('reflux');
var SelfActions = require('ozp-react-commons/actions/ProfileActions.js');
var LibraryActions = require('../../actions/Library');
var { API_URL } = require('ozp-react-commons/OzoneConfig');

var marked = require('marked');
var renderer = new marked.Renderer();

// Disable heading tags
/* jshint ignore:start */
renderer.heading = function (text, level) {
  return '<span>' + text + '</span>';
};

renderer.link = function (href, title, text) {
  return `<a href="${href}" target="_blank">${text}</a>`;
};
/* jshint ignore:end */


var NotificationsModal = React.createClass({
    mixins: [ Reflux.ListenerMixin ],

    getInitialState: function() {
      return {
        notificationList: [],
        activeNotification: 0,
      };
    },

    componentDidMount: function() {
        this.listenTo(SelfActions.fetchNotificationsCompleted, n => {
          this.setState({
            notificationList: n._response
          });
        });

        this.listenTo(SelfActions.dismissNotificationCompleted, () => {
          SelfActions.fetchNotifications();
        });
        SelfActions.fetchNotifications();

        $(this.getDOMNode())
            .one('shown.bs.modal', () => {
                if (this.props.onShown) {
                    this.props.onShown();
                }
            })
            .one('hidden.bs.modal', () => {
                if (this.props.onHidden) {
                    this.props.onHidden();
                }
            })
            .modal({
                backdrop: 'static',
                keyboard: false,
                show: true
            });
    },

    makeSidebar: function() {
      var notis = this.state.notificationList.slice();

      return notis.reverse().map((n, i) => {
        var date = new Date(n.createdDate);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        var formattedDate = months[date.getMonth()] + ' ' + date.getDate() + ', ' +  date.getFullYear();
        return (
          <li role="presentation" alt={`Notification ${i + 1} from AppsMall`} tabIndex={i} onClick={() => {
              this.setState({
                activeNotification: i
              });
            }}>
            <a href="#" onClick={(e) => {e.preventDefault();}}>
              AppsMall <small>{formattedDate}</small>
            </a>
          </li>
        );
      });
    },

    makeNotification: function(n) {
      var createNotificationText = function() {
        return {__html: marked(n.message, { renderer: renderer })};
      };
      var date = new Date(n.createdDate);
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      var formattedDate = months[date.getMonth()] + ' ' + date.getDate() + ', ' +  date.getFullYear();
      return (
        <div>
          <div className="row" tabIndex={0}>
            <h4>{(n.listing) ? n.listing.title : 'AppsMall'} <small>{formattedDate}</small></h4>
            <span>

              { (n.notificationType !== "peer_bookmark") &&
                <span className="message small" dangerouslySetInnerHTML={createNotificationText()}></span>
              }
              { n.notificationType === "peer_bookmark" &&
                <div>
                  <p className="message small">{n.author.user.username} has shared a the folder <b>{n.peer.folderName}</b> with you.</p>
                  <p className="message small">{n.message}</p>
                  <div>
                    <button className="btn btn-default btn-sm" onClick={() => {
                      this.onDismiss(n);
                    }}>Ignore</button>
                    <button className="btn btn-success btn-sm" onClick={() => {
                        $.ajax({
                            type: 'POST',
                            dataType: 'json',
                            contentType: 'application/json',
                            url: API_URL + '/api/self/library/import_bookmarks/',
                            data: JSON.stringify({
                              "bookmark_notification_id": n.id
                            })
                        }).done(() => {
                          this.onDismiss(n);
                        });
                      }}>Add {n.peer.folderName}</button>
                  </div>
                </div>
              }
              <br /><br />
              <button className="btn btn-danger right" aria-label={`Remove notification from ${(n.listing) ? n.listing.title : 'AppsMall'}`} onClick={() => {
                  this.onDismiss(
                    this.state.notificationList[this.state.activeNotification]
                  );
                }}>
                Remove Notification
              </button>
            </span>
          </div>
        </div>
      );
    },

    onDismiss(notification) {
      LibraryActions.fetchLibrary();
      SelfActions.dismissNotification(notification);
    },

    render: function () {
        return (
            <div className="modal fade" role="dialog" aria-hidden="true">
                <div className="modal-dialog  modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">
                          <span aria-hidden="true"><i className="icon-cross-16"></i></span><span className="sr-only">Close</span>
                        </button>
                        <h3 className="modal-title">Notifications</h3>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                              <div className="col-xs-4">
                                <ul className="nav nav-pills nav-inverse nav-stacked">
                                  {this.makeSidebar()}
                                </ul>
                              </div>
                              <div className="col-xs-8">
                                { this.state.notificationList.length &&
                                  <div>
                                    {
                                      this.makeNotification(
                                        this.state.notificationList[this.state.activeNotification]
                                      )
                                    }
                                  </div>
                                }

                                { !this.state.notificationList.length &&
                                  <span>No notifications</span>
                                }
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = NotificationsModal;
