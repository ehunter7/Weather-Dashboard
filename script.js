$(document).ready(function () {
  //   OpenWeather api key
  //  55165c51eb244bc563baf90a2d02b714
  //  OpenWeather current weather url
  //  https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  //  five day forcast url
  //api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid=55165c51eb244bc563baf90a2d02b714
  //variables for ajax call
  var localCity = JSON.parse(localStorage.getItem("city"));

  //function to covert json date
  function formatJSONDate(jsonDate) {
    var newDate = moment.unix(jsonDate);
    return newDate.format("MM/DD/YYYY");
  }
  //function to convert kelvin to fahrenheit
  function convertKelvinToFahrenheit(getTemp) {
    var inFahrenheit = ((getTemp - 273.15) * 1.8 + 32).toFixed(1);
    return inFahrenheit;
  }
  //localstorage
  var storeCity = function (newCity) {
    //load it at first from localstorage

    try {
      localCity = JSON.parse(localStorage.getItem("city"));
      if (localCity == null) localCity = [];
    } catch (ex) {
      console.log("something wrong");
      localCity = []; //fallback
    }
    for(var x = 0; x < localCity.length; x++){
      if(localCity[x].name === newCity){ localCity.splice(x, 1);}
    }
    if(localCity.length === 10){ localCity.shift();}
    localCity.push({ name: newCity }); //this is an array
    //insert the array with JSON.stringify so you can take it later out and rework with it
    localStorage.setItem("city", JSON.stringify(localCity));
    getlocalstorage();
  };
  //Function renders buttons from localStorage
  function getlocalstorage() {
    $(".localCities").empty();
    console.log(localCity);
    $.each(localCity, function (item) {
      var addCity = $("<button>")
        .addClass("storedCity")
        .text(localCity[item].name);
      console.log(localCity[item].name);
      $(".localCities").prepend(addCity);
    });
  }
  //displays data
  function getData(cityName){
    storeCity(cityName);
    //empty out elements
    $(".cityDetails").empty();
    $("#searchInput").val("");
    $("#forecast").empty();
    var lon;
    var lat;
    var queryURLcur = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=55165c51eb244bc563baf90a2d02b714`;
    $.ajax({
      url: queryURLcur,
      method: "GET",
    }).then(function (response) {
      lon = response.coord.lon;
      lat = response.coord.lat;
      var cityName = $("<h4>").text(response.name);
      $(".cityDetails").append(cityName);

      var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=55165c51eb244bc563baf90a2d02b714`;
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (response) {
        console.log(response);
        var curDate = $("<h4>").text(formatJSONDate(response.current.dt));
        var iconUrl =
          "http://openweathermap.org/img/w/" +
          response.current.weather[0].icon +
          ".png";
        var icon = $("<img>").attr("src", iconUrl);

        cityName.append(curDate);
        curDate.append(icon);

        //city current temp
        var curTemp = $("<p>").text(
          `Temperature: ${convertKelvinToFahrenheit(response.current.temp)} °F`
        );
        $(".cityDetails").append(curTemp);

        //city current humidity
        var humid = $("<p>").text(`Humidity: ${response.current.humidity}%`);
        $(".cityDetails").append(humid);

        //city current wind speed
        var windSpeed = $("<p>").text(
          `Wind Speed: ${response.current.wind_speed} MPH`
        );
        $(".cityDetails").append(windSpeed);

        //city current uv index
        var uvIndex = $("<p>")
          .addClass("uvIndex")
          .text(`UV Index: ${response.current.uvi}`);
          $(".cityDetails").append(uvIndex);
        //5 day
        for (var x = 1; x < 6; x++) {
          var day = $("<div>").addClass("forecastDay");
          var date = $("<h5>").text(formatJSONDate(response.daily[x].dt));

          var forecastIconUrl =
            "http://openweathermap.org/img/w/" +
            response.daily[x].weather[0].icon +
            ".png";
          var forecastIcon = $("<img>").attr("src", forecastIconUrl);
          var forecastTemp = $("<p>").text(
            `Temp: ${convertKelvinToFahrenheit(response.daily[x].temp.day)} °F`
          );
          var forecastHumidity = $("<p>").text(
            `Humidity: ${response.daily[x].humidity} %`
          );
          day.append(date, forecastIcon, forecastTemp, forecastHumidity);
          $("#forecast").append(day);
        }
      });
    });
  }
  getlocalstorage();

  //Event listener when previously searched city is selected
  $(document).on("click", ".storedCity", function (event) {
    // event.preventDefault();
    getData(this.textContent);
  });

  //Evenet Listener when search button or enter key is pressed
  $("#searchBtn").click(function (event) {
    event.preventDefault();

    var cityName = $("#searchInput").val();
    getData(cityName);

  });
});
