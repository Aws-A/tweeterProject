$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").on('input', function() {
   const counter = $(this).val().length;
    charRemaining = 140 - counter;
    if (charRemaining < 0) {
      $(".counter").css("color", "red");
    }
   $(".counter").text(charRemaining);
   
  });
});

$(document).ready();