var ApiUtil = require("../util/api_util.js");
var TopicStore = require("../stores/topics.js");
var React = require("react");
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var Nav = require("./nav.jsx");

var History = require("react-router").History;


var cur = window.current_user_id;

var Thread = React.createClass({

  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return (
        { thread: [], content: "" }
    );
  },

  componentWillMount: function () {
    ApiUtil.fetchThread(parseInt(this.props.location.query.id));

    this.threadListener = TopicStore.addListener(function () {
      this.setState({ thread: TopicStore.all() });
    }.bind(this));

  },

  componentWillUnmount: function () {
    this.threadListener.remove();
  },

  handlePost: function (e) {
    e.preventDefault();

    ApiUtil.createPost(this.state.thread[0].topic_id, this.state.content);

    this.setState({content: ""});
  },

  handleUserClick: function (id) {
    this.history.pushState(null, "user/" + id, {id: id} );
  },

  render: function () {
    return (
      <div>
        <Nav></Nav>
        {
          this.state.thread.map (function (post) {
            return (
              <div key={999}>
                <span>
                  {post.title}
                </span>---
                <span>
                  {post.created_at}
                </span>
                  {
                    post.posts.map (function (post) {
                      return (
                        <div key={post.post_id + post.topic_id}>
                          <span onClick={this.handleUserClick.bind(null, post.user_id)}>
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
                    }.bind(this))
                  }
                <form method="POST"
                      onSubmit={this.handlePost}>
                  <input type="text"
                         maxLength="1000"
                         className=""
                         placeholder="Add a post"
                         valueLink={this.linkState('content')}/>

                </form>
              </div>
            )
          }.bind(this))
        }
      </div>
    )
  }

});

module.exports = Thread;
