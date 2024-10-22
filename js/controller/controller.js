import * as model from "../models/model.js";
import { UNITS } from "../config.js";
import { WEATHER_URL } from "../config.js";
import { API_KEY } from "../config.js";
import { weatherView } from "../views/weatherView.js";
import { citiesView } from "../views/citiesview.js";
import { mapView } from "../views/mapview.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

// Function to get the user's current location using the Geolocation API
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

  // Success callback function when geolocation is retrieved
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
      "You denied the request for geolocation."
      </p>`
      );
    } else {
      weatherView.renderError(
        `
      <p class="error-msg">
      "Unable to retrieve your location."
      </p>`
      );
    }
  }
}

// Function to control the searched city input and fetch the weather report
function controlSearchedCity() {
  citiesView.addHandleSearchedCity(function (cityname) {
    model.getWeatherReport(cityname);
  });
}

// Function to handle the search input and validate the city name query
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

// Initialization function to set up the app on load
function init() {
  getUserLocation();
  weatherView.handleNavLinks();
  controlSearchedCity();

  citiesView.addHandleSearch(controlSearchResults);
  mapView._handleMapBtn();
  mapView.controlDirectZoomBtn();
}

init();
