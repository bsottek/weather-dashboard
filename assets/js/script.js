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
    $("#temp-value").text(weather.main.temp);
    $("#wind-value").text(weather.wind.speed);
    $("#humidity-value").text(weather.main.humidity);

    // // loop over days to create forecast cards
    // for (var i = 0; i < weather.length; i++) {
    //     // format city name
    //     var cityName = weather[i].city.name;

    //     // create container for each day
    //     var forecastCardEl = document.createElement("div");
    //     forecastCardEl.classList = "col-2 card text-white bg-dark";

    //     // create span to hold repo name
    //     var titleEl = document.createElement("span");
    //     titleEl.textContent = cityName;

    //     // append to container
    //     forecastCardEl.appendChild(titleEl);

    //     // create status element
    //     var statusEl = document.createElement("span");
    //     statusEl.classList = "flex-row align-center";

    //     // check if repo has issues
    //     if (repos[i].open_issues_count > 0) {
    //         statusEl.innerHTML =
    //             "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
    //     } else {
    //         statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    //     }

    //     // append to container
    //     forecastCardEl.appendChild(statusEl);

    //     // append container to DOM
    //     repoContainerEl.appendChild(forecastCardEl);
    // }
}

userInputForm.on("submit",formSubmitHandler);