var TelegramBot = require('node-telegram-bot-api');
var ConvertCurrency = require('./utils/convert.currency');

var token = '246011169:AAGr0HtrZi6dVXRjlA1aLyyhid_Z0f44sJQ';
var bot = new TelegramBot(token, {polling: true});

bot.onText(/\/sell (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  bot.sendMessage(fromId, ConvertCurrency(msg.text, 'sell'));
});

bot.onText(/\/buy (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  bot.sendMessage(fromId, ConvertCurrency(msg.text, 'buy'));
});