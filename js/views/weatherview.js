import WeatherDashboard from "./dashboard.js";

class WeatherView extends WeatherDashboard {
  _parentElement = document.querySelector(".weather-section");
  constructor() {
    super();
  }

  // Renders the entire weather section using provided data
  render(data) {
    if (!data) {
      return;
    }

    const weatherData = data;

    this.renderWeatherSection(weatherData);
  }

  // This function generates the HTML markup for various weather components and inserts them into the DOM
  renderWeatherSection(data) {
    const { address, currentConditions } = data;
    const locationName = address.charAt(0).toUpperCase() + address.slice(1);
    const icon = this._weatherIconObject[currentConditions.icon];

    // DOM update: Clears previous weather content
    this._parentElement.innerHTML = "";

    // Markup for the weather section, including current weather, hourly forecast, air quality, and weekly forecast
    const markup = `
<!-- Current weather section -->
     <div class="current-weather-section main-container">
        <div class="weather-info-wrapper">
          <div class="city-info">
            <h1 class="city-title">${locationName}</h1>
            <p class="rain-probability">Chance of rain: ${
              currentConditions.precipprob
            }%</p>
          </div>
          <h2 class="current-temperature d-temp">${Math.round(
            currentConditions.temp
          )}&deg;</h2>
        </div>
        <div class="weather-icon-container">
          <img src="${icon}" alt="${currentConditions.icon}"/>
        </div>
        <h2 class="current-temperature t-temp">${Math.round(
          currentConditions.temp
        )}&deg;</h2>
      </div>

      <!-- Hourly forecast -->
      <div class="hourly-weather-section main-container">
        <div class="w-hourly-forecast-wrapper">
          <h2 class="forecast-title">Today's forecast</h2>
          <div class="forecast-slider">
            ${this.generateHourlyForecast(data)}
          </div>
        </div>
      </div>

      <!-- Air condition section -->
      <div class="air-quality-section main-container">
        <div class="air-quality-wrapper">
          <div class="section-header">
            <h2 class="forecast-title">Air conditions</h2>
            <button class="see-more-btn">See more</button>
          </div>
          <div class="air-quality-stats">
            <div class="air-quality-stat real-feel-stat">
              <p class="stat-icon"><i class="fa-solid fa-temperature-half"></i></p>
              <div class="stat-details">
                <h3 class="stat-title">Real Feel</h3>
                <p class="stat-value">${Math.round(
                  currentConditions.feelslike
                )}&deg;</p>
              </div>
            </div>

            <div class="air-quality-stat wind-stat">
              <p class="stat-icon"><i class="fa-solid fa-wind"></i></p>
              <div class="stat-details">
                <h3 class="stat-title">Wind</h3>
                <p class="stat-value">${currentConditions.windspeed} km/h</p>
              </div>
            </div>

            <div class="air-quality-stat rain-chance-stat">
              <p class="stat-icon"><i class="fa-solid fa-droplet"></i></p>
              <div class="stat-details">
                <h3 class="stat-title">Chance of rain</h3>
                <p class="stat-value">${currentConditions.precipprob}%</p>
              </div>
            </div>

            <div class="air-quality-stat uv-index-stat">
              <p class="stat-icon"><i class="fa-solid fa-sun"></i></p>
              <div class="stat-details">
                <h3 class="stat-title">UV index</h3>
                <p class="stat-value">${currentConditions.uvindex}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 7-day forecast section -->
      <div class="weekly-forecast-container main-container">
        <button class="expand-wrap-btn"><i class="fa-solid fa-caret-down"></i></button>
        <div class="weekly-forecast-wrapper">
          <h2 class="forecast-title">7-day forecast</h2>
          <div class="forecast-week-wrap">
            ${this.generateSevendayForecast(data)}
          </div>
        </div>
      </div>
      `;

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    this.handleExpandWeeklyBtn();
  }

  // Generates HTML for the hourly forecast by iterating over the hours and selecting every second hour
  generateHourlyForecast(data) {
    const { days } = data;
    const { hours } = days[0];

    const markup = hours
      .filter((_, index) => index % 2 === 0)
      .map((hour, index) => {
        const icon = this._weatherIconObject[hour.icon];
        return `
        
        <div class="forecast-hour">
            <p class="forecast-time">${this.convertTo12HourFormat(
              hour.datetime
            )}</p>
            <img src="${icon}" alt="${hour.icon}" class="forecast-icon" />
            <h3 class="forecast-temperature">${Math.round(hour.temp)}&deg;</h3>
        </div>`;
      })
      .join("");

    return markup;
  }

  // Generates HTML for the 7-day weather forecast by iterating over the days array
  generateSevendayForecast(data) {
    const { days } = data;

    const marukup = days
      .slice(0, 7)
      .map((day, index) => {
        const { conditions } = day;
        const icon = this._weatherIconObject[day.icon];
        return `

         <div class="forecast-day-item">
          <p class="day-label">${this.getWeekDays(day.datetime)}</p>
          <p class="day-condition">
          <img src="${icon}" alt="${day.icon}"/>
          <span class="condition-type">${conditions.split(",")[0]}</span>
          </p>
          <p class="day-temperature">
          <span class="temperature-high">${Math.round(day.tempmax)}</span>/
          <span class="temperature-low">${Math.round(day.tempmin)}</span>
          </p>
      </div>
      `;
      })
      .join("");

    return marukup;
  }

  // Handles expanding or collapsing the weekly forecast section
  handleExpandWeeklyBtn() {
    const weeklyContainer = document.querySelector(
      ".weekly-forecast-container"
    );
    weeklyContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".expand-wrap-btn");

      if (!btn) return;

      weeklyContainer.classList.toggle("expand");
      btn.classList.toggle("rotate-arrow");
    });
  }
}

export const weatherView = new WeatherView();
