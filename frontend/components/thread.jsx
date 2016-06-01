var ApiUtil = require("../util/api_util.js");
var TopicStore = require("../stores/topics.js");
var React = require("react");

var cur = window.current_user_id;

var Thread = React.createClass({

  getInitialState: function () {
    return (
        { thread: [] }
    );
  },

  componentWillMount: function () {
    ApiUtil.fetchThread(parseInt(this.props.location.query.id));

    this.listener = TopicStore.addListener(function () {
      this.setState({ thread: TopicStore.all() });
    }.bind(this));

  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  render: function () {
    return (
      <ul>
        {
          this.state.thread.map (function (post) {
            return (
              <div key={post.topic_id}>
                <span>
                  {post.title}
                </span>---
                <span>
                  {post.created_at}
                </span>
                {
                  post.posts.map (function (post) {
                    return (
                      <div key={post.post_id}>
                        <span>
                          {post.author}
                        </span>---
                        <span>
                          {post.created_at}
                        </span>
                        <div>
                          {post.body}
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </ul>
    )
  }

});

module.exports = Thread;
