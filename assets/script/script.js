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
  //calls function that appends default HTML to DOM
  populateMainSearch();
  // defaultSearch();
  //clicker function for search button//
  $(".search-btn").on("click", function (event) {
    event.preventDefault();
    //var currentArtistName stores user input
    //NOTE: this var is declared and initially defined in the api-calls.js
    currentArtistName = $(".searchTerm").val();
    if (currentArtistName === "") {
      return;
    }
    artistHistory.push(currentArtistName);
    storeArtist();

    //calling populateMainInfo()
    //At this point populateInfoCard can be deprecated and so I am removing the function call and replacing
    populateMainInfo();
    youtubeAPI()
    $("#input").val("");
    console.log(artistHistory);
  });

  //replace this idea with scrollTo links
  // $("#youtube-btn").on("click", populateMainYoutube);


//JD 9/29 Created populateMainSearch()
//populateMainSearch() populates the search section of the site. This is the default view on load and so
//function is called during page initialization as well as on nav click
function populateMainSearch() {
  $(".main-content").empty();
  $(".main-content")
    .hide()
    .append(
      "<h1 id='site-header'>pitch<span><i class='fas fa-compact-disc'></i></span></h1>",
      "<h6>An intuitive guide to help you navigate the world of music</h6>",
      "<input type='text' class='searchTerm' id='input' placeholder='Enter Artist Name'/><br />",
      "<a class='waves-effect waves-light btn-large search-btn'>Find Your Band!</a>"
    )
    .fadeIn(800);
}

//populateMainInfo
//The idea of this function is to replace existing data in the main-content class with dynamic information
//from the API calls instead of calling a completely separate element. Leaving populateCardInfo() in place
//for now until this function is working correctly
function populateMainInfo() {
  $(".main-content").empty();
  callMusicBrainzAPI();
  wikipediaSearch();
  $(".main-content")
    .hide()
    .append(
      "<h1 class='card-title' type='text' id='info-card-title'>" +
        currentArtistName +
        "</h1>",
      "<i class='fab fa-youtube fa-3x' id='youtube-btn'></i></a>",
      "<i class='fas fa-info-circle fa-3x' id='info-btn'></i></a>",
      "<i class='fab fa-spotify fa-3x' id='spotify-btn'></i></a>",
      "<i class='fas fa-list-alt fa-3x' id='history-btn'></i></a>",
      "<i class='fas fa-search fa-3x' id='search-nav-btn'></i></a>"
    )
    .fadeIn(800);
}

function populateMainYoutube() {
  $(".main-content").empty();
  //***Insert function for YouTube api call***

  $(".main-content")
    .hide()
    .append(
      "<h1 class='card-title' type='text' id='info-card-title'>" +
        currentArtistName +
        "</h1>",
      "<iframe id='ytplayer' type='text/html' width='640' height='360' src='https://www.youtube.com/embed?listType=search&list=" +
        currentArtistName +
        "' frameborder='0'></iframe>",
      "<i class='fab fa-youtube fa-3x' id='youtube-btn'></i></a>",
      "<i class='fas fa-info-circle fa-3x' id='info-btn'></i></a>",
      "<i class='fab fa-spotify fa-3x' id='spotify-btn'></i></a>",
      "<i class='fas fa-list-alt fa-3x' id='history-btn'></i></a>",
      "<i class='fas fa-search fa-3x' id='search-nav-btn'></i></a>"
    )
    .fadeIn(800);
}

function storeArtist() {
  localStorage.setItem("artistHistory", JSON.stringify(artistHistory));
}

});
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
