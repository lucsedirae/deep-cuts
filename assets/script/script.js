/* var artistHistory = []; */
// TK 9/30
var artistHistory = JSON.parse(localStorage.getItem("artistHistory")) || [];

//initialization function
$(document).ready(function () {
  //calls function that appends default HTML to DOM
  populateMainSearch();

  //clicker function for search button//
  $(".search-btn").on("click", function (event) {
    event.preventDefault();

    //var currentArtistName stores user input
    //NOTE: this var is declared and initially defined in the api-calls.js
    currentArtistName = $(".searchTerm").val();
    if (currentArtistName === "") {
      return;
      // TK 9/30: else if statement checking to see if artist name is already in the array.  If not, it will be added. 
    } else if (artistHistory.indexOf(currentArtistName) === -1){
      artistHistory.push(currentArtistName);
      storeArtist();
    }
    

    //calling populateMainInfo()
    //At this point populateInfoCard can be deprecated and so I am removing the function call and replacing
    callMusicBrainzAPI();
    callYoutubeAPI();
    populateMainInfo();
    $("#input").val("");
    console.log(artistHistory);
  });

  function activateListeners() {
    $("#youtube-btn").on("click", populateMainYoutube);
  }

  // JD 9/29 created populateMenu() to reduce redundancy in other populate functions
  //Appends nav icons to DOM
  function populateMenu() {
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

  //JD 9/29 Moved menu population into it's own function to dry out code
  //populateMainInfo
  //replaces search html with Info html. Also called from nav icons
  function populateMainInfo() {
    $(".main-content").empty();
    wikipediaSearch();
    populateMenu();
    activateListeners();
  }

  function populateMainYoutube() {
    callYoutubeAPI();
    $(".main-content").empty();
    populateMenu();
    $(".main-content").append(
      "<br><br><iframe width='420' height='345' src='https://www.youtube.com/embed/" +
        videoId +
        "'></iframe>"
    );
  }

  function storeArtist() {
    localStorage.setItem("artistHistory", JSON.stringify(artistHistory));
  }
});
