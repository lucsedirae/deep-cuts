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


// var artistName = $('.searchTerm').val();
var artistHistory = []


$(document).ready(function () {
    $('.search-btn').on('click', function (event) {
        event.preventDefault();
        var artist = $('.searchTerm').val();
        if (artist === '') {
            return;
        }
        artistHistory.push(artist)
        storeArtist();
        renderButtons();
        findArtist(artist);
        // console.log(artistHistory)
    });
});

function storeArtist() {
    localStorage.setItem('artistHistory', JSON.stringify(artistHistory));
}

function renderButtons() {
    $('.searchHistory').html('');
    for (var i = 0; i < artistHistory.length; i++) {
        var artists = artistHistory[i];
        var historyBtn = $(
            '<button type="button" class="btn btn-lg btn-block historyBtn text-white">'
        ).text(artists);
        $('.searchHistory').append(historyBtn);
    }
}

function findArtist() {
    var artist = $('.searchTerm').val();

    $.ajax({
        url: "http://musicbrainz.org/ws/2/artist/?query=artist:"+artist+"&fmt=json",
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
}