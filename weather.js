const weather = {
    apiKey: "67b92f0af5416edbfe58458f502b0a31",
    fetchWeather: function(city) {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}` 
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data))
        .catch((error) => {
            alert("City not found. Please try again.");
        });
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".location").textContent = `${name}`;
        document.querySelector(".temperature").textContent = `${temp}°C`;
        document.querySelector(".weather-description").textContent = description;
        document.querySelector(".humidity").textContent = `${humidity}%`;
        document.querySelector(".wind-speed").textContent = `${speed} kmph`;

        //change background image based on city
        // document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function() {
        const city = document.querySelector(".city-search").value.trim();
        if(city) { this.fetchWeather(city); }
    }
};

//Event listeners
document.querySelector("button").addEventListener("click", function() { weather.search(); });

document.querySelector(".city-search").addEventListener("keyup", function(event) {
    if(event.key === "Enter") {
        weather.search();
        this.value = "";
    }
});

//Initialise with default city
weather.fetchWeather("Mumbai");