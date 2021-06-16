var TelegramBot=require("node-telegram-bot-api");
var token='1809499118:AAEF057Q9gecUuJVOZeKBAnjy0sX1eaWBjk';
var bot=new TelegramBot(token,{polling:true});
var request =require('request')

bot.onText(/\/echo(.+)/,function(msg,match) {
    var chatId= msg.chat.id;
    var echo=match[1];
    bot.sendMessage(chatId,echo);
});


bot.onText(/\/movie(.+)/,function(msg,match) {
    var chatId= msg.chat.id;
    var movie=match[1];
    request(`http://www.omdbapi.com/?apikey=ba7ba451&t=${movie}`,function(error,response,body){
        if(!error && response.statusCode == 200){
            bot.sendMessage(chatId,'_ Looking for _ ' + movie + '...',{parse_mode:"Markdown"})
            .then(function(msg){
                var res=JSON.parse(body);
                // bot.sendMessage(chatId,);
                bot.sendPhoto(chatId,res.Poster,{caption: 'Result: \nTitle: ' +res.Title + '\nYear: ' +res.Year + '\nRated: '+res.Rated + '\nReleased: '+res.Released+ '\n'})
            })    
        }
    })
    
});


bot.onText(/\/weather(.+)/,function(msg,match) {
    var chatId= msg.chat.id;
    var weather=match[1];
    var YOUR_ACCESS_KEY= '5b85d28c708ccfaee3bec3db1dff91cd';
    request(`http://api.weatherstack.com/current?access_key=5b85d28c708ccfaee3bec3db1dff91cd&query=${weather}`,function(error,response,body){
        if(!error && response.statusCode==200){
            var res=JSON.parse(body);
            bot.sendMessage(chatId,'Result \nName: '+res.location.name +'\ncountry: '+res.location.country +'\nState: '+res.location.region+'\nLatitude: '+res.location.lat+'\nLongitude: '+res.location.lon+'\nCurrentTemperature: '+res.current.temperature+'\nUnit: '+res.request.unit+'\nWeatherDescription: '+res.current.weather_descriptions+'\nWind Speed: '+res.current.wind_speed+'\nWindDegree: '+res.current.wind_degree+'\nPressure: '+res.current.pressure);
        }
    })
});