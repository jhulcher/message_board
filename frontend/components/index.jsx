var ApiUtil = require("../util/api_util.js");
var TopicStore = require("../stores/topics.js");
var UsersStore = require("../stores/users.js");
var React = require("react");
var Nav = require("./nav.jsx");
var ActiveUsers = require("./active_users.jsx");
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var cur = window.current_user_id;

var History = require("react-router").History;

var Index = React.createClass({

  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return (
      { topics: [], users: [], search_terms: "" }
    );
  },

  componentWillMount: function () {
    ApiUtil.fetchIndex();

    this.listener = TopicStore.addListener(function () {
      this.setState({ topics: TopicStore.all() });
    }.bind(this));

    ApiUtil.fetchUsers();

    this.usersListener = UsersStore.addListener(function () {
      this.setState({ users: UserStore.all() });
    }.bind(this));

  },

  componentWillUnmount: function () {
    this.listener.remove();
    this.usersListener.remove();
  },

  handleThreadClick: function (id) {
    this.history.pushState(null, "thread", {id: id} );
  },

  handleUserClick: function (id) {
    this.history.pushState(null, "user/" + id, {id: id} );
  },

  render: function () {
    return (
      <div>
        <Nav></Nav>
          {
            this.state.topics.map (function (topic) {
              return (
                <div key={topic.topic_id}>
                  <span onClick={this.handleUserClick.bind(null, topic.user_id)}>
                    {topic.author}
                  </span>
                  ---
                  <span onClick={this.handleThreadClick.bind(null, topic.topic_id)}>
                    { topic.title }
                  </span>
                  ---
                  <span>
                    {topic.created_at}
                  </span>
                </div>
              )
            }.bind(this))
          }
        <ActiveUsers users={ this.state.users }></ActiveUsers>
      </div>
    )
  }

});

module.exports = Index;
