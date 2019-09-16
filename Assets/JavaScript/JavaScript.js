$(document).ready(function(){
//Create an array of strings, each one related to a topic that interests you. Save it to a variable called topics.
var topics = ["Witches", "Ghosts", "Bats", "Crows", "Zombies"];
var button = "<button>";
var search = $("#searchBar").val();
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
//When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
$("button").on('click', function(){
    event.preventDefault();
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var results = response.data;
//Try using a loop that appends a button for each string in the array.
        for (var i = 0; i < topics.length; i++);
        button.text(topics[i]);
        $("#Buttons").append(topics[i]);
//Under every gif, display its rating (PG, G, so on).
        var rating = results[i].rating;
        var ratingDisplay = $("<h3>").text("Rating: " + rating);
        button.prepend(ratingDisplay);
    });
})
//When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
$(".gif").on("click", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
//Add a form to your page that takes a value from a user input box and adds it to your topics array.
var getVal = $("#searchBar").val().trim();
topics.push(getVal);
//A function call that takes each topic in the array and remakes the buttons on the page.
});