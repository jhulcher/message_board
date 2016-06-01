var React = require('react');
var ReactDOM = require('react-dom');
var ApiUtil = require("./util/api_util.js");
var ReactRouter = require('react-router');


var Index = require("./components/index.jsx");
var Thread = require("./components/thread.jsx");


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
  </Route>
);

ReactDOM.render(
  <Router>{ routes }</Router>,
  document.getElementById("root")
);
