var TelegramBot = require('node-telegram-bot-api');
var axios = require("axios");

var token = '246011169:AAGr0HtrZi6dVXRjlA1aLyyhid_Z0f44sJQ';
var bot = new TelegramBot(token, {polling: true});

var currency;

axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
		 .then(function(res){ currency = res.data });

bot.onText(/\/uah (.+)/, function (msg, match) {
  console.log('fromUAH');
	var fromId = msg.from.id;
  var originalMsg = msg.text.split(' ');
  var curr = originalMsg[3];
  var money = originalMsg[1];
  
  switch(curr){
  	case 'USD':
  		money = 'UAH ' + (money / currency[0].sale);
  		break;

  	case 'EUR':
  		money = 'UAH ' + (money / currency[1].sale);
  		break;

  	case 'RUR':
  		money = 'UAH ' + (money / currency[2].sale);
  		break;
  }

  bot.sendMessage(fromId, money);
});
