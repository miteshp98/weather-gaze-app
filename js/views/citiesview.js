import { weatherData } from "../models/model.js";
import WeatherDashboard from "./dashboard.js";
import { mapView } from "./mapview.js";

class CitiesView extends WeatherDashboard {
  _formElement = document.querySelector("form");
  _parentElement = document.querySelector(".city-overview-section");
  constructor() {
    super();
  }

  // Renders the city data in the UI
  render(data) {
    if (!data) {
      return;
    }

    const currentSearchCityData = data;

    this.renderCitySection(currentSearchCityData);
  }

  // Processes the data received and triggers relevant updates
  getData(data) {
    if (!data) {
      return;
    }

    const weatherData = data;
    this.generateSearchResults(weatherData);
    mapView._getData(weatherData);
  }

  // Retrieves the user's input query from the search form
  getQuery() {
    const query = this._formElement.querySelector("#city-search-input").value;

    this.clearQuery();

    return query;
  }

  // Clears the input field for the city search
  clearQuery() {
    this._formElement.querySelector("#city-search-input").value = "";
  }

  // Adds a submit event listener to the search form
  addHandleSearch(handler) {
    this._formElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  // Adds a click event listener to the city search results
  addHandleSearchedCity(handler) {
    const section = document.querySelector(".cities-section");

    section.addEventListener("click", function (e) {
      const button = e.target.closest("button");

      if (!button) return;

      const buttons = section.querySelectorAll(".city-search-result");
      buttons.forEach((btn) => btn.classList.remove("active-city"));
      button.classList.add("active-city");

      const { cityname } = button.dataset;
      handler(cityname);
    });
  }

  // Generates markup for displaying search results
  generateSearchResults(data) {
    const container = document.querySelector(".city-search-result-container");

    const render = Object.values(data)
      .map((key) => {
        const { address, currentConditions } = key;
        const locationName = address.charAt(0).toUpperCase() + address.slice(1);
        const cityCurrentTemp = currentConditions.temp;
        const cityCurrentTime = currentConditions.datetime;
        const icon = this._weatherIconObject[currentConditions.icon];

        const markup = `

           <button class="city-search-result" data-cityname="${locationName.toLowerCase()}">
                <img src="${icon}" alt="${
          currentConditions.icon
        }" class="weather-condition-icon"/>
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

    container.innerHTML = render;
  }

  // Renders the city forecast section in the UI
  renderCitySection(data) {
    const { address, currentConditions } = data;
    const locationName = address.charAt(0).toUpperCase() + address.slice(1);
    const icon = this._weatherIconObject[currentConditions.icon];

    const sectionMarkup = `

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
              <img src="${icon}" alt="${
      currentConditions.icon
    }" class="current-weather-icon"/>
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
        </div>`;

    this._parentElement.innerHTML = sectionMarkup;
  }

  // Generates markup for the hourly forecast
  generateHourlyForecast(data) {
    const { days } = data;
    const { hours } = days[0];

    const markup = hours
      .filter((_, index) => index % 2 === 0)
      .slice(0, 3)
      .map((hour, index) => {
        const icon = this._weatherIconObject[hour.icon];
        return `

       <div class="city-hourly-forecast">
                  <p class="city-current-time">${this.convertTo12HourFormat(
                    hour.datetime
                  )}</p>
                  <img src="${icon}" alt="${hour.icon}" class="condition-icon"/>
                  <p class="city-current-temp">${Math.round(hour.temp)}&deg;</p>
            </div>
          `;
      })
      .join("");

    return markup;
  }

  // Generates markup for the 3-day forecast
  generateThreedayForecast(data) {
    const { days } = data;

    const marukup = days
      .slice(0, 3)
      .map((data, index) => {
        const { conditions } = data;
        const icon = this._weatherIconObject[data.icon];

        return `

          <div class="forecast-day">
                    <p class="forecast-weekday">${this.getWeekDays(
                      data.datetime
                    )}</p>
                  <p class="forecast-condition">
                    <img src="${icon}" alt="${data.icon}"/>
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
