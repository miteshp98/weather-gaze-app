import { API_KEY, URL, UNITS } from "../config.js";
import "core-js/stable";
import "regenerator-runtime";

const city = JSON.parse(sessionStorage.getItem("cityname")) || ["ahmedabad"];
const weatherData = JSON.parse(sessionStorage.getItem("weather")) || {};

const AJAX = async (cityName) => {
  try {
    const response = await fetch(
      `${URL}${cityName}?unitGroup=${UNITS}&key=${API_KEY}`
    );

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data.message || "Invalid location. Please try again.";
      throw new Error(errorMsg);
    }
    return data;
  } catch (error) {
    alert("Invalid Location");
    return null;
  }
};

export const addCity = (cityname) => {
  const normalizedCityName = cityname.toLowerCase();
  if (!city.includes(normalizedCityName)) { 
    city.push(normalizedCityName);
    sessionStorage.setItem("cityname", JSON.stringify(city));
  } else {
    alert("City already added!");
  }
};

export const createObject = async () => {
  for (const name of city) {
    if (!weatherData[name]) {
      const data = await AJAX(name);
      if (data) {
        weatherData[name] = data;

        sessionStorage.setItem("weather", JSON.stringify(weatherData));
      }
    }
  }
  return weatherData;
};

export const getCityList = () => city;
export const getWeather = () => weatherData;
