import WeatherDashboard from "./dashboard.js";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Manually import the marker icon images
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

class MapView extends WeatherDashboard {
  _data;
  _mapSection = document.querySelector(".map-section");
  _bookmarkContainer = document.querySelector(".bookmarked-city-container");
  _popupCloseSec = 2.5;
  constructor() {
    super();
    this.map = null;
  }

  // Receives data and triggers rendering of bookmarked cities and markers on the map
  _getData(data) {
    this._data = data;

    this.renderBookmarkedCity(this._data);

    if (this.map) {
      this.renderCityMarker(this._data);
    }
  }

  // Handles the event for the map button to show the map
  _handleMapBtn() {
    const btn = document.querySelector(".show-map-btn");

    btn.addEventListener("click", () => {
      btn.classList.add("hidden");
      this._toggleMap();
    });
  }

  // Toggles the visibility of the map container
  _toggleMap() {
    const mapContainer = document.querySelector("#map");

    if (mapContainer.classList.contains("hidden")) {
      mapContainer.classList.remove("hidden");

      // If the map is not yet initialized, render it
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

  // Initializes the map with a specific view
  rendermap() {
    this.map = L.map("map").setView([15, 0], 1);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
  }

  // Renders city markers on the map based on the provided data
  renderCityMarker(data) {
    const locations = data;

    const customIcon = L.icon({
      iconUrl: markerIcon,
      iconRetinaUrl: markerIconRetina,
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // Loop through each location to create markers
    Object.values(locations).forEach((city) => {
      const { currentConditions, address } = city;
      const locationName = address.charAt(0).toUpperCase() + address.slice(1);
      const icon = this._weatherIconObject[currentConditions.icon];

      const marker = L.marker([city.latitude, city.longitude], {
        icon: customIcon,
      }).addTo(this.map);

      marker.bindPopup(`
        <h3 class="location-name">${locationName}</h3>
        <img src="${icon}" alt="${currentConditions.icon}" class='we-icon'/>
        <p class="location-temp">${Math.round(currentConditions.temp)}&deg;</p>
        <button class="zoom-to-btn" data-lat="${city.latitude}" data-lon="${
        city.longitude
      }"><i class="fa-solid fa-location-arrow"></i></button>
        `);

      marker.on("click", () => {
        marker.openPopup();

        setTimeout(() => {
          marker.closePopup();
        }, this._popupCloseSec * 1000);
      });
    });
  }

  // Controls the direct zoom functionality on the map
  controlDirectZoomBtn() {
    this._mapSection.addEventListener("click", (e) => {
      const button =
        e.target.closest(".see-location") ?? e.target.closest(".zoom-to-btn");

      if (!button) return;

      const lat = button.getAttribute("data-lat");
      const lon = button.getAttribute("data-lon");

      this.map.setView([lat, lon], 10);
    });
  }

  // Renders the list of bookmarked cities in the UI
  renderBookmarkedCity(data) {
    const weatherData = data;

    const render = Object.values(weatherData)
      .map((key) => {
        const { address, currentConditions } = key;
        const locationName = address.charAt(0).toUpperCase() + address.slice(1);
        const cityCurrentTemp = currentConditions.temp;
        const icon = this._weatherIconObject[currentConditions.icon];

        const markup = `
      <div class="bookmarked-city">
                <img
                  src="${icon}"
                  alt="${currentConditions.icon}"
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

    this._bookmarkContainer.innerHTML = render;
  }
}

export const mapView = new MapView();
