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
  }
};

module.exports = ApiActions;
