$(document).ready(function () {
  //   OpenWeather api key
  //  55165c51eb244bc563baf90a2d02b714
  //  OpenWeather current weather url
  //  https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  //  five day forcast url
//api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid=55165c51eb244bc563baf90a2d02b714
  //variables for ajax call

  //function to covert json date
  function formatJSONDate(jsonDate) {
    var newDate = moment.unix(jsonDate);
    return newDate.format("MM/DD/YYYY");
  }
  //function to convert kelvin to fahrenheit
  function convertKelvinToFahrenheit(getTemp){
    var inFahrenheit = ((getTemp - 273.15) * 1.8 + 32).toFixed(1);
    return inFahrenheit;
  }

  //event listener when search input is entered

  var cityName = "Eastvale";
  var queryURLcur = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=55165c51eb244bc563baf90a2d02b714`;

  $.ajax({
    url: queryURLcur,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    //city name and date with a cloud
    console.log(response.name);
    var cityName = $("<h4>").text(response.name);
    var curDate = $("<h4>").text(formatJSONDate(response.dt));
    var iconUrl =
      "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
    var icon = $("<img>").attr("src", iconUrl);
    $("#cityInfo").append(cityName);
    cityName.append(curDate);
    curDate.append(icon);
    //need to get elements to align horizontaly////////////////////////////////

    //city current temp
    var curTemp = $("<p>").text(`Temperature: ${convertKelvinToFahrenheit(response.main.temp)} °F`);
    $("#cityInfo").append(curTemp);

    //city current humidity
    var humid = $("<p>").text(`Humidity: ${response.main.humidity}%`);
    $("#cityInfo").append(humid);

    //city current wind speed
    var windSpeed = $("<p>").text(`Wind Speed: ${response.wind.speed} MPH`);
    $("#cityInfo").append(windSpeed);

    //city current uv index
    //where the fuck is the UV index
  });
  // 5 day forecast api call
  var queryURL5Day = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&cnt=5&appid=55165c51eb244bc563baf90a2d02b714`;
for( var x = 0; x < 5; x++){
  const index = x;
  //ajax call
  $.ajax({
    url: queryURL5Day,
    method: "GET",
  }).then(function (forecastResponse) {
    console.log(forecastResponse);
    var day = $("<div>").addClass("forecastDay");
    $("#forecast").append(day);
    var date = $("<h5>").text(formatJSONDate(forecastResponse.list[index].dt));
    var forecastIconUrl =
    "http://openweathermap.org/img/w/" + forecastResponse.list[index].weather[0].icon + ".png";
    var forecastIcon = $("<img>").attr("src", forecastIconUrl);
    var forecastTemp = $("<p>").text(`Temp: ${convertKelvinToFahrenheit(forecastResponse.list[index].main.temp)} °F`);
    var forecastHumidity = $("<p>").text(`Humidity: ${forecastResponse.list[index].main.humidity} %`)
    day.append(date, forecastIcon, forecastTemp, forecastHumidity);
  });
};
});
