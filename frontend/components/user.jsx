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
        <div className="profile">
          {
            this.state.user.map (function (user) {
              var post_percent = Math.floor(
                    (100 / user.total_post_count) * user.post_count
                  );
              var thread_percent = Math.floor(
                    (100 / user.total_thread_count) * user.thread_count
                  );
              return (
                <div key="username">
                  <span className="profile-side">
                    <div>
                      { user.username }
                    </div>
                    <img src={"http://res.cloudinary.com/picstagram/image/upload/s-" +
                      "-cdzgeeOu--/c_lfill,h_125,q_85,w_125/" +
                      user.public_id + ".jpg"}
                    />
                    <div>
                      User Since: { user.user_since }
                    </div>
                    <div>
                      Post Count: { user.post_count }
                    </div>
                    <div>
                      {post_percent}% of Total Posts
                    </div>
                    <div className="outer-percent">
                      <div className="inner-percent" style={{width: post_percent + "px"}}>
                      </div>
                    </div>
                    <div>
                      Thread Count: { user.thread_count }
                    </div>
                    <div>
                      {thread_percent}% of Total Threads
                    </div>
                    <div className="outer-percent">
                      <div className="inner-percent" style={{width: thread_percent + "px"}}>
                      </div>
                    </div>
                  </span>
                  <span className="profile-side">
                    <div>
                      Location: { user.location }
                    </div>
                    <div>
                      About Me: { user.about_me }
                    </div>
                  </span>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

});

module.exports = Thread;
