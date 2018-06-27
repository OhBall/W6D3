const APIUtil = require("./api_util.js");

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