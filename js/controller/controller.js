import * as model from "../models/model.js";
import { UNITS } from "../config.js";
import { WEATHER_URL } from "../config.js";
import { API_KEY } from "../config.js";
import { weatherView } from "../views/weatherView.js";
import { citiesView } from "../views/citiesview.js";

function getUserLocation() {
  if (!navigator.geolocation) {
    alert(`Geolocation is not supported by your browser`);
  } else {
    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    model.reverseGeocoding(latitude, longitude);
  }

  function error(err) {
    if (err.code === err.PERMISSION_DENIED) {
      weatherView.renderError(
        `
      <p class="error-msg">
      "You denied the request for geolocation. You can still search for other cities."
      </p>
      
      <button class="cities-sec-btn">
      <span>Cities</span>
      </button>`
      );
    } else {
      weatherView.renderError(
        `
      <p class="error-msg">
      "Unable to retrieve your location. You can still search for other cities."
      </p>
      
      <button class="cities-sec-btn">
      <span>Cities</span>
      </button>`
      );
    }
  }
}

function handleSearchedCityBtn() {
  const section = document.querySelector(".cities-section");

  section.addEventListener("click", function (e) {
    const button = e.target.closest("button");

    if (!button) return;

    const { cityname } = button.dataset;

    model.getWeatherReport(cityname);
  });
}

function controlSearchResults() {
  const query = citiesView.getQuery();
  const regex = /^[a-zA-Z\s]+$/;

  if (!query) return;

  if (!regex.test(query)) {
    alert("Please enter a proper city name using only letters.");
    return false;
  }

  if (query.length < 3) {
    alert("Please enter a proper city name");
    return false;
  }

  model.addCity(query);
}

function init() {
  getUserLocation();
  weatherView.handleNavLinks();
  weatherView.handleCTAButton();
  handleSearchedCityBtn();

  citiesView.addHandleSearch(controlSearchResults);
}

init();
