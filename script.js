const ipAddress = document.querySelector(".IP");
const ipLocation = document.querySelector(".location");
const city = document.querySelector(".city");
const region = document.querySelector(".region");
const country = document.querySelector(".country");
const postcode = document.querySelector(".postcode");
const timezone = document.querySelector(".timezone");
const isp = document.querySelector(".ISP");

const input = document.querySelector("input");
const button = document.querySelector("button");

const errorMessage = document.querySelector(".error");

const fetchData = (apiurl) => {
  fetch(apiurl)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      errorMessage.style.display = "none";

      ipAddress.textContent = data.ip;
      city.textContent = data.location.city;
      region.textContent = data.location.region;
      postcode.textContent = data.location.postalCode;
      country.textContent = data.location.country;
      timezone.textContent = data.location.timezone;
      isp.textContent = data.isp;

      let lat = data.location.lat;
      let long = data.location.lng;

      setLocation(lat, long);
    })
    .catch(() => {
      errorMessage.style.display = "block";
    });
};

var map = L.map("map");
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors </br> Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a> Coded by <a href="https://github.com/acha-jr" target="_blank">acha-jr</a>.',
}).addTo(map);

const setLocation = (lat, long) => {
  map.setView([lat, long], 13);

  var myIcon = L.icon({
    iconUrl: "./images/icon-location.svg",
    iconSize: [46, 56],
    iconAnchor: [22, 94],
  });
  L.marker([lat, long], { icon: myIcon }).addTo(map);
};

const api =
  "https://geo.ipify.org/api/v2/country,city?apiKey=at_JM5HNk7lCZ4ug74ybof00BrmCKR80&domain=";

button.addEventListener("click", () => {
  let url = api + input.value;
  fetchData(url);
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    let url = api + input.value;
    fetchData(url);
  }
});

window.addEventListener("load", () => {
  fetchData(api);
});
