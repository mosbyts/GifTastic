$(document).ready(function(){
//Create an array of strings, each one related to a topic that interests you. Save it to a variable called topics.
var topics = ["Witches", "Ghosts", "Bats", "Crows", "Zombies"];
$("#searchButton").text("Search");
//Try using a loop that appends a button for each string in the array.
for (var i = 0; i < topics.length; i++){
  var button = $("<button>", {id: i, value: topics[i]});
  var aTag = $("<a>");
  button.text(topics[i]);
  aTag.append(button);
  $("#Buttons").append(aTag);
};
//A function call that takes each topic in the array and remakes the buttons on the page.
function getGifs(buttonVal2){
  var queryURLBtn = "https://api.giphy.com/v1/gifs/search?q=" + buttonVal2 + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
  $.ajax({
    url: queryURLBtn,
    method: "GET"
  }).then(function(response){
    var results = response.data;
    console.log(results);
    for(var x = 0; x < results.length; x++){
      //Display each gif
      var actualGif = results[x].images.original.url;
      var imageGif = results[x].images.fixed_height_still.url;
      var actualGifDisplay = $("<img>", {src: imageGif, "data-still": imageGif, "data-animate": actualGif, "data-state": "still"}).addClass("gif");
      //Above every gif, display its rating (PG, G, so on).
      var rating = results[x].rating;
      var ratingDisplay = $("<h4>").text("Rating: " + rating);
      $("#Gifs").prepend(ratingDisplay, actualGifDisplay);
    }
  });
};
function getGifs2(getVal){
  var queryURLSearch = "https://api.giphy.com/v1/gifs/search?q=" + getVal + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
  console.log(queryURLSearch);
  $.ajax({
    url: queryURLSearch,
    method: "GET"
  }).then(function(response){
    var results = response.data;
    console.log(results);
    for(var x = 0; x < results.length; x++){
      //Display each gif
      var actualGif = results[x].images.original.url;
      var imageGif = results[x].images.fixed_height_still.url;
      var actualGifDisplay = $("<img>", {src: imageGif, "data-still": imageGif, "data-animate": actualGif, "data-state": "still"}).addClass("gif");
      //Above every gif, display its rating (PG, G, so on).
      var rating = results[x].rating;
      var ratingDisplay = $("<h4>").text("Rating: " + rating);
      $("#Gifs").prepend(ratingDisplay, actualGifDisplay);
    }
  });
};
$("button").on('click', function(event){
  var eventId = event.currentTarget.id;
  if (eventId === 'searchButton'){
      event.preventDefault();
      var getVal = $("#searchBar").val();
      $("#Gifs").empty();
      var button2 = $("<button>", {id: i, value: getVal});
      button2.text(getVal);
      var aTag2 = $("<a>");
      aTag2.append(button2);
      $("#Buttons").append(aTag2);
      getGifs2(button2.text());
  } else {
      event.preventDefault();
      var buttonVal2 = event.currentTarget.innerText;
      $("#Gifs").empty();
      getGifs(buttonVal2);
  }
});
});
//When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
$(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });