import { Dom } from "../config.js";
import "core-js/stable";
// Icons
import clearDayIcon from "../../assets/icons/weathericon/clear-day.svg";
import clearNightIcon from "../../assets/icons/weathericon/clear-night.svg";
import rainIcon from "../../assets/icons/weathericon/rain.svg";
import showersDayIcon from "../../assets/icons/weathericon/showers-day.svg";
import showersNightIcon from "../../assets/icons/weathericon/showers-night.svg";
import cloudyIcon from "../../assets/icons/weathericon/cloudy.svg";
import fogIcon from "../../assets/icons/weathericon/fog.svg";
import partlyCloudyDayIcon from "../../assets/icons/weathericon/partly-cloudy-day.svg";
import partlyCloudyNightIcon from "../../assets/icons/weathericon/partly-cloudy-night.svg";
import snowIcon from "../../assets/icons/weathericon/snow.svg";
import windIcon from "../../assets/icons/weathericon/wind.svg";
import thunderRainIcon from "../../assets/icons/weathericon/thunder-rain.svg";
import thunderIcon from "../../assets/icons/weathericon/thunder.svg";

class View {
  _weatherIconObject = {
    "clear-day": clearDayIcon,
    "clear-night": clearNightIcon,
    "partly-cloudy-day": partlyCloudyDayIcon,
    "partly-cloudy-night": partlyCloudyNightIcon,
    rain: rainIcon,
    snow: snowIcon,
    "thunder-rain": thunderRainIcon,
    thunder: thunderIcon,
    wind: windIcon,
    "showers-day": showersDayIcon,
    "showers-night": showersNightIcon,
    cloudy: cloudyIcon,
    fog: fogIcon,
  };

  render(data) {
    const weatherReport = data;

    this._renderMainCurrentWeather(weatherReport);
    this._renderCitiesAsideCurrent(weatherReport);
    this._renderCityList(weatherReport);
    this._getDaysForecastData(weatherReport);
    this._renderAirCondition(weatherReport);
  }

  updateClickData(data) {
    this._renderMainCurrentWeather(data);
    this._renderCitiesAsideCurrent(data);
    this._getDaysForecastData(data);
    this._renderAirCondition(data);
  }

  _getWeekDays(date) {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const currentDate = new Date(date);
    const dayName = weekdays[currentDate.getDay()];
    return dayName;
  }

  _getDaysForecastData(data) {
    const days = Object.values(data).map((item) => {
      const { days } = item;
      this._renderSevendayForecast(days);
      this._renderThreedayForecast(days);
      this._renderFullHourlyForecast(days);
      this._renderHalfHour(days);
      return days;
    });
  }

  _convertTo12HourFormat(time) {
    let [hour, minutes] = time.split(":");
    hour = parseInt(hour, 10);

    let period = "AM";

    if (hour === 0) {
      hour = 12;
    } else if (hour === 12) {
      period = "AM";
    } else if (hour > 12) {
      hour = hour - 12;
      period = "PM";
    }
    return `${hour}:${minutes} ${period}`;
  }

  _renderCurrentWeather(containerClass, data) {
    const container = document.querySelector(containerClass);

    Object.values(data).forEach((property) => {
      const { address, currentConditions } = property;
      const cityName = address.split(",").slice(0, 1).join("").toLowerCase();
      const temperature = Math.round(currentConditions.temp);
      const precipprob = Math.round(currentConditions.precipprob);

      const existingCity = container.querySelector(
        `[data-cityname="${cityName}"]`
      );

      if (existingCity) return;

      container.innerHTML = this._currentWeatherMarkup(
        cityName,
        precipprob,
        temperature,
        currentConditions
      );
    });
  }

  _renderMainCurrentWeather(data) {
    this._renderCurrentWeather(".current-weather-wrapper", data);
  }

  _renderCitiesAsideCurrent(data) {
    this._renderCurrentWeather(".city-current-weather-wrapper", data);
  }

  _currentWeatherMarkup(cityName, precip, temp, property) {
    const iconPath = this._weatherIconObject[property.icon];
    const markup = `
                <div class="city-weather-info">
                     <div class="city-info">
                          <h1 class="weather-city">${
                            cityName.charAt(0).toUpperCase() + cityName.slice(1)
                          }</h1>
                          <p class="precipitation-info">Chance of rain <span class="perception">${precip}%</span></p>
                </div>

                  <div class="temperature-wrapper">
                    <h2 class="current-temp">${temp}<span class="degree-symbol">&deg;</span></h2>
                  </div>
                </div>

                <div class="weather-icon">
                  <img
                    src="${iconPath}"
                    alt="${property.icon}"
                  />
                </div>`;

    return markup;
  }

  _renderCityList(data) {
    const container = document.querySelector(".cities-list-section");

    const markup = Object.values(data)
      .map((property) => {
        const { address, currentConditions } = property;
        const cityName = address.split(",").slice(0, 1).join("").toLowerCase();
        const temperature = Math.round(currentConditions.temp);
        const precipprob = Math.round(currentConditions.precipprob);
        const iconPath = this._weatherIconObject[currentConditions.icon];

        return `
          <div class="city-search-result" data-cityname="${cityName}">
            <div class="city-search-w-icon">
              <img
                src="${iconPath}"
                alt="${currentConditions.icon}"
              />
            </div>
            <div class="cities-name-time">
              <h2 class="city-name">${
                cityName.charAt(0).toUpperCase() + cityName.slice(1)
              }</h2>
            </div>
            <h3 class="current-temp">${temperature}&deg;</h3>
            <button class="remove-button">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>`;
      })
      .join("");

    container.innerHTML = markup;
  }

  _renderDaysForecast(containerClass, data, dayCount) {
    const container = document.querySelector(containerClass);
    const sevenDays = data.slice(0, dayCount);

    const markup = sevenDays
      .map((property) => {
        return this._daysMarkup(property);
      })
      .join("");

    container.innerHTML = markup;
  }

  _renderSevendayForecast(data) {
    this._renderDaysForecast(".days-forecast-container", data, 7);
  }

  _renderThreedayForecast(data) {
    this._renderDaysForecast(".threeday-forecast-container", data, 3);
  }

  _daysMarkup(property) {
    const iconPath = this._weatherIconObject[property.icon];

    const html = `
    <div class="forecast-day">
                  <h3 class="weekday">${this._getWeekDays(
                    property.datetime
                  )}</h3>
                      <p class="weather-type">
                        <img
                          src="${iconPath}"
                          alt="${property.icon}"
                        /><span class="type-info">${property.conditions
                          .split(",")
                          .slice(0, 1)
                          .join("")}</span>
                      </p>
                      <p class="temprature">
                        <span class="max-temp">
                        ${Math.round(
                          property.tempmax
                        )}</span>/<span class="min-temp"
                          >${Math.round(property.tempmin)}</span
                        >
                      </p>
                    </div>
    `;

    return html;
  }

  _getHours(step, data) {
    return data.filter((_, index) => index % step === 0);
  }

  // Common function to render hourly forecast
  _renderHourlyForecast(containerClass, hoursData, step, sliceEnd) {
    const container = document.querySelector(containerClass);

    container.innerHTML = "";

    const fullHours = this._getHours(step, hoursData).slice(0, sliceEnd);

    const times = fullHours.map((i) => i.datetime);
    const convertedHour = times.map(this._convertTo12HourFormat);

    fullHours.forEach((hour, i) => {
      const div = document.createElement("div");
      div.setAttribute("class", "forecast-hourly");
      div.innerHTML = this._hourlyMarkup(fullHours, i, convertedHour);
      container.insertAdjacentElement("beforeend", div);
    });
  }

  // Render full hourly forecast
  _renderFullHourlyForecast(data) {
    const hours = data[0].hours;
    this._renderHourlyForecast(".hourly-forecast-flex", hours, 2, 7);
  }

  // Render half-hour forecast (first 3 hourly slots)
  _renderHalfHour(data) {
    const hours = data[0].hours;
    this._renderHourlyForecast(".city-hourly-forecast", hours, 5, 3);
  }

  // Markup for hourly forecast
  _hourlyMarkup(hours, i, convertedTime) {
    const iconPath = this._weatherIconObject[hours[i].icon];
    return `
      <p class="forecast-time">${convertedTime[i]}</p>
      <div class="hourly-icon">
        <img src="${iconPath}" alt="${hours[i].icon}" />
      </div>
      <p class="forecast-temperature">${Math.round(hours[i].temp)}&deg;</p>
    `;
  }

  _renderAirCondition(data) {
    const weather = Object.values(data).map((item) => {
      const { currentConditions } = item;

      this._renderAirConditionMarkup(
        ".real-feel",
        `${Math.round(currentConditions.feelslike)}`,
        "fa-solid fa-temperature-half",
        "Real Feel"
      );
      this._renderAirConditionMarkup(
        ".wind-stats",
        `${currentConditions.windspeed} km/h`,
        "fa-solid fa-wind",
        "Wind"
      );
      this._renderAirConditionMarkup(
        ".rain-stats",
        `${currentConditions.precipprob}%`,
        "fa-solid fa-droplet",
        "Change of rain"
      );
      this._renderAirConditionMarkup(
        ".uv-index-stats",
        `${currentConditions.uvindex}`,
        "fa-solid fa-sun",
        "UV Index"
      );
    });
  }

  _renderAirConditionMarkup(containerClass, value, iconClass, name) {
    const container = document.querySelector(containerClass);
    const html = `<div class="icon">
                        <i class="${iconClass}"></i>
                      </div>
                      <div class="info">
                        <h3 class="title">${name}</h3>
                        <p class="value">${value}</p>
                </div>`;
    container.innerHTML = html;
    return html;
  }
}

export default new View();
