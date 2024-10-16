export default class WeatherDashboard {
  navlinks = document.querySelectorAll(".nav-link");
  sections = document.querySelectorAll("section");

  clearLoader() {
    const loader = document.querySelector(".center-loader");

    if (loader) loader.remove();
  }

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

  getWeekDays(date) {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const currentDate = new Date(date);
    const dayName = weekdays[currentDate.getDay()];
    return dayName;
  }

  renderError(html) {
    const errorContainer = document.querySelector(".error");

    const markup = html;

    errorContainer.insertAdjacentHTML("afterbegin", markup);

    this.sections.forEach((section) => (section.innerHTML = ""));

    this.clearLoader();
  }

  removeActiveTab() {
    this.navlinks.forEach((nav) => {
      nav.classList.remove("active-tab");
      nav.removeAttribute("aria-current");
    });
  }

  removeActiveSection() {
    this.sections.forEach((section) => {
      section.classList.add("hidden");
    });
  }

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

  handleCTAButton() {
    const citiesSection = document.querySelector("#cities");
    const errorContainer = document.querySelector(".error");

    errorContainer.addEventListener("click", (e) => {
      const button = e.target.closest(".cities-sec-btn");

      if (!button) return;

      this.removeActiveTab();
      this.removeActiveSection();

      citiesSection.classList.remove("hidden");
      this.navlinks[1].classList.add("active-tab");
      this.navlinks[1].setAttribute("aria-current", "page");

      errorContainer.innerHTML = "";
    });
  }
}
