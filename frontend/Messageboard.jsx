var React = require('react');
var ReactDOM = require('react-dom');
var ApiUtil = require("./util/api_util.js");
var ReactRouter = require('react-router');

var User = require("./components/user.jsx");
var Index = require("./components/index.jsx");
var Thread = require("./components/thread.jsx");
var NewThread = require("./components/new_thread.jsx");
var SearchResults = require("./components/search_results.jsx");
var UpdateProfile = require("./components/edit_profile.jsx");

var Route = ReactRouter.Route;

var IndexRoute = ReactRouter.IndexRoute;

var Router = ReactRouter.Router;

var App = React.createClass({
  render: function () {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={ App } >
    <IndexRoute component={ Index } />
    <Route path="thread" component={ Thread } />
    <Route path="new_thread" component={ NewThread } />
    <Route path="user" component={ User } />
    <Route path="search_results" component={ SearchResults } />
    <Route path="edit_profile" component={ UpdateProfile } />
  </Route>
);

ReactDOM.render(
  <Router>{ routes }</Router>,
  document.getElementById("root")
);
