var apiKey = "9337eaf27d3f41018c84cfdc30f03a51";

var cityInput = document.querySelector("#search-input");
var searchBtn = document.querySelector("#city-search button");
var tempEl = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humidityEl = document.getElementById("humidity");
var uvEl = document.getElementById("UV");
var forecastDiv = document.getElementById("forecast");
var weatherDashboard = document.getElementById("cityname");
var date = new Date().toUTCString().slice(5, 16);

function weatherFunction(city) {
  var apiParams = new URLSearchParams({
    key: apiKey,
    city,
    units: "I",
  });
  var currentweatherAPI = "https://api.weatherbit.io/v2.0/current?" + apiParams;

  fetch(currentweatherAPI)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      currentWeather(data);
      console.log(data);
    });

  var currentWeather = function (current) {
    var weatherIcon = document.createElement("img");
    weatherIcon.src =
      "https://www.weatherbit.io/static/img/icons/" +
      current.data[0].weather.icon +
      ".png";

    var cityName = document.getElementById("cityname");
    cityName.textContent = current.data[0].city_name + " " + date;

    tempEl.textContent = current.data[0].temp + "°F";
    windEl.textContent = current.data[0].wind_spd + "MPH";
    humidityEl.textContent = current.data[0].rh + "%";
    uvEl.textContent = current.data[0].uv + "+";
    cityName.appendChild(weatherIcon);
  };

  var forecastweatherAPI =
    "https://api.weatherbit.io/v2.0/forecast/daily?" + apiParams;

  fetch(forecastweatherAPI)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      forecastWeather(data);
      console.log(data);
    });

  var forecastWeather = function (forecast) {
    console.log(forecast);
    for (let i = 1; i < 6; i++) {
      var cardIcon = document.createElement("img");
      cardIcon.src =
        "https://www.weatherbit.io/static/img/icons/" +
        forecast.data[i].weather.icon +
        ".png";

      var icon = document.getElementById("icon" + [i]);
      var cardTitle = document.getElementById("date" + [i]);
      var forecastTemp = document.getElementById("temp" + [i]);
      var forecastWind = document.getElementById("wind" + [i]);
      var forecastHumidity = document.getElementById("humidity" + [i]);

      cardTitle.textContent = "Forecast: " + forecast.data[i].valid_date;

      forecastTemp.textContent = "Temperature: " + forecast.data[i].temp + "°F";

      forecastWind.textContent = "Wind: " + forecast.data[i].wind_spd + "MPH";

      forecastHumidity.textContent = "Humidity: " + forecast.data[i].rh + "%";
    }
  };
}
searchBtn.addEventListener("click", function () {
  var city = cityInput.value;
  weatherFunction(city);

  var saveSection = document.getElementById("saved-cities");
  var liEL = document.createElement("li");
  var searchSaveBtn = document.createElement("button");

  saveSection.append(liEL);
  liEL.append(searchSaveBtn);

  searchSaveBtn.textContent = cityInput.value;
  searchSaveBtn.addEventListener("click", function () {
    weatherFunction(city);
  });
});
