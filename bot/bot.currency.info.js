var TelegramBot = require('node-telegram-bot-api');
var axios = require("axios");

var token = '246011169:AAGr0HtrZi6dVXRjlA1aLyyhid_Z0f44sJQ';
var bot = new TelegramBot(token, {polling: true});

var currency;

axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
		 .then(function(res){ currency = res.data });

bot.onText(/\/currency/, function (msg, match) {
  console.log('currency');
	var fromId = msg.from.id;
  var message = 
		'currency: ' + currency[0].ccy + 
      ', buy: ' + currency[0].buy + 
        ', sale: ' + currency[0].sale + '\n' + 

		'currency: ' + currency[1].ccy + 
      ', buy: ' + currency[1].buy + 
        ', sale: ' + currency[1].sale + '\n' +

		'currency: ' + currency[2].ccy + 
      ', buy: ' + currency[2].buy + 
        ', sale: ' + currency[2].sale + '\n';

  bot.sendMessage(fromId, message);
});