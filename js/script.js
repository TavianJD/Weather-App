const apiKey = "fd816c172d80713a0ddf3a52ae9eefc8";

// global variables 

var cityFormEl = document.querySelector("#city-form")
var inputCityEl = document.querySelector("#city")
var weatherBoxEl = document.querySelector(".city-display")
var citySearch = document.querySelector(".city-name")
var forecastBoxEl = document.querySelector(".fiveday")
var cityHistoryBox = document.querySelector("#past-search")


// create initial function that runs as you search for city


var citySubmitHandler = function(event) {
    event.preventDefault();

    // get value from searched input in HTML
    var city = inputCityEl.value.trim()

    // make if statement to see if they put in a correct city

    if (city) {

        forecastHandler(city);
        cityHistoryList(city);
        displayCityList();
        inputCityEl.value = "";
    } else {
        alert("Enter a valid city");
    }
    console.log(event);
}

// add function to get the forecast using the weather API #1
var forecastHandler = function(city) {

    // create variable to understand city input using query parameters
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey +"&units=imperial" + "https://cors-anywhere.herokuapp.com/" ;

    // fetch URL to return weather data about currentCity that user inputs

    fetch(queryURL)
        .then(function(response){
        response.json()
            .then(function(data){
            cityWeather(data, city)
        });
    });
};

// create function to display the weather 

var cityWeather = function(weather, searchTerm) {

    // get rid of the old content so new search can display
    weatherBoxEl.textContent = "";
    citySearch.textContent = searchTerm

    // variable for icons of weather 
    var weatherImg = "http://openweathermap.org/img/wn/" + weather.weather[0].icon + ".png";


    // use moment to display the date 
    var currentDate = moment().format("L");
    var dateToday = document.querySelector("#date-today");
    dateToday.textContent = currentDate

    var weatherImgEl = document.querySelector("#weather-img");
    weatherBoxEl.innerHTML = `<img src=${weatherImg}>`;

    // grab temperature

    var tempEl = document.createElement("p");
    tempEl.textContent = ("Temp: " + (weather.main.temp) + " " + '\xB0' + "F");
    weatherBoxEl.appendChild(tempEl)


    // grab wind speed
    var windEl = document.createElement("p");
    windEl.textContent = ("Wind: " + weather.wind.speed + " mph");
    weatherBoxEl.appendChild(windEl);

    // grab humidity

    var humidityEl = document.createElement("p");
    humidityEl.textContent = ("Humidity:" + weather.main.humidity + '\u0025')
    weatherBoxEl.appendChild(humidityEl);

    var apiUrl2 = "http://api.openweathermap.org/data/2.5/onecall?lat=" + weather.coord.lat + "&lon=" + weather.coord.lon + "&appid=" + apiKey + "&units=imperial";

        console.log(weatherBoxEl)

        fetch(apiUrl2)
        .then(function (response2) {
            response2.json()
            .then(function(data2){
                futureWeather(data2)
                ultraEl = document.createElement("p");
                ultraEl.textContent = ("UV index: " + data2.current.uvi);
                weatherBoxEl.appendChild(ultraEl);
                
            })
        });
};

var futureWeather = function(data2) {
        // create a loop to display the five day forecast and create all the elements and cards for the forecast
        console.log(data2)
        // make sure noth8ing in the box
        forecastBoxEl.textContent = "";

        for (let day = 0; day < 5; day++){


            // need the icons for each day of the week for forecast
            const futureIcon = "http://openweathermap.org/img/wn/" + data2.daily[day].weather[0].icon + ".png";

            // dynamically create each card for each future forecast day

            const fiveDayForecast = document.createElement("div");
            // setting an Id for the newly created div
            fiveDayForecast.setAttribute("id", day)
            // setting a class for newly created div and using bootstrap to add column class

            fiveDayForecast.setAttribute("class", "col")
            // appending the new div "child" to the forecastBox in HTML 
            forecastBoxEl.appendChild(fiveDayForecast)

            // we want the icon, date, temp, wind speed, and humidity to each forecast card

            // grab icon

            var futureImg = document.createElement("img")
            futureImg.setAttribute("src", futureIcon)
            fiveDayForecast.appendChild(futureImg)

            // grab date
            // use moment to display date and add 1 to display the next day then the loop does the rest

            var futureDate = moment().add(day+1, "days").format("L");
            var displayFutureDate = document.createElement("h2");
            displayFutureDate.textContent = futureDate;
            fiveDayForecast.appendChild(displayFutureDate);

            // grab temperature
            var futureTempEl = document.createElement("p");
            futureTempEl.textContent = ("Temp: " + Math.round(data2.daily[day].temp.day) + " " + '\xB0' + "F");
            fiveDayForecast.appendChild(futureTempEl);

            // grab wind speed

            var futureWind = document.createElement("p");
            futureWind.textContent = ("Wind: " + data2.daily[day].wind_speed + "mph");
            fiveDayForecast.appendChild(futureWind)

            // grab humidity

            var futureHumidityEl = document.createElement("p");
            futureHumidityEl.textContent = ("Humidity: " + data2.daily[day].humidity + "%");
            fiveDayForecast.appendChild(futureHumidityEl)

        };
    };


    // create funcction to save cities

    var cityHistoryList = function(cityName) {

        var savedCities = JSON.parse(localStorage.getItem("past-search")) || [];

        savedCities.push(cityName);
        localStorage.setItem("past-search", JSON.stringify(savedCities));
    }

    var displayCityList = function(){

        cityHistoryBox.textContent = "";

        var savedCities = JSON.parse(localStorage.getItem("past-search")) || [];


        for (let i = 0; i < savedCities.length; i++) {
            var insertCity = document.createElement("button");
            insertCity.textContent = savedCities[i];
            insertCity.setAttribute("id", "city" + i);
            insertCity.setAttribute("class", "mt-3");
            insertCity.type = "button";
            cityHistoryBox.appendChild(insertCity);
            insertCity.onclick = cityClick
        };
    };

    var cityClick = function() {
        forecastHandler(this.textContent);
    };


    displayCityList();



    cityFormEl.addEventListener("submit", citySubmitHandler)