var ApiUtil = require("../util/api_util.js");
var React = require("react");
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var Nav = require("./nav.jsx");
var SearchResultsStore = require("../stores/search_results.js");

var History = require("react-router").History;


var cur = window.current_user_id;

var SearchResults = React.createClass({

  mixins: [LinkedStateMixin, History],

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

  componentWillUnmount: function () {
    this.listener.remove();
  },

  render: function () {
    return (
      <div>
        <Nav></Nav>
        {
          this.state.posts.map (function (post) {
            return (
              <div key={post.body}>
                <span>
                  {post.username}
                </span>
                <span>
                  {post.topic_id}
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
