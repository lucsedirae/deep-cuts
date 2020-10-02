// var currentArtistName = $(".searchTerm").val();
var currentArtistName = "Keller Williams";

var artistList = [];
var artistObj = {};
var videoId = "";

//api keys: AIzaSyAYrNxKe4mIXCg9zDRqt9hw6wT8fW6oGYc, AIzaSyBs1UbG6uKN4uWlNo0WeK40hCXno9YmAjI, //
var youtubeURL =
  "https://www.googleapis.com/youtube/v3/search?video?maxResults=5&q=" +
  currentArtistName +
  "&key=AIzaSyBs1UbG6uKN4uWlNo0WeK40hCXno9YmAjI";

//BANDSINTOWN API
//bandsintown api url, api key & documentation link
//call url https://rest.bandsintown.com/artists/{{artist_name}}/?app_id=yOUrSuP3r3ven7aPp-id
//docs https://artists.bandsintown.com/support/public-api?_ga=2.110307469.924392.1601057589-666678079.1600528655
// function callBandsInTownAPI() {
//   $.ajax({
//     url:
//       "https://rest.bandsintown.com/artists/" +
//       currentArtistName +
//       "/events/?app_id=451417d0c04a068bd2475d36b0555961",

//     // "https://cors-anywhere.herokuapp.com/https://rest.bandsintown.com/artists/" +
//     // currentArtistName +
//     // "/?app_id=451417d0c04a068bd2475d36b0555961",
//     method: "GET",
//   }).then(function (response) {
//     console.log(response);
//   });
// }

// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
  return gapi.client.youtube.search
    .list({
      part: ["snippet"],
      maxResults: 3,
      q: "surfing",
    })
    .then(
      function (response) {
        // Handle the results here (response.result has the parsed body).
        // console.log("Response", response);
      },
      function (err) {
        // console.error("Execute error", err);
      }
    );
}

//mediawiki API call//
function wikipediaSearch() {
  var url = "https://en.wikipedia.org/w/api.php";

  var params = {
    action: "query",
    list: "search",
    srsearch: $(".searchTerm").val(),
    format: "json",
  };

  url = url + "?origin=*";
  Object.keys(params).forEach(function (key) {
    url += "&" + key + "=" + params[key];
  });

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      // console.log(response);
      var infoSnippet = response.query.search[0].snippet;
      $("#card-info").empty();
      $("#card-info").append(infoSnippet);
    })
    .catch(function (error) {
      // console.log(error);
    });
}



//SPOTIFY/SHAZAM API
//spotify api url
//https://api.spotify.com/

//youtube api key AIzaSyAWvi6Cb4U2R4VzJSEPftX7y3xVUJESaIw
//call url https://www.googleapis.com/youtube/v3/search
//documentation https://developers.google.com/youtube/v3/docs
