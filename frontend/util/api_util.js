var ApiActions = require("../actions/api_actions.js");
var TopicStore = require("../stores/topics.js");

var ApiUtil = {

  fetchIndex: function () {
    $.ajax({
      url: "/api/topics",
      method: "GET",
      dataType: "json",
      success: function (response) {
        console.log(response);
        ApiActions.receiveIndex(response);
        TopicStore.all();
      }
    });
  },

  fetchThread: function (id) {
    $.ajax({
      url: "/api/topics/" + id,
      method: "GET",
      dataType: "json",
      success: function (response) {
        console.log(response);
        ApiActions.receiveThread(response);
        TopicStore.all();
      }
    });
  }

};

window.ApiUtil = ApiUtil;

module.exports = ApiUtil;
