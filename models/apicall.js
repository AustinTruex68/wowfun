//quick example of how to easily make api calls
const request = require('request');

module.exports = {
    callApi: function(routeBody, callback) {
        request('https://us.api.battle.net/wow/character/' + encodeURIComponent(routeBody.realm) + '/' + encodeURIComponent(routeBody.character) + '?locale=en_US&apikey=9d9m6v9nqhn67p754pawj445emsbrx8b', function(error, response, body) {
            return callback(null, body);
        });
    },
    getAchieveData: function(routeBody, callback) {
        request('https://us.api.battle.net/wow/character/' + encodeURIComponent(routeBody.realm) + '/' + encodeURIComponent(routeBody.character) + '?fields=achievements&locale=en_US&apikey=9d9m6v9nqhn67p754pawj445emsbrx8b', function(error, response, body) {
            return callback(null, body);
        });
    },
    getGuildMembers: function(routeBody, callback) {
        request('https://us.api.battle.net/wow/guild/' + encodeURIComponent(routeBody.realm) + '/' + encodeURIComponent(routeBody.guildName) + '?fields=members&locale=en_US&apikey=9d9m6v9nqhn67p754pawj445emsbrx8b', function(error, response, body) {
            return callback(null, body);
        });
    },
    getCharacterFeed: function(routeBody, callback) {
        request('https://us.api.battle.net/wow/character/' + encodeURIComponent(routeBody.realm) + '/' + encodeURIComponent(routeBody.character) + '?fields=feed&locale=en_US&apikey=9d9m6v9nqhn67p754pawj445emsbrx8b', function(error, response, body) {
            return callback(null, body);
        });
    },
    getJackpotItem: function(routeBody, callback) {
        request('https://us.api.battle.net/wow/item/' + routeBody.itemId + '/challenge-mode-jackpot?bl=' + routeBody.bl1 + ',' + routeBody.bl2 + ',' + routeBody.bl3 + '&locale=en_US&apikey=9d9m6v9nqhn67p754pawj445emsbrx8b', function(error, response, body) {
            return callback(null, body);
        });
    }
}