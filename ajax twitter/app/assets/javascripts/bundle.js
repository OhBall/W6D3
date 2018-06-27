/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/twitter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const APIUtil = {
  
  followUser: id => {
    return $.ajax({
      method: 'POST',
      url: `/users/${id}/follow`,
      dataType: 'json'
    }); 
  },
  
  unfollowUser: id => {
    return $.ajax({
      method: 'DELETE',
      url: `/users/${id}/follow`,
      dataType: 'json'
    }); 
  },
  
  searchUsers: (queryVal, success) => {
    return $.ajax({
      method: 'GET',
      url: '/users/search',
      dataType: 'json',
      data: {
        query: queryVal
      },
      success: success
    });
  },
  
  createTweet: (data) => {
    return $.ajax({
      method: 'POST',
      url: '/tweets',
      dataType: 'json',
      data: data
    });
  }
  
};

module.exports = APIUtil;

/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js");

class FollowToggle {
  constructor(el) {
    this.$el = $(el);
    this.followState = this.$el.data('initial-follow-state');
    this.userId = this.$el.data('user-id');
    this.render();
    this.bindEvent();
  }  
  
  bindEvent() {
    this.$el.on('click', (event) => {
      event.preventDefault();
      this.handleClick();
    });
  }
  
  render(){
    if (this.followState) {
      this.$el.val("Unfollow!");
    } else {
      this.$el.val("Follow!");
    }
  }
  
  handleClick() {
    this.$el.attr('disabled', true);
    if (this.followState) {
      APIUtil.unfollowUser(this.userId).then(this.afterClick.bind(this));
    } else {
      APIUtil.followUser(this.userId).then(this.afterClick.bind(this));
    }
  }
  
  afterClick() {
    if (this.followState) {
      this.followState = false;
    } else {
      this.followState = true;
    }
    this.render();
    this.$el.attr('disabled', false);
  }
}

module.exports = FollowToggle;

/***/ }),

/***/ "./frontend/tweet_compose.js":
/*!***********************************!*\
  !*** ./frontend/tweet_compose.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js");
class TweetCompose {
  constructor(el) {
    this.$el = $(el);
    this.$el.on('submit', this.submit.bind(this));
    
  }
  
  submit(event){
    this.$el.children().attr("disabled", true);
    const serialized = $.serializeJSON(this.$el);
    APIUtil.createTweet(serialized).then(this.handleSuccess.bind(this));
  }
  
  handleSuccess(response){
    $el.clearInput();
    this.$el.children().attr("disabled", false);
    const $feed = $($el.data('tweets-ul'));
    
    
  }
}

module.exports = TweetCompose;

/***/ }),

/***/ "./frontend/twitter.js":
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js");
const UsersSearch = __webpack_require__(/*! ./users_search.js */ "./frontend/users_search.js");
const TweetCompose = __webpack_require__(/*! ./tweet_compose.js */ "./frontend/tweet_compose.js");
$(() => {
  // $('.follow-toggle').on('click', (event) => {
  // 
  // });
  
  $.each($('.follow-toggle'), (index, buttonEl) => {
    new FollowToggle(buttonEl);
  });

  $.each($('.users-search'), (index, searchEl) => {
    new UsersSearch(searchEl);
  });
  
  $.each($('.tweet-compose'), (index, composeEl) => {
    new TweetCompose(composeEl);
  });
  
});

/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js");
const FollowToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js");
class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.$input = this.$el.children().eq(0);
    this.$ul = this.$el.children().eq(1);
    this.$input.on('input', this.handleInput.bind(this));
  }
  
  handleInput() {
    APIUtil.searchUsers(this.$input.val(), this.renderResults.bind(this));
  }
  
  renderResults(results) {
    this.$ul.empty();
    results.forEach ((el) => {
      const $li = $('<li></li>');
      const $a = $(`<a href="/users/${el.id}">${el.username}</a>`);
      $li.append($a);
      const $form = $(`<form class="" action="index.html" method="post">
        <input type="submit" class="follow-toggle" data-initial-follow-state="${el.followed}" data-user-id="${el.id}" value="">
      </form>`);
      $li.append($form);
      this.$ul.append($li);
      
      new FollowToggle($form.children()[0]);
    });
  }
  
  
}

module.exports = UsersSearch;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map