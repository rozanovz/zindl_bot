var TelegramBot = require('node-telegram-bot-api');

var token = '246011169:AAGr0HtrZi6dVXRjlA1aLyyhid_Z0f44sJQ';
var bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, function (msg, match) {
  console.log('start');
  var fromId = msg.from.id;
  bot.sendMessage(fromId, 'Hi, I can convert money for you here 1.0');
});

require('./bot.currency.convert');
require('./bot.currency.info');
require('./bot.inline');
require('./bot.uah.covert.js');