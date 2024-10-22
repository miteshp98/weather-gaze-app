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

// Main class for the Weather Dashboard application
export default class WeatherDashboard {
  navlinks = Array.from(document.querySelectorAll(".nav-link"));
  sections = document.querySelectorAll("section");

  // Object mapping weather condition types to their respective icons
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

  // Method to clear the loading indicator
  clearLoader() {
    const loader = document.querySelector(".center-loader");

    if (loader) loader.remove();
  }

  // Converts 24-hour format time to 12-hour format with AM/PM
  convertTo12HourFormat(time) {
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

  // Returns the weekday name based on a given date
  getWeekDays(date) {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const currentDate = new Date(date);
    const dayName = weekdays[currentDate.getDay()];
    return dayName;
  }

  // Renders an error message in the designated error container
  renderError(html) {
    const errorContainer = document.querySelector(".error");

    const markup = html;

    errorContainer.insertAdjacentHTML("afterbegin", markup);

    this.sections.forEach((section) => (section.innerHTML = ""));

    this.clearLoader();
  }

  // Removes the active class from all navigation tabs
  removeActiveTab() {
    this.navlinks.forEach((nav) => {
      nav.classList.remove("active-tab");
      nav.removeAttribute("aria-current");
    });
  }

  // Hides all sections of the dashboard
  removeActiveSection() {
    this.sections.forEach((section) => {
      section.classList.add("hidden");
    });
  }

  // Handles the navigation link clicks for switching sections
  handleNavLinks() {
    this.navlinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        this.removeActiveTab();

        link.classList.add("active-tab");
        link.setAttribute("aria-current", "page");

        this.removeActiveSection();

        const targetSection = document.querySelector(link.getAttribute("href"));

        if (!targetSection) return;

        targetSection.classList.remove("hidden");
      });
    });
  }
}
