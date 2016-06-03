var AppDispatcher = require("../dispatcher/Dispatcher.js");
var Constants = require("../constants/constants.js");

var ApiActions = {
  receiveIndex: function (topics) {
    AppDispatcher.dispatch({
      actionType: Constants.INDEX_RECEIVED,
      topics: topics
    });
  },

  receiveThread: function (topic) {
    AppDispatcher.dispatch({
      actionType: Constants.THREAD_RECEIVED,
      topics: topic
    });
  },

  receiveUsers: function (users) {
    AppDispatcher.dispatch({
      actionType: Constants.USERS_RECEIVED,
      users: users
    });
  },

  receiveUser: function (user) {
    AppDispatcher.dispatch({
      actionType: Constants.USER_RECEIVED,
      user: user
    });
  },

  receiveSearchResults: function (results) {
    AppDispatcher.dispatch({
      actionType: Constants.SEARCH_RESULTS_RECEIVED,
      search_results: results
    });
  }

};

module.exports = ApiActions;
