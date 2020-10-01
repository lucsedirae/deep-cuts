/* var artistHistory = []; */
// TK 9/30
var artistHistory = JSON.parse(localStorage.getItem("artistHistory")) || [];

//JD 9/30 Reorganized functions by alphabetical order to make searching them easier for reader
//initialization function
$(document).ready(function () {
  //calls function that appends default HTML to DOM
  populateMainSearch();

  //when called, it sets a set of event listeners in place allowing the nav icons to fucntion
  function activateListeners() {
    $("#youtube-btn").on("click", populateMainYoutube);
    $("#info-btn").on("click", populateMainInfo);
    $("#search-nav-btn").on("click", populateMainSearch);
    $('#history-btn').on("click", populateMainHistory);
  }

  //JD 9/30 Added function to populate artist history list
  //populates main-content with a scrollable history list of previously searched artists
  function populateMainHistory() {
  $(".main-content").empty();
  populateMenu();
  activateListeners();
  $(".main-content").append("<br><div class='col s4'></div><div class='col s4' id='history-list'>Testing</div>")
  }

    //JD 9/30 Moved menu population into it's own function to dry out code
  //populateMainInfo replaces search html with Info html. Also called from nav icons
  function populateMainInfo() {
    $(".main-content").empty();
    wikipediaSearch();
    populateMenu();
    activateListeners();
  }

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
    //JD 9/30 Moved search function inside populateMainSearch() so that it also functions
    // when navigated to not just on load
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
      callMusicBrainzAPI();
      callYoutubeAPI();
      populateMainInfo();
      $("#input").val("");
      console.log("history" + artistHistory);
    });
  }

  //populates a YouTube player in the main-content space
  function populateMainYoutube() {
    callYoutubeAPI();
    $(".main-content").empty();
    populateMenu();
    activateListeners();
    $(".main-content").append(
      "<br><br><iframe width='420' height='345' src='https://www.youtube.com/embed/" +
        videoId +
        "'></iframe>"
    );
      // TK 9/30 -- added a style attribute to knock the .main-content DIV up a bit 
    $(".main-content").attr("style", "margin-top: 9rem !important");

  }

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

  function storeArtist() {
    localStorage.setItem("artistHistory", JSON.stringify(artistHistory));
  }
});
