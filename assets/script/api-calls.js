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
function callBandsInTownAPI() {
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
  });
}

//YOUTUBE API
//Google credentials API key: AIzaSyAWvi6Cb4U2R4VzJSEPftX7y3xVUJESaIw
//<script src="https://apis.google.com/js/api.js"></script>//

function callYoutubeAPI() {
  var currentArtistName = $(".searchTerm").val();

  $.ajax({
    //***ISSUE!!*** url has nirvana hardcoded in and so the results are always nirvana no matter what the currentArtistName is
    url:
      "https://www.googleapis.com/youtube/v3/search?video?maxResults=5&q=" +
      currentArtistName +
      "&key=AIzaSyBs1UbG6uKN4uWlNo0WeK40hCXno9YmAjI",
    method: "GET",
  }).then(function (response) {
    //JD 9/29
    //retrieves video id from response obj
    videoId = response.items[1].id.videoId;
    // console.log(response);
    // console.log("videoId: " + videoId);
  });
}
// function authenticate() {
//   return gapi.auth2
//     .getAuthInstance()
//     .signIn({ scope: "https://www.googleapis.com/auth/youtube.force-ssl" })
//     .then(
//       function () {
//         console.log("Sign-in successful");
//       },
//       function (err) {
//         console.error("Error signing in", err);
//       }
//     );
// }
// function loadClient() {
//   gapi.client.setApiKey("YOUR_API_KEY");
//   return gapi.client
//     .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
//     .then(
//       function () {
//         console.log("GAPI client loaded for API");
//       },
//       function (err) {
//         console.error("Error loading GAPI client for API", err);
//       }
//     );
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

// gapi.load("client:auth2", function () {
//   gapi.auth2.init({ client_id: "YOUR_CLIENT_ID" });
// });

// function youtubeAPI() {
// function authenticate() {
//   return gapi.auth2.getAuthInstance()
//       .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
//       .then(function() { console.log("Sign-in successful"); },
//             function(err) { console.error("Error signing in", err); });
// }
// function loadClient() {
//   gapi.client.setApiKey("AIzaSyAWvi6Cb4U2R4VzJSEPftX7y3xVUJESaI");
//   return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
//       .then(function() { console.log("GAPI client loaded for API"); },
//             function(err) { console.error("Error loading GAPI client for API", err); });
// }
// // Make sure the client is loaded and sign-in is complete before calling this method.
// function execute() {
//   return gapi.client.youtube.search.list({
//     "part": [
//       "snippet"
//     ],
//     "maxResults": 3,
//     "q": "surfing"
//   })
//       .then(function(response) {
//               // Handle the results here (response.result has the parsed body).
//               console.log("Response", response);
//             },
//             function(err) { console.error("Execute error", err); });
// }
// gapi.load("client:auth2", function() {
//   gapi.auth2.init({client_id: "http://127.0.0.1:5501/index.html"});
// });
// }

//SPOTIFY/SHAZAM API
//spotify api url
//https://api.spotify.com/

//youtube api key AIzaSyAWvi6Cb4U2R4VzJSEPftX7y3xVUJESaIw
//call url https://www.googleapis.com/youtube/v3/search
//documentation https://developers.google.com/youtube/v3/docs
