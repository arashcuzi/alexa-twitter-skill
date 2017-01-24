'use strict';
// set process.env vars from .env in root
require('dotenv').config();
var Alexa = require('alexa-sdk');
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  bearer_token: process.env.BEARER_TOKEN,
});

var APP_ID = 'amzn1.ask.skill.5fa7b020-50e5-4db6-801f-8d6d3d3504c8'; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Elon\'s Tweets';

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random Elon Musk fact from the Elon facts list
        // var factIndex = Math.floor(Math.random() * ELON_FACTS.length);
        // var randomFact = ELON_FACTS[factIndex];
        let self = this;

        // Create speech output
        var speechOutput;
        client.get('search/tweets', { q: 'from:elonmusk' }, function(err, tweets, res) {
          let i = Math.floor(Math.random() * tweets.statuses.length);
          speechOutput = 'One of Elon\'s latest tweets is: ' + tweets.statuses[i].text;
          self.emit(':tellWithCard', speechOutput, SKILL_NAME, tweets.statuses[i].text);
        });
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me an elon tweet, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};
