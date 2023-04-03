/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  //Load Tweets
  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then(function (data) {
        console.log('Success: ', data);
        renderTweets(data);
      });
  }

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Create tweets
  const createTweetElement = function (key) {
    const $tweet = `<article class="containerTweets">
      <header class="headerShow">
        <div class="profile">
          <img src="${key['user']['avatars']}" style="height: 80%; padding-right: 10%"> 
          <p class="profileName"> ${key['user']['name']} </p>
        </div>
        <P class="account"> ${key['user']['handle']} </P>
      </header>
      <container id="tweets-container"> ${escape(key['content']['text'])} </container>
      <hr>
      <footer class="footerShow">
        <p class="footerP"> ${timeago.format(key['created_at'])} </p>
        <div class="icons"> 
          <i class="fa-solid fa-flag footIc"></i> 
          <i class="fa-solid fa-retweet footIc"></i>
          <i class="fa-solid fa-heart footIc"></i>
        </div>
      </footer>
    </article>`
    return $tweet;
  }

  // Render Tweets
  const renderTweets = function (data) {
    for (let i = 0; i < data.length; i++) {
      let key =  data[i];
      let $tweet = createTweetElement(key);
      $('#allTweets').prepend($tweet);
    }
  }
  //Check the input to be 140 or less or empty
  $( "#form" ).submit(function( event ) {
    event.preventDefault();
    if ($("#tweet-text").val().length === 0) {
      $('.error-message').show();
      $('.error-message').text("The tweet should not be empty!");
    } else if ($("#tweet-text").val().length <= 140) {
      $('.error-message').text("");
      $('.error-message').hide();
      $.post("/tweets",  $( this ).serialize(),   function(response, status)  {
      // Clear text area
      $("#tweet-text").val(""); 
      // Reload Tweets
      $('#allTweets').empty();
      $(".counter").val(140);
      loadTweets();
      });
    } else {
    $('.error-message').show();
    $('.error-message').text("The limit is 140 characters!");
    }
  });
  loadTweets();
});
