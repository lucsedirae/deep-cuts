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

var artistHistory = []


$(document).ready(function () {
    // defaultSearch();
    //clicker function for search button//
    $('.search-btn').on('click', function (event) {
        event.preventDefault();
        var artist = $('.searchTerm').val();
        if (artist === '') {
            return;
        }
        artistHistory.push(artist)
        storeArtist();
        // renderButtons();
        // weatherGenerator(city);
        console.log(artistHistory)
    });
});

function storeArtist() {
    localStorage.setItem('artistHistory', JSON.stringify(artistHistory));
}