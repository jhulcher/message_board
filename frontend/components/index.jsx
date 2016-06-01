var ApiUtil = require("../util/api_util.js");
var TopicStore = require("../stores/topics.js");
var React = require("react");
var Nav = require("./nav.jsx");
var cur = window.current_user_id;

var History = require("react-router").History;

var Index = React.createClass({

  mixins: [History],

  getInitialState: function () {
    return (
      { topics: [] }
    );
  },

  componentWillMount: function () {
    ApiUtil.fetchIndex();

    this.listener = TopicStore.addListener(function () {
      this.setState({ topics: TopicStore.all() });
    }.bind(this));

  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  handleThreadClick: function (id) {
    this.history.pushState(null, "thread", {id: id} );
  },

  render: function () {
    return (
      <div>
        <Nav></Nav>
          {
            this.state.topics.map (function (topic) {
              return (
                <div key={topic.topic_id}>
                  <span>
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
      </div>
    )
  }

});

module.exports = Index;
