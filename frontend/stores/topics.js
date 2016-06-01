var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/Dispatcher");
var CONSTANTS = require("../constants/constants.js");

var _topics = [];

var TopicStore = new Store(AppDispatcher);

var resetTopics = function (topics) {
  _topics = topics;
};

// TopicStore.find = function (id) {
//   for (var x = 0; x < _topics.length; x++) {
//     if (_topics[x].id === id) {
//       return _topics[x];
//     }
//   }
// };

TopicStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case CONSTANTS.INDEX_RECEIVED:
      resetTopics(payload.topics);
      TopicStore.__emitChange();
      break;
    case CONSTANTS.THREAD_RECEIVED:
      resetTopics(payload.topics);
      TopicStore.__emitChange();
      break;
  }
};

TopicStore.all = function () {
  if (Array.isArray(_topics) === true) {
    console.log("array");
    return _topics.slice(0);
  } else {
    return [_topics];
  }
};

window.TopicStore = TopicStore;

module.exports = TopicStore;
