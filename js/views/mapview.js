import WeatherDashboard from "./dashboard.js";

class MapView extends WeatherDashboard {
  _data;
  _parentElement = document.querySelector(".bookmarked-city-container");
  constructor() {
    super();
    this.map = null;
  }

  _getData(data) {
    this._data = data;

    this.renderBookmarkedCity(this._data);

    if (this.map) {
      this.renderCityMarker(this._data);
    }
  }

  _handleMapBtn() {
    const btn = document.querySelector(".show-map-btn");

    btn.addEventListener("click", () => {
      btn.classList.add("hidden");
      this._toggleMap();
    });
  }

  _toggleMap() {
    const mapContainer = document.querySelector("#map");

    if (mapContainer.classList.contains("hidden")) {
      mapContainer.classList.remove("hidden");

      if (!this.map) {
        this.rendermap();

        if (this._data) {
          this.renderCityMarker(this._data);
        }
      } else {
        this.map.invalidateSize();
      }
    } else {
      mapContainer.classList.add("hidden");
    }
  }

  rendermap() {
    this.map = L.map("map").setView([20, 0], 3);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
  }

  renderCityMarker(data) {
    const locations = data;

    Object.values(locations).forEach((city) => {
      const { currentConditions, address } = city;
      const locationName = address.charAt(0).toUpperCase() + address.slice(1);

      const marker = L.marker([city.latitude, city.longitude]).addTo(this.map);

      marker.bindPopup(`
        <h3 class="location-name">${locationName}</h3>
        <p class="location-temp">${Math.round(
          currentConditions.temp
        )}&deg;</p>`);

      marker.on("click", () => {
        marker.openPopup();
      });
    });
  }

  zoomToCity() {
    this._parentElement.addEventListener("click", (e) => {
      const button = e.target.closest(".see-location");

      if (!button) return;

      const lat = button.getAttribute("data-lat");
      const lon = button.getAttribute("data-lon");

      this.map.setView([lat, lon], 10);
    });
  }

  renderBookmarkedCity(data) {
    const weatherData = data;

    const render = Object.values(weatherData)
      .map((key) => {
        const { address, currentConditions } = key;
        const locationName = address.charAt(0).toUpperCase() + address.slice(1);
        const cityCurrentTemp = currentConditions.temp;

        const markup = `
      <div class="bookmarked-city">
                <img
                  src="assets/icons/weathericon/clear-day.svg"
                  alt="clear-day"
                  class="weather-condition-icon"
                />

                <div class="city-name-wrapper">

                  <h2 class="city-name-label">${locationName}</h2>
                  <button class="see-location" data-lat="${
                    key.latitude
                  }" data-lon="${key.longitude}">
                    <i class="fa-solid fa-location-arrow"></i>
                  </button>

                </div>

                <h3 class="city-current-temperature">${Math.round(
                  cityCurrentTemp
                )}&deg;</h3>
        </div>
      `;

        return markup;
      })
      .join("");

    this._parentElement.innerHTML = render;
  }
}

export const mapView = new MapView();
