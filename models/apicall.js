const request = require('request');
module.exports = {
    callApi: function(routeBody, callback) {
        console.log(routeBody);
        request('https://us.api.battle.net/wow/character/' + routeBody.realm + '/' + routeBody.character + '?locale=en_US&apikey=9d9m6v9nqhn67p754pawj445emsbrx8b', function(error, response, body) {
            console.log('error:', error); // Print the error if one occurred 
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
            console.log('body:', body); // Print the HTML for the Google homepage. 
            return callback(null, body);
        });
    }
}
