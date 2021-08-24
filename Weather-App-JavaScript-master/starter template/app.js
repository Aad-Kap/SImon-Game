// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

const iconElement = document.querySelector(".weather-icon");
const notificationElement = document.querySelector(".notification");
const tempElement = document.querySelector(".temperature-value p");
const descriptionElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");

//app data

const weather = {};

weather.temperature={

    unit: "celsius"

}

//consts
const KELVIN = 273;
//api key
const key = "997381b8426744d7324be1bc2d936783";

//check for geolocation in browser
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display= "block";
    notificationElement.innerHTML= "<p> Browser does not support geolocation </p>";
}

//set users position
function setPosition(position){
    let latitude= position.coords.latitude;
    let longitude= position.coords.longitude;

    getWeather(latitude,longitude);

}

//error with geolocation
function showError(error){
    notificationElement.style.display= "block";
    notificationElement.innerHTML= `<p> ${error.message} </p>`;

}

//get weather from api
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;

        })
        .then(function(){
            displayWeather();
        })
}

//display weather
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
    descriptionElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

//C to F temp
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

//click on temp
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        Math.floor(fahrenheit);

        tempElement.innerHTML= `${fahrenheit}° <span> F </span>`;
        weather.temperature.unit = "fahrenheit";

    }else{
        tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
        weather.temperature.unit= "celsius";
    }
});