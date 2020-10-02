/* var artistHistory = []; */
var artistHistoryCache = [];
var artistHistory = JSON.parse(localStorage.getItem("artistHistory")) || [];
var tourObj = {};

//initialization function
$(document).ready(function () {
  //calls function that appends default HTML to DOM
  populateMainSearch();

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
    $(".main-content").empty();

    $(".main-content").attr("style", "margin-top: 16rem !important");
    //Pass in "My Artists" as header for History Page : TK 10/1
    /* populateMenu(); */
    $(".main-content").prepend("<h1>My Artists</h1>", "<i class='fas fa-home home-btn'></i>","<p>This is your artist log.  Every artist that you search for will be saved to this page.  Click on the artist to view their information or delete the artist from the log by clicking the trash can icon.</p>");
    activateListeners();
    $(".main-content").append(
      "<br><div class='col s4'></div><ul class='col s4' id='history-list'></ul>"
    );

    appendArtist();
    // $(".trash").on("click", function() {
    //   alert("foo")
    //   console.log("foo")
    //   var searchHistory = jQuery.data('i')
    //   console.log(searchHistory)
    //   artistHistoryCache.splice(searchHistory, 1)
    // });

    // $("data-button").on("click", function() {
    //   jQuery.data('delete', artistHistoryCache.splice(i))
    //  });
    $(".prev-search").on("click", function () {
      currentArtistName = $(this).text();
      // console.log("test" + currentArtistName);
      populateMainInfo();
    });
  }

    function appendArtist() {
      for (var i = 0; i < artistHistoryCache.length; i++) {
        $("#history-list").append(
          "<li class='prev-search'>" + artistHistoryCache[i] +"</li>" + "<span><button class='trash fa fa-trash' data-i=" +i+ "><i class='' aria-hidden='true'></i></button></span>"
        );
      }
      $(".trash").on("click", function() {
        // alert("foo")
        console.log($(this).data("i"))
        console.log("foo")
        // var storage = JSON.parse(localStorage.getItem("artistHistory"))
        artistHistoryCache.splice($(this).data("i"), 1)
        localStorage.setItem("artistHistory", JSON.stringify(artistHistoryCache))
        populateMainHistory()
  
  
  
          //these can be used for a clear all button//
        // localStorage.clear()
        // $("#history-list").empty
      });
    }
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


  //populateMainInfo replaces search html with Info html. Also called from nav icons
  function populateMainInfo() {
    $(".main-content").empty();
    $(".main-content").attr("style", "margin-top: 16rem !important");
    wikipediaSearch();
    populateMenu();
    activateListeners();

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
      //Index of results.artists can be iterated through at a later date to improve dynamics
      
      var resArt = results.artists[0];
      console.log(resArt);
      
  
      artistObj = {
        artist: resArt["name"],
        activeFrom: resArt["life-span"].begin,
        activeTo: resArt["life-span"].end,
        genre: resArt.tags[0].name,
        origin: resArt["begin-area"].name + "," + resArt.area.name  
        
      };

      console.log(artistObj);

      

      $(".main-content").append(
        "<br><div class='row'></div><div class='col s12' id='info-box'>Name: " +
          artistObj.artist +
          "</div>"
      );
      $(".main-content").append(
        "<br><div class='row'></div><div class='col s12' id='info-box'>Years active: " +
          artistObj.activeFrom +
          " until " +
          artistObj.activeTo +
          "</div>"
      );
      $(".main-content").append(
        "<br><div class='row'></div><div class='col s12' id='info-box'>Genre: " +
          artistObj.genre +
          "</div>"
      );
      $(".main-content").append(
        "<br><div class='row'></div><div class='col s12' id='info-box'>Origin: " +
          artistObj.origin +
          "</div>"
      );
    });
  }

  //populateMainSearch() populates the search section of the site. This is the default view on load and so
  //function is called during page initialization as well as on nav click
  function populateMainSearch() {
    $(".main-content").empty();
    $(".main-content").attr("style", "margin-top: 16rem !important");
    $(".main-content")
      .hide()
      .append(
        "<h1 id='site-header'>pitch<span><i class='fas fa-compact-disc'></i></span></h1>",
        "<h6>An intuitive guide to help you navigate the world of music</h6>",
        "<input type='text' class='searchTerm' id='input' placeholder='Enter Artist Name'/><br />",
        "<a class='waves-effect waves-light btn-large search-btn'>Find Your Band!</a>"
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

      artistHistoryCache = artistHistory;
      //validation to ensure there are no duplicates in artistHistory array
      if (artistHistoryCache.indexOf(currentArtistName) === -1) {
        artistHistoryCache.push(currentArtistName);
        storeArtist();
      }

      // callYoutubeAPI();
      populateMainInfo();
      $("#input").val("");
    });
  }

  function populateMainTour() {
    $(".main-content").empty();
    populateMenu();
    activateListeners();

    $.ajax({
      url:
        "https://rest.bandsintown.com/artists/" +
        currentArtistName +
        "/events/?app_id=451417d0c04a068bd2475d36b0555961",

      // "https://cors-anywhere.herokuapp.com/https://rest.bandsintown.com/artists/" +
      // currentArtistName +
      // "/?app_id=451417d0c04a068bd2475d36b0555961",
      method: "GET",
    }).then(function (response) {
      console.log(response);

      $(".main-content").append(
        "<br><h4>Upcoming Performances</h2><br><div id='artist-tour-pic'></div>",
        $("#artist-tour-pic").empty()
      );
      if (response !== undefined) {
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

          $(".main-content").append(
            "<br><hr><span>Lineup: " + tourObj.lineup + "</span>"
          );
          $(".main-content").append(
            "<br><span>Location: " +
              tourObj.locationVenue +
              "</span><br><span>" +
              tourObj.locationCity +
              "</span>"
          );
          $(".main-content").append(
            "<br><span>Date: " + tourObj.date + "</span>"
          );
          $(".main-content").append(
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
      }else{
      $(".main-content").append(
        "<br><span>Sorry, no performances currently scheduled.</span>"
      );
      $("#artist-tour-pic").empy();
      }
    });
  }

  //populates a YouTube player in the main-content space
  function populateMainYoutube() {
    // callYoutubeAPI();

    $.ajax({
      //***ISSUE!!*** url has nirvana hardcoded in and so the results are always nirvana no matter what the currentArtistName is
      url: "https://www.googleapis.com/youtube/v3/search?video?maxResults=2&kind=video&q=" +
      currentArtistName +
      "&key=AIzaSyBEOnsYq-1ABWL0cFlSSxxdAJkBHAwcOO0",
      method: "GET",
    }).then(function (response) {
      console.log(response);
      //JD 9/29
      //retrieves video id from response obj
      videoId = response.items[1].id.videoId;
      console.log(response);
      console.log("videoId: " + videoId);
      $(".main-content").empty();
      populateMenu();
      activateListeners();
      console.log("videoId: " + videoId);
      if (videoId === undefined) {
        $(".main-content").append("<p>We apologize, no videos are returning for this artist</p>")
      } else {

      $(".main-content").append(
        "<br><br><iframe width='420' height='345' src='https://www.youtube.com/embed/" +
          videoId +
          "'></iframe>"
      );
    };})
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
    $(".main-content")
      .hide()
      .append(
        "<h1>" + currentArtistName + "</h1>",
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

(function () {
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
  hamburger.nav.addEventListener("click", function (e) {
    hamburger.doToggle(e);
  });
});
