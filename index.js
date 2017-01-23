'use strict';
var Alexa = require('alexa-sdk');
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: '',
});

var APP_ID = 'amzn1.ask.skill.a1d211d8-eee7-4c5c-bd53-87648910eaac'; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Elon Facts';

/**
 * Array containing space facts.
 */
var ELON_FACTS = [
    "Elon Musk was born in South Africa in 1971.",
    "He became famous for starting Tesla Motors and SpaceX but he first made his fortune as a co-founder of PayPal.",
    "Musk provided a large amount of inspiration for the Hollywood character Tony Stark (a.k.a. Iron Man). In fact, parts of Iron Man 2 were actually filmed inside and outside of SpaceX. Musk even has a cameo in the film!",
    "Like Steve Jobs and other famous entrepreneurs, Musk's official annual salary for Tesla Motors is just $1.",
    "At age 12, Musk taught himself computer programming and created a video game called Blastar, which he sold for $500.",
    "Elon Musk didn't become an American citizen until 2002, at age 31.",
    "When Elon Musk was 17, he moved from South Africa to Canada. Eventually, he attended college in the U.S. at the University of Pennsylvania.",
    "After graduating, Musk moved to California in order to begin graduate school in physics at Stanford University. He left Stanford after just two days, deciding instead to take advantage of the Internet boom, which was in full swing.",
    "After dropping out of grad school, Musk quickly established his first company --Zip2, which provided online newspapers with maps and business directories. He sold the company in 1999 for $307 million.",
    "In 1999, Musk co-founded X.com, an online payment company that eventually became PayPal before being acquired by eBay for $1.5 billion in stock (of which $165 million was given to Musk).",
    "Musk co-founded Tesla Motors, a company that designs and manufacturers electric sports cars. Tesla was able to succeed in the electric car market where other large manufacturers failed. He now serves as CEO and chief product architect at Tesla.",
    "The Tesla Model S was awarded a 5.4-out-of-5 safety rating from the National Highway Safety Administration, the highest rating ever given an automobile.",
    "Musk is one of the major driving forces behind SolarCity, a company founded by his cousins. He is also the largest shareholder of the company.",
    "Elon Musk also founded SpaceX (a.k.a. Space Exploration Technologies), a company that creates and manufactures space launch vehicles, with a particular focus in rocket technology. His aim is to reduce the cost of space flight in hopes of expanding human life beyond Earth.",
    "Musk initially found it impossible to get funding for SpaceX, which investors saw as a pipe dream. Musk channeled all his own money into the company to make SpaceX a reality (going against every piece of business advice ever written).",
    "SpaceX has a $1.6 billion contract with NASA to resupply (and eventually ferry people to) the International Space Station, effectively replacing the Space Shuttle.",
    "Musk has reduced the cost of reaching the International Space Station by 90%, bringing it down from $1 billion per mission to just $60 million.",
    "Musk aspires for his Falcon rocket to someday make space tourism and the colonization of Mars a realistic goal for mankind.",
    "The Falcon rocket gets its name from Star Wars' Millennium Falcon.",
    "SpaceX is the first commercial company ever to successfully recover a spacecraft from Earth's orbit, and its Dragon spacecraft is the first commercial vehicle to attach to the International Space Station.",
    "Despite his enormous recent success, both his flagship companies (SpaceX and Tesla Motors) came alarmingly close to failing. Tesla'a first electric car, the Roadster, faced an ongoing string of production problems, and SpaceX had three launch failures before its fourth and final effort was a success.",
    "Elon Musk has been married three times, having married (and subsequently divorced) British actress Talulah Riley twice.",
    "Musk has five sons (one set of twins and one set of triplets),whom he shares custody of with his first wife, Canadian fantasy author Justine Wilson.",
    "He has confessed to naming one of his sons, Xavier, after Professor Xavier of the X-Men.",
    "Elon Musk established the Musk Foundation, which is a group committed to space exploration and discovering clean energy sources. The Foundation runs the Musk Mars Desert Observatory telescope in Utah.",
    "The Musk Foundation also runs a simulated Mars environment that allows visitors to experience what life on Mars might be like (complete with waste-burning toilets).",
    "Musk has been referred to as a \"thrillionaire,\" a new class of high-tech entrepreneurs looking to use their wealth to make science-fiction dreams into a modern reality.",
    "Musk is a firm supporter of fighting global warming and working toward sustainable energy use -- he cites it as his primary incentive for founding Tesla Motors and SolarCity.",
    "Elon Musk has signed the Giving Pledge, in which pledges promise to donate the majority of their wealth to philanthropic efforts. The Giving Pledge has also been signed by Bill Gates, Sir Richard Branson, Warren Buffett, and Mark Zuckerberg, among others.",
    "Elon Musk owns Wet Nellie, a custom-built Lotus Esprit submarine car from the James Bond film, The Spy Who Loved Me.",
    "Musk was named one of the 75 most influential people of the 21st century by Esquire magazine",
    "In 2013, Musk was named Fortune's \"Businessperson of the Year\" for SpaceX, SolarCity, and Tesla Motors.",
    "On January 25, 2015, Elon Musk made a guest appearance on The Simpsons episode titled \"The Musk Who Fell to Earth,\" playing himself. Musk was a good sport about the episode, which poked fun at many of Musk's ideas.",
    "The Federation Aronautique Internationale, which is the world governing body for aerospace records, presented Musk with the FAI Gold Space Medal in 2010 for designing the first privately developed rocket to reach orbit. It's the organization's highest award (and has also been awarded to Neil Armstrong).",
    "In 2013, Musk introduced his latest endeavor -- the Hyperloop, a new form of transportation that could theoretically send people from San Francisco to Los Angeles in half an hour by way of pressurized tubes. Musk has said if no one else will build it, he will do it himself."
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
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
        var factIndex = Math.floor(Math.random() * ELON_FACTS.length);
        var randomFact = ELON_FACTS[factIndex];

        // Create speech output
        var speechOutput = randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me an Elon fact, or, you can say exit... What can I help you with?";
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
