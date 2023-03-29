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


  $( "#form" ).submit(function( event ) {
    event.preventDefault();
    if ($("#tweet-text").val().length <= 14) {
      $.post("/tweets",  $( this ).serialize(),   function(response, status){
        alert("Data: " + response + "\nStatus: " + status);
      });
    } else {
      alert("The limit is 140 characters!")
    }
  });
});


$(document).ready();