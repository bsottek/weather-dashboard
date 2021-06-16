var currentWeatherEl = $("#current-weather-container");
var searchTerm = $("#city-input")[0];
var userInputForm = $("#user-input-container");

var formSubmitHandler = function (event) {
    event.preventDefault();

    // get value from input el
    var city = searchTerm.value.trim();
    console.log(city);

    if (city) {
        getWeather(city);
        searchTerm.value = "";
    } else {
        alert("Please enter a city name.");
    }
};

var getWeather = function (city) {
    var forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + city + "&appid=55cf0d027cab4d7a79401c5b5d887776";
    var currentApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + city + "&appid=55cf0d027cab4d7a79401c5b5d887776"
    fetch(forecastApiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayForecastWeather(data, city);
                weatherHistory(city);
            });
        } else {
            alert("Error: City not found.");
        }
    })
        .catch(function (error) {
            alert("Unable to connect to weather service.");
        })
    fetch(currentApiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayCurrentWeather(data, city);
            });
        } else {
            alert("Error: City not found.");
        }
    })
        .catch(function (error) {
            alert("Unable to connect to weather service.");
        })
};

var displayCurrentWeather = function (weather, searchTerm) {
    if (weather.length === 0) {
        currentWeatherEl.textContent = "City not found.";
        return
    }

    // fill in current weather container
    currentValue = $(".current-value");

    // clear current values
    currentValue.text("");

    // get and add current values
    $("#current-city-title").text(weather.name);
    $("#temp-value").text(weather.main.temp + " F");
    $("#wind-value").text(weather.wind.speed + " MPH");
    $("#humidity-value").text(weather.main.humidity + "%");

};

var displayForecastWeather = function(weather, searchTerm){
    console.log(weather);

    for(var i = 4; i < 37; i += 8){
        var day = weather.list[i];

        var cardEl = document.createElement("div");
        cardEl.classList.add("col-2", "card", "text-white", "bg-dark", "mr-2", "mt-2", "cardEl");

        var cardHeaderEl = document.createElement("div");
        cardHeaderEl.classList.add("card-header");
        cardHeaderEl.textContent = (day.dt_txt.substr(0,10));
        cardEl.appendChild(cardHeaderEl);

        // var cardIconEl = document.createElement("span");
        // cardIconEl.style.backgroundImage = (`'http://openweathermap.org/img/wn/` + day.weather[0].icon + `@2x.png`);
        // cardHeaderEl.appendChild(cardIconEl);

        var cardTempEl = document.createElement("p");
        cardTempEl.textContent = ("Temp: " + day.main.temp + " F");
        cardEl.appendChild(cardTempEl);

        var cardWindEl = document.createElement("p");
        cardWindEl.textContent = ("Wind: " + day.wind.speed + " MPH");
        cardEl.appendChild(cardWindEl);

        var cardHumidityEl = document.createElement("p");
        cardHumidityEl.textContent = ("Humidity: " + day.main.humidity + "%");
        cardEl.appendChild(cardHumidityEl);

        document.getElementById("forecast-card-container").appendChild(cardEl);


    }

}

var weatherHistory = function(city){
    var cityEl = document.createElement("button");
    cityEl.classList.add("btn", "btn-secondary", "btn-block", "mt-2", "mb-2", "history-button");
    cityEl.textContent = city.toUpperCase().trim();
    document.getElementById("history-container").appendChild(cityEl);
}

userInputForm.on("submit",formSubmitHandler);