import * as model from "../models/model.js";
import { UNITS } from "../config.js";
import { WEATHER_URL } from "../config.js";
import { API_KEY } from "../config.js";
import view from "../views/view.js";

function getUserGeolocation() {
   function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
  }
}
