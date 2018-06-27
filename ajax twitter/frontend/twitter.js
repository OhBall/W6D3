const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');
const TweetCompose = require('./tweet_compose.js');
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