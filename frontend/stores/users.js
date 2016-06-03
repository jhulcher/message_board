var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/Dispatcher");
var CONSTANTS = require("../constants/constants.js");

var _users = [];

var UserStore = new Store(AppDispatcher);

var resetUsers = function (users) {
  _users = users;
};

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case CONSTANTS.USERS_RECEIVED:
      resetUsers(payload.users);
      UserStore.__emitChange();
      break;
    case CONSTANTS.USER_RECEIVED:
      resetUsers([payload.user]);
      UserStore.__emitChange();
      break;
  }
};

UserStore.all = function () {
  if (_users.length > 1) {
    console.log("array");
    return _users.slice(0);
  } else {
    return _users;
  }
};

window.UserStore = UserStore;

module.exports = UserStore;
