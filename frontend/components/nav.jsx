var ApiUtil = require("../util/api_util.js");
var React = require('react');

var History = require("react-router").History;

var Nav = React.createClass({

  mixins: [History],

  goToIndex: function (e) {
    e.preventDefault();
    this.history.pushState( null, "/");
  },

  goToNewThread: function (e) {
    e.preventDefault();
    this.history.pushState(null, "/new_thread")
  },

  handleLogOut: function (e) {
    e.preventDefault();
    ApiUtil.logOut();
  },

  render: function () {
    return (
        <div className="">

          <span className=""
                onClick={this.goToIndex}>
            Index
          </span>

          <span className=""
                onClick={this.goToNewThread}>
            New Thread
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
