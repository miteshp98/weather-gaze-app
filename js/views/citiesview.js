import { weatherData } from "../models/model.js";
import WeatherDashboard from "./dashboard.js";

class CitiesView extends WeatherDashboard {
  _formElement = document.querySelector("form");
  _parentElement = document.querySelector(".city-overview-section");
  constructor() {
    super();
  }

  render(data) {
    if (!data) {
      return;
    }

    const currentSearchCityData = data;

    this.renderCitySection(currentSearchCityData);
  }

  getData(data) {
    if (!data) {
      return;
    }

    const weatherData = data;
    this.generateSearchResults(weatherData);
  }

  getQuery() {
    const query = this._formElement.querySelector("#city-search-input").value;

    this.clearQuery();

    return query;
  }

  clearQuery() {
    this._formElement.querySelector("#city-search-input").value = "";
  }

  addHandleSearch(handler) {
    this._formElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  generateSearchResults(data) {
    const container = document.querySelector(".city-search-result-container");

    const test = Object.values(data)
      .map((key) => {
        const { address, currentConditions } = key;
        const locationName = address.charAt(0).toUpperCase() + address.slice(1);
        const cityCurrentTemp = currentConditions.temp;
        const cityCurrentTime = currentConditions.datetime;

        const markup = `
        <button class="city-search-result" data-cityname="${locationName.toLowerCase()}">
              

                <img src="assets/icons/weathericon/clear-day.svg"
                        alt="clear-day" class="weather-condition-icon"/>

            <div class="city-name-time-wrapper">

                <h2 class="city-name-label">${locationName}</h2>
                <p class="city-current-time">${this.convertTo12HourFormat(
                  cityCurrentTime
                )}</p>

            </div>

              <h3 class="city-current-temperature">${Math.round(
                cityCurrentTemp
              )}&deg;</h3>
        </button>`;

        return markup;
      })
      .join("");

    container.innerHTML = test;
  }

  renderCitySection(data) {
    const { address, currentConditions } = data;
    const locationName = address.charAt(0).toUpperCase() + address.slice(1);

    const sectionMarkup = `

    <div class="city-overview-section">

        <div class="city-current-forecast-container">

              <div class="current-forecast-wrapper">

                <div class="current-city-info-wrap">

                  <h2 class="city-name">${locationName}</h2>
                  <p class="rain-probability">Chance of rain ${
                    currentConditions.precipprob
                  }%</p>

                </div>

                <h3 class="city-temp">${Math.round(
                  currentConditions.temp
                )}&deg;</h3>

                </div>

              <img
                src="assets/icons/weathericon/clear-day.svg"
                alt="clear-day"
                class="current-weather-icon"
              />

        </div>

        <div class="city-hourly-forecast-container">
              <h2 class="city-wrapper-title">today's forecast</h2>

            <div class="hourly-forecast-wrapper">
              ${this.generateHourlyForecast(data)}
            </div>
        </div>

        <div class="city-threeday-forecast-container">
              <h2 class="city-wrapper-title">3-day forecast</h2>

              <div class="threeday-forecast-wrapper">
              ${this.generateThreedayForecast(data)}
              </div>
        </div>

    </div>`;

    this._parentElement.innerHTML = sectionMarkup;
  }

  generateHourlyForecast(data) {
    const { days } = data;
    const { hours } = days[0];

    const markup = hours
      .filter((_, index) => index % 2 === 0)
      .slice(0, 3)
      .map((hour, index) => {
        return `

            <div class="city-hourly-forecast">
                
                  <p class="city-current-time">${this.convertTo12HourFormat(
                    hour.datetime
                  )}</p>

                  <img
                    src="assets/icons/weathericon/clear-day.svg"
                    alt="clear-day"
                    class="condition-icon"
                  />

                  <p class="city-current-temp">${Math.round(hour.temp)}&deg;</p>
            </div>
        `;
      })
      .join("");

    return markup;
  }

  generateThreedayForecast(data) {
    const { days } = data;

    const marukup = days
      .slice(0, 3)
      .map((data, index) => {
        const { conditions } = data;

        return `

        <div class="forecast-day">
                
                    <p class="forecast-weekday">${this.getWeekDays(
                      data.datetime
                    )}</p>

                  <p class="forecast-condition">
                    <img
                      src="assets/icons/weathericon/clear-day.svg"
                      alt="clear-day"
                    />
                    <span class="condition-label">${
                      conditions.split(",")[0]
                    }</span>
                  </p>

                  <p class="forecast-temperature">
                    <span class="temp-high">${Math.round(
                      data.tempmax
                    )}</span>/<span class="temp-low">${Math.round(
          data.tempmin
        )}</span>
                  </p>

        </div>`;
      })
      .join("");

    return marukup;
  }
}
export const citiesView = new CitiesView();
