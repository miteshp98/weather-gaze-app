import { TIMEOUT_SEC } from "./config.js";
import { WEATHER_URL } from "./config.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

// Function to handle timeout for long requests
function timeout(s) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error(`Request took too long!`));
    }, s * 1000);
  });
}

// Function to fetch location data using LocationIQ API
export async function AJAX_LOCATIONIQ(lat, lon) {
  const URL = `https://us1.locationiq.com/v1/reverse?key=pk.8f44cc979596fc0001b80923570770f5&`;

  try {
    const fetchPro = fetch(`${URL}&lat=${lat}&lon=${lon}&format=json`);

    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// Function to fetch weather data for a given location
export async function AJAX_WEATHER(location) {
  try {
    const fetchPro = fetch(`${WEATHER_URL}${location}`);

    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
