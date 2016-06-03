var ApiUtil = require("../util/api_util.js");
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var React = require('react');
var cur = window.current_user_id;
var Nav = require("./nav.jsx");
var UserStore = require("../stores/users.js");

var History = require("react-router").History;

var UpdateProfile = React.createClass({

  mixins: [History, LinkedStateMixin],

  getInitialState: function () {
    return (
      { user: [], location: "", about_me: "" }
    );
  },

  componentWillMount: function () {
    ApiUtil.fetchUser(cur);

    this.listener = UserStore.addListener(function () {
      this.setState({ user: UserStore.all() });
    }.bind(this));

  },

  handleUpdateUser: function (e) {
    e.preventDefault();
    ApiUtil.patchUser(cur, this.state.location, this.state.about_me);
    this.history.pushState(null, "/" );
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
              <div key="user.username">
              <div>
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
                <form method="POST" onSubmit={this.handleUpdateUser}>
                  <input type="text"
                         maxLength="30"
                         className=""
                         placeholder="Update Location"
                         valueLink={this.linkState('location')}/>
                   <input type="text"
                          maxLength="200"
                          className=""
                          placeholder="Update About Me"
                          valueLink={this.linkState('about_me')}/>
                   <button type="submit" />
                </form>

              </div>
            )
          }.bind(this))
        }
      </div>
    )
  }

  });

  module.exports = UpdateProfile;
