//JD changed artistName to currentArtistName to improve specificity 9/28
var currentArtistName = "nirvana";
var artistList = [];
var artistObj = {};

//BANDSINTOWN API
//bandsintown api url, api key & documentation link
//call url https://rest.bandsintown.com/artists/{{artist_name}}/?app_id=yOUrSuP3r3ven7aPp-id
//docs https://artists.bandsintown.com/support/public-api?_ga=2.110307469.924392.1601057589-666678079.1600528655

//MUSICBRAINZ API
//musicbrainz documentation link and call url (no api key required)
//call url https://musicbrainz.org/ws/2/
//docs https://musicbrainz.org/doc/MusicBrainz_API/Search
//musicbrainz api call

function callMusicBrainzAPI() {
  $.ajax({
    url:
      "http://musicbrainz.org/ws/2/artist/?query=artist:" +
      currentArtistName +
      "&fmt=json",
    method: "GET",
  }).then(function (results) {
    //Index of results.artists can be iterated through at a later date to improve dynamics
    var resArt = results.artists[0];

    artistObj = {
      artist: resArt["name"],
      activeFrom: resArt["life-span"].begin,
      activeTo: resArt["life-span"].end,
      genre: resArt.tags[0],
    };
    // console.log(results);
    console.log(artistObj);
    console.log(results)

    $("#info-card-title").empty()
    $("#info-card-title").append(resArt["name"] + " : " + resArt.tags[0].name)
  });
}

//YOUTUBE API
//Google credentials API key: AIzaSyAWvi6Cb4U2R4VzJSEPftX7y3xVUJESaIw

//SPOTIFY/SHAZAM API
//spotify api url
//https://api.spotify.com/

//youtube api key AIzaSyAWvi6Cb4U2R4VzJSEPftX7y3xVUJESaIw
//call url https://www.googleapis.com/youtube/v3/search
//documentation https://developers.google.com/youtube/v3/docs


//mediawiki API call//

function wikipediaSearch() {

var url = "https://en.wikipedia.org/w/api.php"; 

var params = {
    action: "query",
    list: "search",
    srsearch: $(".searchTerm").val(),
    format: "json"
};

url = url + "?origin=*";
Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

fetch(url)
    .then(function(response){return response.json();})
    .then(function(response) {
        console.log(response)
        var infoSnippet = response.query.search[0].snippet
        $('#card-info').empty()
        $('#card-info').append(infoSnippet)
    })
    .catch(function(error){console.log(error);});
  }
