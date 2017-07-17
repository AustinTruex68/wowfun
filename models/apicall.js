//quick example of how to easily make api calls
const request = require('request');
module.exports = {
    callApi: function(routeBody, callback) {
        request('https://us.api.battle.net/wow/character/' + routeBody.realm + '/' + routeBody.character + '?locale=en_US&apikey=9d9m6v9nqhn67p754pawj445emsbrx8b', function(error, response, body) {
            return callback(null, body);
        });
    },
    getAchieveData: function(routeBody, callback) {
        console.log(routeBody);
        request('https://us.api.battle.net/wow/character/' + routeBody.realm + '/' + routeBody.character + '    ?fields=achievements&locale=en_US&apikey=9d9m6v9nqhn67p754pawj445emsbrx8b', function(error, response, body) {
            return callback(null, body);
        });
    }
}
