var ApiActions = require("../actions/api_actions.js");
var TopicStore = require("../stores/topics.js");

var ApiUtil = {

  fetchIndex: function () {
    $.ajax({
      url: "/api/topics",
      method: "GET",
      dataType: "json",
      success: function (response) {
        console.log("fetchIndex");
        ApiActions.receiveIndex(response);
        // TopicStore.all();
      }
    });
  },

  fetchThread: function (id) {
    $.ajax({
      url: "/api/topics/" + id,
      method: "GET",
      dataType: "json",
      success: function (response) {
        console.log("fetchThread");
        ApiActions.receiveThread(response);
        // TopicStore.all();
      }
    });
  },

  createThread: function (callback, title, body) {
    $.ajax({
      url: "api/topics",
      method: "POST",
      dataType: "json",
      data: {
        topic: {
          title: title
        }
      },
      success: function (response) {
        console.log("createThread");
        ApiUtil.createFirstPost(callback, response.topic_id, body)
      }
    });
  },

  createFirstPost: function (callback, id, body) {
    $.ajax({
      url: "/api/posts",
      method: "POST",
      dataType: "json",
      data: {
        post: {
          topic_id: id,
          body: body
        }
      },
      success: function (response) {
        // ApiUtil.fetchIndex();
        callback(response);
      }
    });
  },

  createPost: function (id, body) {
    $.ajax({
      url: "/api/posts",
      method: "POST",
      dataType: "json",
      data: {
        post: {
          topic_id: id,
          body: body
        }
      },
      success: function (response) {
        console.log('createPost');
        ApiActions.receiveThread(response);
        // TopicStore.all();
      }
    });
  },

  logOut: function () {
    $.ajax({
      url: "session",
      method: "DELETE",
      success: function (response) {
        console.log("logOut");
        window.location.href = "/";
      }
    });
  }

};

window.ApiUtil = ApiUtil;

module.exports = ApiUtil;
