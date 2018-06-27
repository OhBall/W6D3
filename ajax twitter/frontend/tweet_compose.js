const APIUtil = require('./api_util.js');
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