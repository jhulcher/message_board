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
      <div className="full-page">
        <div className="frame">
        <Nav></Nav>
        <div className="header-item">
          Search Results
        </div>
        <header className="header-item">
          <span className="name-column">
            Thread Author
          </span>
          <span className="search-title-column">
            Thread Title
          </span>
          <span className="search-date-column">
            Posted At
          </span>
          <span className="search-post-column">
            Post
          </span>
        </header>
        {
          this.state.posts.map (function (post, idx) {
            if ((idx + 2) % 2 === 0) {
              var colorClass = "list-item beige";
            } else {
                  colorClass = "list-item";
            }
            var thisText = (post.body).slice(0,29) + "...";
            return (
              <div  className={colorClass}
                    key={post.body}>
                <span className="name-column"
                      onClick={this.handleUserClick.bind(null, post.user_id)}>
                  {post.username}
                </span>
                <span className="search-title-column"
                      onClick={this.handleThreadClick.bind(null, post.topic_id)}>
                  {post.topic_title}
                </span>
                <span className="search-date-column">
                  { post.created_at }
                </span>
                <span className="search-post-column">
                  { thisText }
                </span>
              </div>



            )
          }.bind(this))
        }
        </div>
      </div>
    )
  }

});

module.exports = SearchResults;
