var ApiUtil = require("../util/api_util.js");
var React = require("react");
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var Nav = require("./nav.jsx");
var SearchResultsStore = require("../stores/search_results.js");
var History = require("react-router").History;

var cur = window.current_user_id;

var SearchResults = React.createClass({

  mixins: [History],

  getInitialState: function () {
    return (
        { posts: [] }
    );
  },

  componentWillMount: function () {
    ApiUtil.searchPosts(this.props.location.query.search_terms);

    this.listener = SearchResultsStore.addListener(function () {
      this.setState({ posts: SearchResultsStore.all() });
    }.bind(this));

  },

  componentWillReceiveProps: function () {
    ApiUtil.searchPosts(this.props.location.query.search_terms);

    this.propListener = SearchResultsStore.addListener(function () {
      // this.setState({ posts: SearchResultsStore.all() });
    }.bind(this));
  },

  componentWillUnmount: function () {
    if (this.listener) {
      this.listener.remove();
    }
    if (this.propListener) {
      this.propListener.remove();
    }
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
          this.state.posts.map (function (post) {
            return (
              <div key={post.body}>
                <span onClick={this.handleUserClick.bind(null, post.user_id)}>
                  {post.username}
                </span>
                <span onClick={this.handleThreadClick.bind(null, post.topic_id)}>
                  {post.topic_title}
                </span>
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
      </div>
    )
  }

});

module.exports = SearchResults;
