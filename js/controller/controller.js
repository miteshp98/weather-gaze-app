import * as model from "../models/model.js";
import { Dom } from "../config.js";
import View from "../views/view.js";
import "regenerator-runtime";
import "core-js/stable";
import view from "../views/view.js";

const {
  form,
  search,
  mainOverviewSection,
  sevenDayForecastAside,
  citiesSearchSection,
  citiesAsideSection,
  navLinks,
  mapSection,
  mapAsideSection,
} = Dom();

const removeActiveTab = () => {
  navLinks.forEach((elem) => {
    elem.classList.remove("active-tab");
  });
};

const toggleSection = (sectionsToShow = [], sectionsToHide = []) => {
  sectionsToHide.forEach((section) => section.classList.add("hidden"));
  sectionsToShow.forEach((section) => section.classList.remove("hidden"));
};

const handleNavLink = () => {
  const showSection = (showMainSection, showAsideSection) => {
    toggleSection(
      [showMainSection, showAsideSection],
      [
        mainOverviewSection,
        sevenDayForecastAside,
        citiesSearchSection,
        citiesAsideSection,
      ]
    );
  };

  const weatherTab = navLinks[0];
  const citiesTab = navLinks[1];

  weatherTab.addEventListener("click", function (e) {
    showSection(mainOverviewSection, sevenDayForecastAside);
    removeActiveTab();
    this.classList.add("active-tab");
  });

  citiesTab.addEventListener("click", function (e) {
    showSection(citiesSearchSection, citiesAsideSection);
    removeActiveTab();
    this.classList.add("active-tab");
  });
};

const updateState = () => {
  form.addEventListener("click", function (e) {
    removeActiveTab();
    citiesSearchSection.classList.remove("hidden");
    citiesAsideSection.classList.remove("hidden");
    sevenDayForecastAside.classList.add("hidden");
    mainOverviewSection.classList.add("hidden");
    navLinks[1].classList.add("active-tab");
  });
};

const handleSearch = async (e) => {
  e.preventDefault();
  const city = search.value;

  if (!city) {
    alert("Please Enter Valid City Name");
    return;
  }

  model.addCity(city);
  await loadWeatherData();

  search.value = "";
};

const handleCityClick = () => {
  const container = citiesSearchSection;

  container.addEventListener("click", function (e) {
    const search = e.target.closest(".city-search-result");
    searchResult(search);

    if (search) {
      citiesSearchSection.classList.add("hidden");
      citiesAsideSection.classList.add("hidden");
      sevenDayForecastAside.classList.remove("hidden");
      mainOverviewSection.classList.remove("hidden");
      removeActiveTab();
      navLinks[0].classList.add("active-tab");
    } else {
      return;
    }
  });
};

function searchResult(searchValue) {
  if (!searchValue) return;

  const { cityname } = searchValue.dataset;
  const weatherData = model.getWeather()[cityname];
  View.updateClickData([weatherData]);
}

const loadWeatherData = async () => {
  const weatherData = await model.createObject();
  View.render(weatherData);
};

const init = () => {
  form.addEventListener("submit", handleSearch);
  loadWeatherData();
  updateState();
  handleNavLink();
  handleCityClick();
};

init();
