var TelegramBot = require('node-telegram-bot-api');
var axios = require("axios");

var token = '246011169:AAGr0HtrZi6dVXRjlA1aLyyhid_Z0f44sJQ';
var bot = new TelegramBot(token, {polling: true});

var currency;

axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
			.then(function(res){
				currency = res.data
			});

bot.getMe().then(function (me) {
  console.log('Hi my name is %s!', me.username);
});

bot.onText(/\/currency (.+)/, function (msg, match) {
  console.log('currency');
	var fromId = msg.from.id;
  var resp = match[1];
  var message = 
		'currency: ' + currency[0].ccy + ', buy: ' + currency[0].buy + ', sale: ' + currency[0].sale + '\n' + 
		'currency: ' + currency[1].ccy + ', buy: ' + currency[1].buy + ', sale: ' + currency[1].sale + '\n' +
		'currency: ' + currency[2].ccy + ', buy: ' + currency[2].buy + ', sale: ' + currency[2].sale + '\n';
  bot.sendMessage(fromId, message);
});

bot.on('inline_query', function(msg){
  console.log('inline query');
});

bot.onText(/\/fromUAH (.+)/, function (msg, match) {
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

bot.onText(/\/sell (.+)/, function (msg, match) {
  console.log('sell');
	var fromId = msg.from.id;
  var originalMsg = msg.text.split(' ');
  var curr = originalMsg[1];
  var money = originalMsg[2];
  
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

bot.onText(/\/buy (.+)/, function (msg, match) {
  console.log('buy');
	var fromId = msg.from.id;
  var originalMsg = msg.text.split(' ');
  var curr = originalMsg[1];
  var money = originalMsg[2];
  
  switch(curr){
  	case 'USD':
  		money = 'UAH ' + (money * currency[0].buy);
  		break;

  	case 'EUR':
  		money = 'UAH ' + (money * currency[1].buy);
  		break;

  	case 'RUR':
  		money = 'UAH ' + (money * currency[2].buy);
  		break;
  }

  bot.sendMessage(fromId, money);
});