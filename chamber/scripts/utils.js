export function createBusinessCard(business) {
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
            <p>${getDayName(
              todayForecast.dt
            )}: ${todayForecast.main.temp.toFixed(0)}&deg;C</p>
            <p>${getDayName(day2forecast.dt)}: ${day2forecast.main.temp.toFixed(
    0
  )}&deg;C</p>
            <p>${getDayName(day3forecast.dt)}: ${day3forecast.main.temp.toFixed(
    0
  )}&deg;C</p>
          `;
  return template;
}
