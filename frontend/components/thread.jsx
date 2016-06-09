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
      <div className="full-page">
        <Nav></Nav>
        {
          this.state.thread.map (function (post) {
            return (
              <div key={999}>
                <header>
                  {post.title}
                </header>
                <div>
                {
                  post.posts.map (function (post, idx) {
                    if ((idx + 2) % 2 === 0) {
                      var colorClass = "thread-item beige";
                    } else {
                          colorClass = "thread-item";
                    }
                    return (
                      <div className={colorClass}
                           key={post.post_id + post.topic_id}>

                        <span className="user-info left">
                          <div onClick={this.handleUserClick.bind(null, post.user_id)}>
                            {post.author}
                          </div>
                          <div>
                            <img src={"http://res.cloudinary.com/picstagram/image/upload/s-" +
                              "-cdzgeeOu--/c_lfill,h_125,q_85,w_125/" +
                              post.public_id + ".jpg"}/>
                          </div>
                          <div>
                            Post Count: { post.post_count }
                          </div>
                          <div>
                            {post.created_at}
                          </div>
                        </span>

                        <span className="post-body left">
                          {post.body}
                        </span>

                      </div>
                    )
                  }.bind(this))
                }
                </div>
                <div>
                  <input type="text"
                         maxLength="1000"
                         className=""
                         placeholder="Add a post"
                         valueLink={this.linkState('content')}/>
                  <button onClick={this.handlePost}>
                    New Post
                  </button>
                </div>
              </div>
            )
          }.bind(this))
        }
      </div>
    )
  }

});

module.exports = Thread;
