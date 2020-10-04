/* var artistHistory = []; */
var artistHistoryCache = [];
var artistHistory = JSON.parse(localStorage.getItem("artistHistory")) || [];
var tourObj = {};
var artistObj = {};

//initialization function
$(document).ready(function () {
  //calls function that appends default HTML to DOM
  populateMainSearch();
  populateNav();
  $("#youtube-drop-btn").on("click", populateMainYoutube);
  $("#info-drop-btn").on("click", populateMainInfo);
  $("#search-drop-btn").on("click", populateMainSearch);
  $("#artist-drop-btn").on("click", populateMainHistory);
  $("#calender-drop-btn").on("click", populateMainTour);
  $("#about-drop-btn").on("click", populateMainAbout);

  populateMainSearch(artistObj);

  //when called, it sets a set of event listeners in place allowing the nav icons to fucntion
  function activateListeners() {
    $("#youtube-btn").on("click", populateMainYoutube);
    $("#info-btn").on("click", populateMainInfo);
    $("#search-nav-btn").on("click", populateMainSearch);
    $("#history-btn").on("click", populateMainHistory);
    $("#tour-btn").on("click", populateMainTour);
    $(".home-btn").on("click", populateMainSearch);
  }

  //populates main-content with a scrollable history list of previously searched artists
  function populateMainHistory() {
    $("#main-content").empty();
    $("#main-content").attr("style", "margin-top: 16rem !important");
    //Pass in "My Artists" as header for History Page : TK 10/1
    /* populateMenu(); */
    $("#main-content").prepend(
      "<h1>My Artists</h1>",
      "<i class='fas fa-home home-btn'></i>",
      "<p>This is your artist log.  Every artist that you search for will be saved to this page.  Click on the artist to view their information or delete the artist from the log by clicking the trash can icon.</p>"
    );
    activateListeners();
    $("#main-content").append(
      "<br><div class='col s4'></div><ul class='col s4' id='history-list'></ul>"
    );
    appendArtist();
    $(".prev-search").on("click", function () {
      currentArtistName = $(this).text();
      populateMainInfo();
    });
  }

  function appendArtist() {
    for (var i = 0; i < artistHistoryCache.length; i++) {
      $("#history-list").append(
        "<li class='prev-search'>" +
          artistHistoryCache[i] +
          "</li>" +
          "<span><button class='trash fa fa-trash' data-i=" +
          i +
          "><i class='' aria-hidden='true'></i></button></span>"
      );
    }

    console.log(artistHistoryCache);
    $(".trash").on("click", function () {
      // alert("foo")
      console.log($(this).data("i"));
      console.log("foo");
      // var storage = JSON.parse(localStorage.getItem("artistHistory"))
      artistHistoryCache.splice($(this).data("i"), 1);
      localStorage.setItem("artistHistory", JSON.stringify(artistHistoryCache));
      populateMainHistory();

      //these can be used for a clear all button//
      // localStorage.clear()
      // $("#history-list").empty
    });
  }
  // $(".trash").on("click", function () {
  //   // alert("foo")
  //   console.log($(this).data("i"));
  //   console.log("foo");
  //   // var storage = JSON.parse(localStorage.getItem("artistHistory"))
  //   artistHistoryCache.splice($(this).data("i"), 1);
  //   localStorage.setItem("artistHistory", JSON.stringify(artistHistoryCache));
  //   populateMainHistory();

  //these can be used for a clear all button//
  // localStorage.clear()
  // $("#history-list").empty
  // });

  function populateMainAbout() {
    $("#main-content").empty();
    $("#main-content").prepend(
      "<h1>About Us</h1>",
      "<i class='fas fa-home home-btn'></i>",
      "<hr><div class='row'><div class='col s2'></div><div class='col s8'><h1>pitch</h1><br><br><p>Pitch is an app that allows music enthusiasts to instantly research an artist and begin to explore their catalog.</p></div></div>",
      "<hr><p>Pitch was created by:</p><br><ul><li>David Stinnett - <a href='https://github.com/serjykalstryke' class='fab fa-github-square fa-2x'></a></li><li>Mark Major - <a href='https://github.com/MarkMajorUR' class='fab fa-github-square fa-2x'></a></li><li>Tanner Kirkpatrick - <a href='https://github.com/twkirkpatrick' class='fab fa-github-square fa-2x'></a></li><li>Jon Deavers - <a href='https://github.com/lucsedirae' class='fab fa-github-square fa-2x'></a></li></ul>"
    );
    activateListeners();
  }

  //populateMainInfo replaces search html with Info html. Also called from nav icons
  function populateMainInfo() {
    //MUSICBRAINZ API
    //musicbrainz documentation link and call url (no api key required)
    //call url https://musicbrainz.org/ws/2/
    //docs https://musicbrainz.org/doc/MusicBrainz_API/Search
    //musicbrainz api call
    $.ajax({
      url:
        "https://musicbrainz.org/ws/2/artist/?query=artist:" +
        currentArtistName +
        "&fmt=json",
      method: "GET",
    }).then(function (results) {
      console.log(results);
      var resArt = results.artists[0];

      artistObj = {
        artist: resArt["name"],
        activeFrom: resArt["life-span"].begin,
        activeTo: resArt["life-span"].end,
        genre: resArt.tags[0].name,
        origin: resArt["begin-area"].name + "," + " " + resArt.area.name,
      };
      //Moved these functions below the API call so I could grab the artistObj to pass into populateMenu function in order to have access to the artist name
      $("#main-content").empty();
      $("#main-content").attr("style", "margin-top: 16rem !important");
      populateMenu(artistObj);
      activateListeners();
      
      //moved the array push logic up here so it will grab the accurate artist name that is searched for 
      artistHistoryCache = artistHistory;
      //validation to ensure there are no duplicates in artistHistory array
      if (artistHistoryCache.indexOf(artistObj.artist) === -1) {
        artistHistoryCache.push(artistObj.artist);
        console.log(artistHistoryCache);
        storeArtist();
      }

      //conditional for artists that are still active
      if (resArt["life-span"].end === undefined) {
        artistObj.activeTo = "Current";
      }

      $("#main-content").append(
        "<br><div class='row'></div><div class='col s6 offset-s3' id='info-box'>Years active : " +
          artistObj.activeFrom +
          " - " +
          artistObj.activeTo +
          "</div>"
      );
      $("#main-content").append(
        "<br><div class='row'></div><div class='col s6 offset-s3' id='info-box'>Genre : " +
          artistObj.genre +
          "</div>"
      );
      $("#main-content").append(
        "<br><div class='row'></div><div class='col s6 offset-s3' id='info-box'>Origin : " +
          artistObj.origin +
          "</div>"
      );
      $("#main-content").append(
        "<br><div class='row'></div><textarea class='col s6 offset-s3' id='note-box' placeholder='Write Listening Notes Here'></textarea></i>"
      );
      $("#main-content").append(
        "<br><div class='row'></div><i class='fas fa-save fa-3x' id='note-save-btn'></i><i class='fa fa-trash fa-3x' id='note-trash-btn'>"
      );

      var savedNote = localStorage.getItem(currentArtistName + "-note:");
      console.log(savedNote);

      if (savedNote != []) {
        $("#note-box").val(savedNote);
      }

      $("#note-save-btn").on("click", function () {
        var artistNote = $("#note-box").val();
        if (artistNote != "") {
          localStorage.setItem(
            currentArtistName + "-note:",
            JSON.stringify(artistNote)
          );
        }
      });

      $("#note-trash-btn").on("click", function () {
        localStorage.removeItem(currentArtistName + "-note:");
        $("#note-box").val("");
      });
    });
  }

  //populateMainSearch() populates the search section of the site. This is the default view on load and so
  //function is called during page initialization as well as on nav click
  function populateMainSearch() {
    $("#main-content").empty();
    $("#main-content").addClass("main-content")
    $("#main-content").attr("style", "margin-top: 16rem !important");
    $("#main-content")
      .hide()
      .append(
        "<h1 id='site-header'>pitch<span><i class='fas fa-compact-disc'></i></span></h1>",
        "<h6>An intuitive guide to help you navigate the world of music</h6>",
        "<input type='text' class='searchTerm' id='input' placeholder='Enter Artist Name'/><br />",
        "<a class='waves-effect waves-light btn-large search-btn'>Find A Band!</a>"
      )
      .fadeIn(800);
    $(".search-btn").on("click", function (event) {
      event.preventDefault();

      //var currentArtistName stores user input
      //NOTE: this var is declared and initially defined in the api-calls.js
      currentArtistName = $(".searchTerm").val();
      if (currentArtistName === "") {
        return;
      }

      /* artistHistoryCache = artistHistory;
      //validation to ensure there are no duplicates in artistHistory array
      if (artistHistoryCache.indexOf(artistObj.artist) === -1) {
        artistHistoryCache.push(artistObj.artist);
        console.log(artistHistoryCache);
        storeArtist();
      } */

      populateMainInfo();
      $("#input").val("");
    });
  }

  //Populates main-content with upcoming tour date information
  function populateMainTour() {
    populateMenu()
    $("#main-content").empty();
    $("#main-content").removeClass("main-content").addClass("tour-content")
    // $(".main-content").attr("style", "width:30rem !important");
    $("#main-content").attr("style", "height:60rem !important");
    // $(".main-content").attr("style", "overflow-y:auto !important");
    populateMenu();
    activateListeners();

    //BANDSINTOWN API
    //call url https://rest.bandsintown.com/artists/{{artist_name}}/?app_id=yOUrSuP3r3ven7aPp-id
    //docs https://artists.bandsintown.com/support/public-api?_ga=2.110307469.924392.1601057589-666678079.1600528655
    $.ajax({
      url:
        "https://rest.bandsintown.com/artists/" +
        artistObj.artist +
        "/events/?app_id=451417d0c04a068bd2475d36b0555961",

      // "https://cors-anywhere.herokuapp.com/https://rest.bandsintown.com/artists/" +
      // currentArtistName +
      // "/?app_id=451417d0c04a068bd2475d36b0555961",
      method: "GET",
    }).then(function (response) {
      console.log(response);

      $(".tour-content").attr("style", "margin-top: 5rem !important");

      $(".tour-content").append(
        "<br><h4 id='tour-header'>Upcoming Performances</h2><br><div id='artist-tour-pic'></div>",
        $("#artist-tour-pic").empty()
      );
      if (response.length < 1) {

        $(".tour-content").append(
          "<br><span>Sorry, no performances currently scheduled.</span>"
        );
        $("#artist-tour-pic").empty();
      } else {
        for (var i = 0; i < response.length; i++) {
          tourObj = {
            image: response[0].artist.thumb_url,
            lineup: response[i].lineup[0],
            locationVenue: response[i].venue.name,
            locationCity: response[i].venue.location,
            date: response[i].datetime,
            ticketStatus: response[i].offers[0].status,
            ticketLink: response[i].offers[0].url,
          };
          console.log("Link: " + tourObj.locationVenue);

          $(".tour-content").append(
            "<br><hr><span>Lineup: " + tourObj.lineup + "</span>"
          );
          $(".tour-content").append(
            "<br><span>Location: " +
              tourObj.locationVenue +
              "</span><br><span>" +
              tourObj.locationCity +
              "</span>"
          );
          $(".tour-content").append(
            "<br><span>Date: " + tourObj.date + "</span>"
          );
          $(".tour-content").append(
            "<br><span>Tickets: " +
              tourObj.ticketStatus +
              "</span><br><span><a href='" +
              tourObj.ticketLink +
              "'>Buy Tickets</a></span>"
          );
        }

        $("#artist-tour-pic").append(
          "<img class='thumbnail' src='" + tourObj.image + "'>"
        );
      }
    });
  }

  //populates a YouTube player in the main-content space
  function populateMainYoutube() {
    $.ajax({
      url:
        "https://www.googleapis.com/youtube/v3/search?type=video&maxResults=5&q=" +
        artistObj.artist +
        "&key=AIzaSyBEOnsYq-1ABWL0cFlSSxxdAJkBHAwcOO0",

      method: "GET",
    }).then(function (response) {
      console.log(response);
      //JD 9/29
      //retrieves video id from response obj
      videoId = response.items[1].id.videoId;
      console.log(response);
      console.log("videoId: " + videoId);
      $("#main-content").empty();
      populateMenu();
      activateListeners();
      console.log("videoId: " + videoId);
      if (videoId === undefined) {
        $("#main-content").append(
          "<p>We apologize, no videos are returning for this artist</p>"
        );
      } else {
        $("#main-content").append(
          "<br><br><iframe width='420' height='345' src='https://www.youtube.com/embed/" +
            videoId +
            "'></iframe>"
        );
      }
    });
    // $(".main-content").empty();
    // populateMenu();
    // activateListeners();
    // console.log("videoId: " + videoId);
    // $(".main-content").append(
    //   "<br><br><iframe width='420' height='345' src='https://www.youtube.com/embed/" +
    //   videoId +
    //   "'></iframe>"
    // );
    // TK 9/30 -- added a style attribute to knock the .main-content DIV up a bit
    $(".main-content").attr("style", "margin-top: 9rem !important");
  }

  //Appends nav icons to DOM
  function populateMenu() {
    $("#main-content")
      .hide()
      .append(
        "<h1>" + artistObj.artist + "</h1>",
        "<i class='fab fa-youtube fa-3x navi-btn' id='youtube-btn'></i></a>",
        "<i class='fas fa-info-circle fa-3x navi-btn' id='info-btn'></i></a>",
        "<i class='fas fa-calendar-alt fa-3x navi-btn' id='tour-btn'></i></a>",
        "<i class='fas fa-list-alt fa-3x navi-btn' id='history-btn'></i></a>",
        "<i class='fas fa-search fa-3x navi-btn' id='search-nav-btn'></i></a>"
      )
      .fadeIn(800);
  }
  //stores artist list to local storage
  function storeArtist() {
    localStorage.setItem("artistHistory", JSON.stringify(artistHistoryCache));
  }
});

// THIS IS JAVACRIPT FOR THE NAV MENTI
function populateNav() {
  $("body").prepend("<div id='dropDownMenu' class='row'></div>");
  $("#dropDownMenu").append(
    "<div class='col s3 drop'><div class='nav-toggle'><div class='nav-toggle-bar'></div></div><nav class='nav'> <ul class='col s12' id='list'><li id='youtube-drop-btn' class='fab fa-youtube yt'> <span class='nav-font'> YouTube</span></li><br/><li id='info-drop-btn'class='fas fa-info-circle'> <span class='nav-font'> Artist Info</span></li><br/><li id='calender-drop-btn' class='fas fa-calendar-alt'><span class='nav-font'> Tour Dates</span></li><br/><li id='artist-drop-btn' class='fas fa-list-alt'><span class='nav-font'> My Artists</span></li><br/><li id='search-drop-btn' class='fas fa-search'><span class='nav-font'> Search</span></li><li id='about-drop-btn' class='fas fa-question-circle'><span class='nav-font'> About</span></li></ul></nav></div>"
  );

  var hamburger = {
    navToggle: document.querySelector(".nav-toggle"),
    nav: document.querySelector("nav"),

    doToggle: function (e) {
      e.preventDefault();
      this.navToggle.classList.toggle("expanded");
      this.nav.classList.toggle("expanded");
    },
  };

  hamburger.navToggle.addEventListener("click", function (e) {
    hamburger.doToggle(e);
  });
  // hamburger.nav.addEventListener('click', function(e) { hamburger.doToggle(e); });
}
