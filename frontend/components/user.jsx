var ApiUtil = require("../util/api_util.js");
var TopicStore = require("../stores/topics.js");
var React = require("react");
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var Nav = require("./nav.jsx");
var UserStore = require("../stores/users.js");

var History = require("react-router").History;


var cur = window.current_user_id;

var Thread = React.createClass({

  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return (
        { user: [] }
    );
  },

  componentWillMount: function () {
    ApiUtil.fetchUser(parseInt(this.props.location.query.id));

    this.listener = UserStore.addListener(function () {
      this.setState({ user: UserStore.all() });
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  render: function () {
    return (
      <div>
        <Nav></Nav>
        {
          this.state.user.map (function (user) {
            return (
              <div key="username">
                <div>
                  { user.username }
                </div>
                <div>
                  { user.user_since }
                </div>
                <div>
                  { user.post_count }
                </div>
                <div>
                  { user.location }
                </div>
                <div>
                  { user.about_me }
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }

});

module.exports = Thread;
