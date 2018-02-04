var Botkit = require('botkit');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var controller = Botkit.slackbot({
  debug: false
});

controller.spawn({
  token: "xoxb-308830400592-dDwjYrx7c5tBNRNHZQ93gVje" // your API key here
}).startRTM(function (err) {
  if (err) {
    throw new Error(err);
  }
});
/*
controller.hears(['hello', 'hi'], ['ambient', 'direct_mention', 'mention'], function (bot, message) {
  bot.reply(message, "Hello.");
});
*/
controller.on('ambient', function(bot, message) {
    //bot.reply(message, "I heard... something!");
	var xhttp = new XMLHttpRequest();
	
	var lang = "en-fr";
	var text = message.raw_message.text;
	var link = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170312T182402Z.bdb6b677d43fcdc5.a76f1ca4719f8f58aa8227869f4623a6e115a326&text="+text+"&lang="+lang+"&[format=plain]";
    var LINK = encodeURI(link);
	xhttp.open("POST", LINK, false);
    //xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
	
    var response = JSON.parse(xhttp.responseText);
	if(xhttp.status == 200){
		bot.reply(message, response.text[0]);
	}//else{
		//error
	//}
});

controller.on('bot_channel_join',function(bot,message) {
  bot.reply(message, "I should be telling you how to change languages via slash commands");
});

