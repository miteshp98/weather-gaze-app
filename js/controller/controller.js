import * as model from "../models/model.js";
import { UNITS } from "../config.js";
import { WEATHER_URL } from "../config.js";
import { API_KEY } from "../config.js";
import { weatherView } from "../views/weatherView.js";
import { citiesView } from "../views/citiesview.js";
import { mapView } from "../views/mapview.js";

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

function controlSearchedCity() {
  citiesView.addHandleSearchedCity(function (cityname) {
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
  controlSearchedCity();

  citiesView.addHandleSearch(controlSearchResults);
  mapView._handleMapBtn();
  mapView.zoomToCity();
}

init();
