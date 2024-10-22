import { UNITS } from "../config.js";
import { API_KEY } from "../config.js";
import { AJAX_LOCATIONIQ } from "../helper.js";
import { AJAX_WEATHER } from "../helper.js";
import { citiesView } from "../views/citiesview.js";
import { weatherView } from "../views/weather.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

export const weatherData = JSON.parse(sessionStorage.getItem("weather")) || {};
export const city = JSON.parse(sessionStorage.getItem("cityname")) || [];

// Reverse geocodes latitude and longitude into a location name
export async function reverseGeocoding(lat, lon) {
  try {
    const data = await AJAX_LOCATIONIQ(lat, lon);

    if (data) {
      const { town, city, neighbourhood } = data.address;
      const userLocationName = city ?? town ?? neighbourhood;

      // Add the location to the list and fetch weather data
      addCity(userLocationName);
    } else {
      // Render an error if location data cannot be fetched
      weatherView.renderError(`      

      <p class="error-msg">
      "Unable to fetch location details. Please search for a city manually."
      </p>`);
    }
  } catch (error) {
    console.error("Reverse Geocoding API Error:", error);

    weatherView.renderError(`
      
      <p class="error-msg">
      "Unable to retrieve your location details. Please search for a city manually."
      </p>`);
  }
}

// Adds a new city to the list and fetches the weather report for it
export function addCity(locationName) {
  const normalizeName = locationName.toLowerCase();

  if (!city.includes(normalizeName)) {
    city.push(normalizeName);
    sessionStorage.setItem("cityname", JSON.stringify(city));

    getWeatherReport(normalizeName);
  } else {
    getWeatherReport(normalizeName);
  }

  if (city.includes(normalizeName)) {
    // Render weather data for the city if it's already present
    weatherView.render(weatherData[normalizeName]);
    citiesView.getData(weatherData);
  }
}

// Fetches the weather report for a specific location
export async function getWeatherReport(location) {
  if (weatherData[location]) {
    // Check if weather data for the location is already available
    weatherView.render(weatherData[location]);
    citiesView.render(weatherData[location]);
  } else {
    try {
      const weatherReport = await AJAX_WEATHER(
        `${location}?unitGroup=${UNITS}&key=${API_KEY}`
      );

      weatherData[location] = weatherReport;

      sessionStorage.setItem("weather", JSON.stringify(weatherData));

      weatherView.render(weatherData[location]);
      citiesView.getData(weatherData);
      citiesView.render(weatherData[location]);
    } catch (error) {
      console.error(error);
      weatherView.renderError(`
      <p class="error-code">${error.message}</p>
      
      <p class="error-msg">
      "Unable to fetch weather data. Please check your connection or try again"
      </p>

      `);
    }
  }
}
