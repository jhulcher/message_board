var ApiActions = require("../actions/api_actions.js");
var TopicStore = require("../stores/topics.js");

var ApiUtil = {

  fetchIndex: function () {
    $.ajax({
      url: "/api/topics",
      method: "GET",
      dataType: "json",
      success: function (response) {
        ApiActions.receiveIndex(response);
      }
    });
  },

  fetchThread: function (id) {
    $.ajax({
      url: "/api/topics/" + id,
      method: "GET",
      dataType: "json",
      success: function (response) {
        ApiActions.receiveThread(response);
      }
    });
  },

  fetchUsers: function () {
    $.ajax({
      url: "/api/users",
      method: "GET",
      dataType: "json",
      success: function (response) {
        ApiActions.receiveUsers(response);
      }
    });
  },

  addPhoto: function (callBack, url, id) {
    $.ajax({
      url: "/api/users/" + id,
      method: "PATCH",
      data: {
        user: {
          public_id: url,
          location: "",
          about_me: ""
        }
      },
      success: function (response) {
        callBack(response);
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
        ApiActions.receiveUser(response);
      }
    });
  },

  patchUser: function (id, location, about_me) {
    $.ajax({
      url: "api/users/" + id,
      method: "PATCH",
      dataType: "json",
      data: {
        user: {
          location: location,
          about_me: about_me,
          public_id: ""
        }
      },
      success: function (response) {
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
        ApiActions.receiveThread(response);
      }
    });
  },

  logOut: function () {
    $.ajax({
      url: "session",
      method: "DELETE",
      success: function (response) {
        window.location.href = "/";
      }
    });
  }

};

window.ApiUtil = ApiUtil;

module.exports = ApiUtil;
