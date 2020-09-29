///start app//
//$(document).ready(function () {...//

//clicker function for search//

//$('#search-btn').on('click', function (event) {...//
//inside this make function calls for the apis we need, in those api calls we populate the index.html//

///menu js//
//when user clicks tours button, make call to events api to populate section for events//
//$('#search-btn').on('click', function (event) {...//
//when album info button is clicked, api is called to populate album info//
//$('#search-btn').on('click', function (event) {...//
//above == rought pseudo code//

var artistHistory = [];

$(document).ready(function () {
  // defaultSearch();
  //clicker function for search button//
  $(".search-btn").on("click", function (event) {
    event.preventDefault();
    //JD changed var artist to currentArtistName
    //var currentArtistName stores user input
    //NOTE: this var is declared and initially defined in the api-calls.js
    currentArtistName = $(".searchTerm").val();
    if (currentArtistName === "") {
      return;
    }
    artistHistory.push(currentArtistName);
    storeArtist();

    //JD added function populateInfoCard 9/28
    populateInfoCard();

    //JD added input clear 9/28
    $("#input").val("");
    console.log(artistHistory);
  });

});

//JD added function populateInfoCard 9/28
//populateInfoCard() changes the visibility of the hidden card element in html using an 800ms fadeIn
function populateInfoCard() {
  $("#info-card").hide().css("visibility", "visible").fadeIn(800);
  callMusicBrainzAPI();

  //writes data from artistObj to #info-card
  //NOTE: artistObj is initially declared and defined in the api-calls.js
  //***ISSUE*** currentArtistName is now being correctly printed to the DOM
  //***ISSUE*** not sure if it's a timing issue since the ajax call takes some time to respond
  console.log(artistObj.artist);
  $("#info-card-title").val(currentArtistName);
}

function storeArtist() {
  localStorage.setItem("artistHistory", JSON.stringify(artistHistory));
}



//temporarily commented out, will re-implement in pop ups
//function renderButtons() {
//    $('.searchHistory').html('');
//    for (var i = 0; i < artistHistory.length; i++) {
//        var artists = artistHistory[i];
//        var historyBtn = $(
//            '<button type="button" class="btn btn-lg btn-block historyBtn text-white">'
//        ).text(artists);
//        $('.searchHistory').append(historyBtn);
//    }
