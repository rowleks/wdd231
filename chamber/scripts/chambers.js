const nav = document.getElementById("nav");
const menu = document.getElementById("menu");
const directories = document.getElementById("directory");
const buttons = document.querySelectorAll(".view-buttons button");

document.getElementById("currentyear").innerHTML = new Date().getFullYear();

document.getElementById(
  "lastModified"
).innerHTML = `Last Modification: ${document.lastModified}`;

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
