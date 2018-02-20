require('dotenv').config();
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  bearer_token: process.env.BEARER_TOKEN,
});

client.get('search/tweets', { q: 'from:elonmusk' }, function(err, tweets, res) {
  // console.log(err, tweets, res);
  let i = Math.floor(Math.random() * tweets.statuses.length);
  console.log(tweets.statuses[i].text);
});
