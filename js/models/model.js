import { UNITS } from "../config.js";
import { API_KEY } from "../config.js";
import { AJAX_WEATHER } from "../helper.js";
import { AJAX_LOCATIONIQ } from "../helper.js";

export const weatherData = JSON.parse(sessionStorage.getItem("weather")) || {};
export const city = JSON.parse(sessionStorage.getItem("cityname")) || [];
