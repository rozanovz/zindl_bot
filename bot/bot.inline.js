var TelegramBot = require('node-telegram-bot-api');
var axios = require("axios");

var token = '246011169:AAGr0HtrZi6dVXRjlA1aLyyhid_Z0f44sJQ';
var bot = new TelegramBot(token, {polling: true});

var currency;

axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
		 .then(function(res){ currency = res.data });

bot.getMe().then(function (me) {
  console.log('Hi my name is %s!', me.username);
});

bot.on('inline_query', function(msg, mathc){
  bot.answerInlineQuery(msg.id, [{
    type: 'article',
    id: '1',
    title: 'Convert money option',
    input_message_content:{
       message_text: msg.query ? msg.query : 'customMessage'
    }
  }]);
});

bot.on('chosen_inline_result', function(params){
  console.log('chosen!!');
  bot.sendMessage(params.from.id, params.query);
});