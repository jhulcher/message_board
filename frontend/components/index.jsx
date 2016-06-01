var ApiUtil = require("../util/api_util.js");
var TopicStore = require("../stores/topics.js");
var React = require("react");
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

    this.loadAmount = 7;
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  handleThreadClick: function (id) {
    console.log(id);
    this.history.pushState( null, "thread", {id: id} );
  },

  render: function () {
    return (
      <ul>
        {
          this.state.topics.map (function (topic) {
            return (
              <li key={topic.topic_id}>
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
              </li>
            )
          }.bind(this))
        }
      </ul>
    )
  }

});

module.exports = Index;
