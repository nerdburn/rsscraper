// set things up
var rss = 'http://mythpodcast.libsyn.com/rss';
//var rss = 'http://rss.earwolf.com/startup-school';
//var cheerio = require('cheerio');
//var feedread = require('feed-read');
var xml2js = require('xml2js');

/*
var $ = cheerio.load(rss, {
  normalizeWhitespace: true,
  xmlMode: true
});
console.log($);
var items = $('item');
console.log('found ' + items.length);
*/

/*
feedread.rss(rss, function(err, articles){
  if(err) {
    console.log('error:', err);
  }
  console.log(articles);
});
*/

var request = require('request');
request(rss, function(error, response, body) {
  if(!error && response.statusCode == 200) {
    // parse the xml
    var parser = new xml2js.Parser()
    parser.parseString(body, function(err, result) {
      if(!err && result) {
        var result = JSON.parse(JSON.stringify(result));
        var items = result.rss.channel[0].item;
        //console.log(result.rss.channel[0].item);
        items.forEach(function(item) {
          //console.log('item: ', item.title[0]);
          console.log('enclosure: ', item.enclosure[0].$.url);
        });
        /*
        var podcast = result.rss.channel;
        console.log('title:', podcast[0].title[0]);
        var episodes = podcast.item;
        console.log('episodes: ', episodes);
        */
      }
    });
  }
});
