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
      <div className="full-page">
        <Nav></Nav>
        <header className="header-item">
          <span className="name-column">
            Thread Author
          </span>
          <span className="title-column">
            Thread Title
          </span>
          <span className="date-column">
            Last Post
          </span>
        </header>
        <div>
          {
            this.state.topics.map (function (topic, idx) {
              if ((idx + 2) % 2 === 0) {
                var colorClass = "list-item beige";
              } else {
                    colorClass = "list-item";
              }
              return (
                <div  className={colorClass}
                      key={topic.topic_id}>
                  <span className="name-column"
                        onClick={this.handleUserClick.bind(null, topic.user_id)}>
                    {topic.author}
                  </span>
                  <span className="title-column"
                        onClick={this.handleThreadClick.bind(null, topic.topic_id)}>
                    { topic.title }
                  </span>
                  <span className="date-column">
                    {topic.created_at}
                  </span>
                </div>
              )
            }.bind(this))
          }
        </div>
        <ActiveUsers users={ this.state.users }></ActiveUsers>
      </div>
    )
  }

});

module.exports = Index;
