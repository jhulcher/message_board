var ApiUtil = require("../util/api_util.js");
var React = require('react');

var History = require("react-router").History;

var ActiveUsers = React.createClass({

  mixins: [History],

  handleUserClick: function (id) {
    this.history.pushState(null, "user", {id: id} );
  },

  render: function () {
    return (
      <div>
        <span>
          Active Users:
        </span>
        {
          this.props.users.map (function (user) {
            return (
              <span key={user.username}
                    onClick={this.handleUserClick.bind(null, user.id)}>
                { user.username }
              </span>
            )
          }.bind(this))
        }
      </div>
    );
  }

});

module.exports = ActiveUsers;
