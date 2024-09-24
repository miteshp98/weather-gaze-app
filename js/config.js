export const URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
export const API_KEY = "LDLZD5U6GVYWG8UCB7MTZ84ZL";
export const UNITS = "metric";

export const Dom = () => {
  const form = document.querySelector("form");
  const search = form.children[0];
  const mainOverviewSection = document.querySelector(".main-overview-section");
  const citiesSearchSection = document.querySelector(".cities-search-section");
  const sevenDayForecastAside = document.querySelector(".sevenday-forecast");
  const citiesAsideSection = document.querySelector(".city-aside-section");
  const navLinks = document.querySelectorAll(".nav-link");
  const mapSection = document.querySelector(".map-section");
  const mapAsideSection = document.querySelector(".map-aside-section");

  return {
    form,
    search,
    mainOverviewSection,
    sevenDayForecastAside,
    citiesSearchSection,
    citiesAsideSection,
    mapSection,
    mapAsideSection,
    navLinks,
  };
};
