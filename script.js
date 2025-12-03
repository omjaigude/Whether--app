const API_KEY = "6527475ec7a7fa60c1fec6fc879a2187";

// Event listeners for buttons
document.getElementById("searchBtn").addEventListener("click", getWeather);
document.getElementById("locBtn").addEventListener("click", getLocationWeather);

// Get weather by city name
function getWeather() {
    const city = document.getElementById("cityInput").value.trim();

    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    fetchWeather(url);
}


// Get weather by geolocation
function getLocationWeather() {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

            fetchWeather(url);
        },
        () => {
            alert("Unable to get your location.");
        }
    );
}


// Api call and fetch weather data
function fetchWeather(url) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log("Weather API Response:", data);

            if (data.cod === "404") {
                alert("City not found!");
                return;
            }

            if (data.cod !== 200) {
                alert("Something went wrong. Try again!");
                return;
            }

            updateUI(data);
        })
        .catch(() => {
            alert("Network error or invalid request.");
        });
}

// Update UI with fetched data
function updateUI(data) {
    document.getElementById("location").textContent = data.name;
    document.getElementById("localtime").textContent = new Date().toLocaleString();
    document.getElementById("temp_c").textContent = Math.round(data.main.temp);
    document.getElementById("feelslike_c").textContent = Math.round(data.main.feels_like);
    document.getElementById("humidity").textContent = data.main.humidity;
    document.getElementById("condition").textContent = data.weather[0].description;

    // const iconCode = data.weather[0].icon;
    // document.getElementById("icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// default weather on load
getWeatherByCity("Mumbai");
function getWeatherByCity(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    fetchWeather(url);
}
