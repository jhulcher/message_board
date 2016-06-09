var ApiUtil = require("../util/api_util.js");
var TopicStore = require("../stores/topics.js");
var React = require("react");
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var Nav = require("./nav.jsx");

var History = require("react-router").History;

var cur = window.current_user_id;

var NewThread = React.createClass({

  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return (
        { thread: [], title: "", body: "" }
    );
  },

  componentWillMount: function () {

    this.listener = TopicStore.addListener(function () {
      this.setState({ thread: TopicStore.all() });
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  threadCreated: function () {
    this.history.push("/");
  },

  handleCreate: function () {
    // e.preventDefault();
    ApiUtil.createThread(this.threadCreated, this.state.title, this.state.body);

  },

  render: function () {
    return (
      <div>
        <Nav></Nav>

        <div>
          <input type="text"
                 maxLength="50"
                 className=""
                 placeholder="Add Title"
                 valueLink={this.linkState('title')}/>
           <input type="text"
                  maxLength="1000"
                  className=""
                  placeholder="Add Body"
                  valueLink={this.linkState('body')}/>
          <button onClick={this.handleCreate} />
        </div>
      </div>
    )
  }

});

module.exports = NewThread;
