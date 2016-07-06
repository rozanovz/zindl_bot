var axios = require("axios");

var currency;
axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
     .then(function(res){ currency = res.data });

module.exports = function ConvertCurrency(txt, action){
  console.log('action');
  var originalMsg = txt.split(' ');
  var curr = originalMsg[1];
  var money = originalMsg[2];
  
  switch(curr){
    case 'USD':
      money = 'UAH ' + (money * currency[0][action]);
      break;

    case 'EUR':
      money = 'UAH ' + (money * currency[1][action]);
      break;

    case 'RUR':
      money = 'UAH ' + (money * currency[2][action]);
      break;
  }

  return money;
}