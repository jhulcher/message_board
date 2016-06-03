var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/Dispatcher");
var CONSTANTS = require("../constants/constants.js");

var _search_results = [];

var SearchResultsStore = new Store(AppDispatcher);

var resetSearchResults = function (search_results) {
  _search_results = search_results;
};

SearchResultsStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case CONSTANTS.SEARCH_RESULTS_RECEIVED:
      resetSearchResults(payload.search_results);
      SearchResultsStore.__emitChange();
      break;
  }
};

SearchResultsStore.all = function () {
  if (_search_results.length > 1) {
    console.log("array");
    return _search_results.slice(0);
  } else {
    return _search_results;
  }
};

window.SearchResultsStore = SearchResultsStore;

module.exports = SearchResultsStore;
