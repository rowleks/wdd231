import {
  createBusinessCard,
  fetchBusinesses,
  fetchWeather,
  createCurrentWeatherInfo,
  createForecastInfo,
} from "./utils";

const nav = document.getElementById("nav");
const menu = document.getElementById("menu");
const directories = document.getElementById("directory");
const buttons = document.querySelectorAll(".view-buttons button");
const currentWeather = document.getElementById("current-weather");
const forecastContainer = document.getElementById("weather-forecast");

document.getElementById("currentyear").innerHTML = new Date().getFullYear();

document.getElementById(
  "lastModified"
).innerHTML = `Last Modification: ${document.lastModified}`;

// Weather API setup

const API_KEY = "928baf53f34be0d716c884614e720892";
const LON = 7.49;
const LAT = 9.07;

menu.addEventListener("click", () => {
  nav.classList.toggle("active");
  menu.classList.toggle("show");
});

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    buttons.forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
    if (e.target.id === "grid") {
      showList("grid-view", "list-view");
    } else {
      showList("list-view", "grid-view");
    }
  });
});

displayBusinesses();
displayCurrentWeather();
displayWeatherForecast();

// Helper functions

function showList(show, hide) {
  directories.classList.remove(hide);
  directories.classList.add(show);
}

async function displayBusinesses() {
  const businesses = await fetchBusinesses();
  businesses.forEach((business) => {
    const card = createBusinessCard(business);
    directories.appendChild(card);
  });
}

async function displayCurrentWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`;
  const weatherData = await fetchWeather(url);
  if (weatherData) {
    const info = createCurrentWeatherInfo(weatherData);
    currentWeather.innerHTML = "";
    currentWeather.appendChild(info);
  } else {
    currentWeather.innerHTML = "<span>Unavailable to fetch data</span>";
  }
}

async function displayWeatherForecast() {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`;
  const forecastData = await fetchWeather(url);
  if (forecastData) {
    const info = createForecastInfo(forecastData);
    forecastContainer.innerHTML = info;
  } else {
    forecastContainer.innerHTML = "<b>Unavailable to fetch data</b>";
  }
}
