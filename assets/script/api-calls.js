//bandsintown api url, api key & documentation link
//call url https://rest.bandsintown.com/artists/{{artist_name}}/?app_id=yOUrSuP3r3ven7aPp-id
//docs https://artists.bandsintown.com/support/public-api?_ga=2.110307469.924392.1601057589-666678079.1600528655

//musicbrainz documentation link and call url (no api key required)
//call url https://musicbrainz.org/ws/2/
//docs https://musicbrainz.org/doc/MusicBrainz_API



$(document).ready(function() {

    const MusicBrainzApi = require('musicbrainz-api').MusicBrainzApi;

    const mbApi = new MusicBrainzApi(config);

    import {MusicBrainzApi} from '../src/musicbrainz-api';

    const config = {
    // API base URL, default: 'https://musicbrainz.org' (optional)
    baseUrl: 'https://musicbrainz.org',

    appName: 'deep-cuts',
    appVersion: '0.1.0',

    // Your e-mail address, required for submitting ISRCs
    appMail: "jondeavers@gmail.com"
    }

    console.log(mbApi);

})