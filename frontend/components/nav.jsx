var ApiUtil = require("../util/api_util.js");
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var React = require('react');

var History = require("react-router").History;

var Nav = React.createClass({

  mixins: [History, LinkedStateMixin],

  getInitialState: function () {
    return (
      { search_terms: "" }
    );
  },

  goToIndex: function (e) {
    e.preventDefault();
    this.history.pushState( null, "/");
  },

  goToNewThread: function (e) {
    e.preventDefault();
    this.history.pushState(null, "/new_thread")
  },

  goToEditProfile: function (e) {
    e.preventDefault();
    this.history.pushState(null, "/edit_profile")
  },

  handleLogOut: function (e) {
    e.preventDefault();
    ApiUtil.logOut();
  },

  handleSearch: function (e) {
    e.preventDefault();
    this.history.pushState(null, "search_results", {search_terms: this.state.search_terms} );
  },

  render: function () {
    return (
        <div className="nav">

          <span className=""
                onClick={this.goToIndex}>
            Index
          </span>

          <span className=""
                onClick={this.goToNewThread}>
            New Thread
          </span>

          <span className=""
                onClick={this.goToEditProfile}>
            Edit Profile
          </span>

          <span>

            <form onSubmit={this.handleSearch}
                  style={{display: "inline"}}>
              <input type="text"
                     maxLength="50"
                     className=""
                     placeholder="Search"
                     valueLink={this.linkState('search_terms')}/>
            </form>

          </span>

          <span className="l"
              onClick={this.handleLogOut}>
            Sign Out
          </span>

        </div>
    );
  }

});

module.exports = Nav;
