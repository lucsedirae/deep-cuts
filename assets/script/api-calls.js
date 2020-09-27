// var artistName = "nirvana";
// var artistList = [];
// var artistObj = {};
//bandsintown api url, api key & documentation link
//call url https://rest.bandsintown.com/artists/{{artist_name}}/?app_id=yOUrSuP3r3ven7aPp-id
//docs https://artists.bandsintown.com/support/public-api?_ga=2.110307469.924392.1601057589-666678079.1600528655





//musicbrainz documentation link and call url (no api key required)
//call url https://musicbrainz.org/ws/2/
//docs https://musicbrainz.org/doc/MusicBrainz_API/Search
//musicbrainz api call
$.ajax({
    url: "http://musicbrainz.org/ws/2/artist/?query=artist:"+artistName+"&fmt=json",
    method: "GET"
}).then(function(results){
    //Index of results.artists can be iterated through at a later date to improve dynamics
    var resArt = results.artists[0];

    artistObj = {
        artist: resArt['name'],
        activeFrom: resArt['life-span'].begin,
        activeTo: resArt['life-span'].end,
        genre: resArt.tags[0]
    }
    console.log(results);
    console.log(artistObj);
});






















//spotify api url
//https://api.spotify.com/

//youtube api key AIzaSyAWvi6Cb4U2R4VzJSEPftX7y3xVUJESaIw
//call url https://www.googleapis.com/youtube/v3/search
//documentation https://developers.google.com/youtube/v3/docs



