import { TIMEOUT_SEC } from "./config.js";
import { WEATHER_URL } from "./config.js";

function timeout(s) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
}

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
