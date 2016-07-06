var TelegramBot = require('node-telegram-bot-api');

var token = '246011169:AAGr0HtrZi6dVXRjlA1aLyyhid_Z0f44sJQ';
var bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, function (msg, match) {
  console.log('start');
  var fromId = msg.from.id;
  bot.sendMessage(fromId, 'Hi, I can convert money for you here 1.0');
});

bot.onText(/\/help/, function (msg, match) {
  console.log('help');
  var fromId = msg.from.id;

  var message = 
  'type /help for help \n' + 
  'type /buy <currency name> <ammount> for get how much hryvnas you will need  for buing <ammount> \n' + 
  'type /sell <currency name> <ammount> for get how much hryvnas you will receive for selling <ammount> \n' + 
  'type /sell <currency name> <ammount> for get how much hryvnas you will receive for selling <ammount> \n' + 
  'type /uah <ammount> to <currency name> for get how much <currency name> you will receive for selling <ammount> ';

  bot.sendMessage(fromId, message);
});

require('./bot.currency.convert');
require('./bot.currency.info');
require('./bot.inline');
require('./bot.uah.covert.js');