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

async function displayBusinesses() {
  const businesses = await fetchBusinesses();
  businesses.forEach((business) => {
    const card = createBusinessCard(business);
    directories.appendChild(card);
  });
}
displayBusinesses();
displayCurrentWeather();
displayWeatherForecast();

// Helper functions

function showList(show, hide) {
  directories.classList.remove(hide);
  directories.classList.add(show);
}

function createBusinessCard(business) {
  const card = document.createElement("section");
  card.classList.add("business-card");

  const logo = document.createElement("img");
  logo.src = `${business.image}`;
  logo.alt = `${business.name} Logo`;
  logo.width = 150;
  logo.height = 150;
  logo.loading = "lazy";
  card.appendChild(logo);

  const name = document.createElement("h2");
  name.textContent = business.name;
  name.style.marginBottom = "0.5em";
  card.appendChild(name);

  const address = document.createElement("p");
  address.textContent = business.address;
  card.appendChild(address);

  const phone = document.createElement("p");
  phone.classList.add("phone");
  phone.textContent = business.phone;
  card.appendChild(phone);

  const website = document.createElement("a");
  website.href = business.website;
  website.textContent = "Visit Website";
  website.target = "_blank";
  website.rel = "noopener noreferrer";
  card.appendChild(website);

  return card;
}

async function fetchBusinesses() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

async function fetchWeather(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

async function displayCurrentWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`;
  const weatherData = await fetchWeather(url);
  if (weatherData) {
    const temp = weatherData.main.temp.toFixed(0);
    const description = weatherData.weather[0].description;
    const humidity = weatherData.main.humidity;
    const high = weatherData.main.temp_max.toFixed(0);
    const low = weatherData.main.temp_min.toFixed(0);
    const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(
      [],
      { hour: "2-digit", minute: "2-digit" }
    );
    const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(
      [],
      { hour: "2-digit", minute: "2-digit" }
    );
    const iconCode = weatherData.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const iconImg = document.createElement("img");
    iconImg.src = iconUrl;
    iconImg.alt = description;
    iconImg.width = 100;
    iconImg.height = 100;
    iconImg.loading = "lazy";

    const tempInfo = document.createElement("div");
    tempInfo.classList.add("current-temp-info");
    tempInfo.innerHTML = `<p><b>${temp}</b>°C</p>
      <p class="temp-desc">${description}</p>
      <p>High: ${high}°C</p>
      <p>Low: ${low}°C</p>
      <p>Humidity: ${humidity}%</p>
      <p>Sunrise: ${sunrise}</p>
      <p>Sunset: ${sunset}</p>`;

    currentWeather.appendChild(iconImg);
    currentWeather.appendChild(tempInfo);
  } else {
    currentWeather.innerHTML = "Weather data unavailable";
  }
}

async function displayWeatherForecast() {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`;
  const forecastData = await fetchWeather(url);
  if (forecastData) {
    // OpenWeatherMap forecast is every 3 hours, so 8 steps = 24 hours
    const getDayName = (dt) =>
      new Date(dt * 1000).toLocaleDateString("en-US", { weekday: "long" });
    const todayForecast = forecastData.list[0];
    const day2forecast = forecastData.list[8];
    const day3forecast = forecastData.list[16];
    forecastContainer.innerHTML = `
            <p>${getDayName(
              todayForecast.dt
            )}: ${todayForecast.main.temp.toFixed(0)}°C</p>
            <p>${getDayName(day2forecast.dt)}: ${day2forecast.main.temp.toFixed(
      0
    )}°C</p>
            <p>${getDayName(day3forecast.dt)}: ${day3forecast.main.temp.toFixed(
      0
    )}°C</p>
          `;
  }
}
