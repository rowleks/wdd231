export function createBusinessCard(business) {
  const card = document.createElement("section");
  card.classList.add("business-card");

  card.innerHTML = `
    <img src="${business.image}" alt="${business.name} Logo" width="150" height="150" loading="lazy">
    <h2>${business.name}</h2>
    <p>${business.address}</p>
    <p class="phone">${business.phone}</p>
    <a href="${business.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
  `;

  return card;
}

export function createSpotlightCard(business) {
  const card = document.createElement("div");
  card.classList.add("spotlight-card");

  card.innerHTML = `<div class="upper"><h3>${business.name}</h3></div>
  <div class="lower">
  <img src="${business.image}" alt="${
    business.name
  } Logo" width="100" height="100" loading="lazy">
  <div class="info"> 
  <p><b>Email:</b> ${business.email}</p>
  <p><b>Phone:</b> ${business.phone}</p>
  <p><b>Membership Level:</b> ${
    business.membership_level == 3
      ? "Gold"
      : business.membership_level == 2
      ? "Silver"
      : "N/A"
  }</p>
  <a href="${
    business.website
  }" target="_blank" rel="noopener noreferrer"><b>URL:</b> ${
    business.website
  }</a>
  </div>
  
  </div>`;

  return card;
}

export async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response?.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export function createCurrentWeatherInfo(data) {
  const temp = data.main.temp.toFixed(0);
  const description = data.weather[0].description;
  const humidity = data.main.humidity;
  const high = data.main.temp_max.toFixed(0);
  const low = data.main.temp_min.toFixed(0);
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const template = document.createDocumentFragment();

  const iconImg = document.createElement("img");
  iconImg.src = iconUrl;
  iconImg.alt = description;
  iconImg.width = 100;
  iconImg.height = 100;
  iconImg.loading = "lazy";

  const tempInfo = document.createElement("div");
  tempInfo.classList.add("current-temp-info");
  tempInfo.innerHTML = `<p><b>${temp}</b>&deg;C</p>
      <p class="temp-desc">${description}</p>
      <p>High: ${high}&deg;C</p>
      <p>Low: ${low}&deg;C</p>
      <p>Humidity: ${humidity}%</p>
      <p>Sunrise: ${sunrise}</p>
      <p>Sunset: ${sunset}</p>`;

  template.appendChild(iconImg);
  template.appendChild(tempInfo);
  return template;
}

export function createForecastInfo(data) {
  const getDayName = (dt) =>
    new Date(dt * 1000).toLocaleDateString("en-US", { weekday: "long" });

  const todayForecast = data.list[0];
  const day2forecast = data.list[8];
  const day3forecast = data.list[16];

  const template = `
            <p>Today: ${todayForecast.main.temp.toFixed(0)}&deg;C</p>
            <p>${getDayName(day2forecast.dt)}: ${day2forecast.main.temp.toFixed(
    0
  )}&deg;C</p>
            <p>${getDayName(day3forecast.dt)}: ${day3forecast.main.temp.toFixed(
    0
  )}&deg;C</p>
          `;
  return template;
}

export function createPlaceCard(place) {
  const card = document.createElement("div");
  card.classList.add("place-card");

  card.innerHTML = `
    <h2>${place.name}</h2>
    <figure>
      <img src="images/${place.image}" alt="${place.name}" loading="lazy">
    </figure>
    <address>${place.address}</address>
    <p>${place.description}</p>
    <button class="learn-more-btn">Learn More</button>
  `;

  return card;
}
