import WeatherDashboard from "./dashboard.js";

class WeatherView extends WeatherDashboard {
  _parentElement = document.querySelector(".weather-section");
  constructor() {
    super();
  }

  render(data) {
    if (!data) {
      return;
    }

    const weatherData = data;

    this.renderWeatherSection(weatherData);
  }

  renderWeatherSection(data) {
    const { address, currentConditions } = data;
    const locationName = address.charAt(0).toUpperCase() + address.slice(1);

    this._parentElement.innerHTML = "";

    const markup = `

     <!-- Current weather -->
     
     <div class="current-weather-section main-container">

            <div class="weather-info-wrapper">
            
                    <div class="city-info">
                
                                <h1 class="city-title">${locationName}</h1>

                                <p class="rain-probability">Chance of rain: ${
                                  currentConditions.precipprob
                                }%</p>

                    </div>
                                <h2 class="current-temperature">${Math.round(
                                  currentConditions.temp
                                )}&deg;</h2>
            </div>

            <div class="weather-icon-container">
            
                        <img src="assets/icons/weathericon/clear-day.svg" alt="clear-day"/>
            </div>

    </div>
      
      <!-- Hourly Content -->
          
      <div class="hourly-weather-section main-container">
          
            <div class="w-hourly-forecast-wrapper">
              
                  <h2 class="forecast-title">today's forecast</h2>

            <div class="forecast-slider">

            ${this.generateHourlyForecast(data)}

            </div>
            
            </div>

      </div>

      <!-- Air Condition Content -->

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

                    <h3 class="stat-title">Real Feel</h2>
                    
                    <p class="stat-value">${Math.round(
                      currentConditions.feelslike
                    )} &deg;</p>
                </div>

            </div>

        <div class="air-quality-stat wind-stat">
                  
                    <p class="stat-icon"><i class="fa-solid fa-wind"></i></p>

                <div class="stat-details">

                    <h3 class="stat-title">Wind</h2>

                    <p class="stat-value">${
                      currentConditions.windspeed
                    } km/h</p>

                </div>

        </div>

                <div class="air-quality-stat rain-chance-stat">

                  <p class="stat-icon"><i class="fa-solid fa-droplet"></i></p>

                  <div class="stat-details">

                      <h3 class="stat-title">Chance of rain</h2>

                    <p class="stat-value">${currentConditions.precipprob}%</p>

                  </div>

                </div>

                <div class="air-quality-stat uv-index-stat">

                  <p class="stat-icon"><i class="fa-solid fa-sun"></i></p>

                  <div class="stat-details">

                    <h3 class="stat-title">UV index</h2>

                    <p class="stat-value">${currentConditions.uvindex}</p>

                  </div>

                </div>

                </div>
          </div>
      </div>

      <!-- Week Weather Content -->

      <div class="weekly-forecast-container main-container">

            <div class="weekly-forecast-wrapper">
              
                  <h2 class="forecast-title">7-day forecast</h2>

            <div class="forecast-week-wrap">

            ${this.generateSevendayForecast(data)}

                </div>
            </div>
        </div>
      `;

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  generateHourlyForecast(data) {
    const { days } = data;
    const { hours } = days[0];

    const markup = hours
      .filter((_, index) => index % 2 === 0)
      .map((hour, index) => {
        return `

        <div class="forecast-hour">

            <p class="forecast-time">${this.convertTo12HourFormat(
              hour.datetime
            )}</p>
                 
            <img src="assets/icons/weathericon/clear-day.svg" alt="clear-day" class="forecast-icon" />
                  
                  <h3 class="forecast-temperature">${Math.round(
                    hour.temp
                  )}&deg;</h3>

        </div>`;
      })
      .join("");

    return markup;
  }

  generateSevendayForecast(data) {
    const { days } = data;

    const marukup = days
      .slice(0, 7)
      .map((data, index) => {
        const { conditions } = data;
        return `

      <div class="forecast-day-item">
                
            <p class="day-label">${this.getWeekDays(data.datetime)}</p>
                
              <p class="day-condition">
                    
                <img src="assets/icons/weathericon/clear-day.svg" alt="clear-day"/>
                      
                <span class="condition-type">${conditions.split(",")[0]}</span>
                  
              </p>
                  
              <p class="day-temperature">
                      
                      <span class="temperature-high">${Math.round(
                        data.tempmax
                      )}</span>/
                      <span class="temperature-low">${Math.round(
                        data.tempmin
                      )}</span>
                  
              </p>
      </div>`;
      })
      .join("");

    return marukup;
  }
}

export const weatherView = new WeatherView();
