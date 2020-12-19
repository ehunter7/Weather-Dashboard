$(document).ready(function(){
    //   OpenWeather api key
//  55165c51eb244bc563baf90a2d02b714
    //  OpenWeather current weather url
//  https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//  five day forcast url
//  https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=55165c51eb244bc563baf90a2d02b714
//variables for ajax call

//function to covert json date
function formatJSONDate(jsonDate) {
    var newDate = Date(jsonDate, "mm/dd/yyyy");
    return newDate;
  }
//event listener when search input is entered

var cityName = "Eastvale";
var queryURLcur = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=55165c51eb244bc563baf90a2d02b714`

$.ajax({
    url: queryURLcur,
    method: "GET"
}).then(function(response){
    console.log(response);
        //city name and date with a cloud
        console.log(response.name);
        var cityName = $("<h4>").text(response.name);
        console.log(curDate);
        var curDate = $("<h4>").text(formatJSONDate(response.dt));
        var cloud = $("<div>").text(response.weather[0].icon);
        $("#cityInfo").append(cityName, curDate, cloud);
        //need to get elements to align horizontaly////////////////////////////////
        
           //city current temp

})



var queryURL5Day = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=55165c51eb244bc563baf90a2d02b714`

//ajax call
$.ajax({
    url: queryURL5Day,
    method: "GET"
}).then(function(response){
    console.log(response);

    

 
})

})