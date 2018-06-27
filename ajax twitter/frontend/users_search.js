const APIUtil = require('./api_util.js');
const FollowToggle = require('./follow_toggle.js');
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