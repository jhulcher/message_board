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

  fetchUsers: function () {
    $.ajax({
      url: "/api/users",
      method: "GET",
      dataType: "json",
      success: function (response) {
        console.log(response);
        ApiActions.receiveUsers(response);
      }
    });
  },

  searchPosts: function (search_terms) {
    $.ajax({
      url: "api/posts",
      method: "GET",
      dataType: "json",
      data: {
        post: {
          body: search_terms
        }
      },
      success: function (response) {
        console.log(response);
        ApiActions.receiveSearchResults(response);
      }
    });
  },

  fetchUser: function (id) {
    $.ajax({
      url: "/api/users/" + id,
      method: "GET",
      dataType: "json",
      success: function (response) {
        console.log(response);
        ApiActions.receiveUser(response);
      }
    });
  },

  patchUser: function (id, location, about_me) {
    console.log(id);
    $.ajax({
      url: "api/users/" + id,
      method: "PATCH",
      dataType: "json",
      data: {
        user: {
          location: location,
          about_me: about_me
        }
      },
      success: function (response) {
        console.log(response);
        ApiActions.receiveUser(response);
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
