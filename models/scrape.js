var request = require('request');
var cheerio = require('cheerio');
module.exports = {
    scrapeWowPlayer: function(routeBody, callback) {
        console.log(routeBody);
        // Let's scrape Anchorman 2
        url = 'https://www.wowprogress.com/character/us/tichondrius/Vulcanite';

        request(url, function(error, response, html) {
            if (!error) {
                var $ = cheerio.load(html);

                var json = $('div.gearscore').text().trim();

                // $('.title_wrapper').filter(function() {
                //     var data = $(this);
                //     title = data.children().first().text().trim();
                //     release = data.children().last().children().last().text().trim();

                //     json.title = title;
                //     json.release = release;
                // })

                // $('.ratingValue').filter(function() {
                //     var data = $(this);
                //     rating = data.text().trim();

                //     json.rating = rating;
                // })
            }

            console.log(json);

            return callback(null, json);
        })
    }
}