//bandsintown api url, api key & documentation link
//call url https://rest.bandsintown.com/artists/{{artist_name}}/?app_id=yOUrSuP3r3ven7aPp-id
//docs https://artists.bandsintown.com/support/public-api?_ga=2.110307469.924392.1601057589-666678079.1600528655

//musicbrainz documentation link and call url (no api key required)
//call url https://musicbrainz.org/ws/2/
//docs https://musicbrainz.org/doc/MusicBrainz_API



$(document).ready(function() {

    $.ajax({ 
        type: 'GET', 
        url: 'https://www.musicbrainz.org/ws/2/artist/?query=artist:michael jackson',
        dataType: 'xml', 
        success: function(xml){ 
           $("artist", xml).each(function(){
               console.log($("gender", this).text());
           });
        }
    });
})