# Weather Gaze

**Weather Gaze** is a modern, customizable weather dashboard that provides real-time weather forecasts, current weather conditions, a 7-day outlook, and weather-related information like air quality. With options to customize units, Weather Gaze helps users stay informed about the weather wherever they are. It's built using HTML, CSS, JavaScript, and FontAwesome for icons, and SCSS for styling.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Build and Deployment](#build-and-deployment)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Real-Time Weather Data**: Displays current weather conditions, including temperature, humidity, and wind speed.
- **Current Weather Display:** Shows the current weather conditions for a selected city.
- **7-Day Forecast:** Provides a detailed weekly weather forecast.
- **Dynamic City Search:** Allows users to search for weather data by city.
- **Map Integration:** Displays locations on a map with weather details using Leaflet.js.
- **User-Friendly Navigation:** Smooth transitions between sections with clear tab indicators.
- **Responsive Design:** Fully responsive interface for optimal viewing on various devices.
- **Error Handling:** Displays error messages for invalid searches or API failures.

---

## Technologies Used

The following technologies and libraries are used in **Weather Gaze**:

- **HTML5**: For structure and content.
- **CSS3 / SCSS**: For responsive design and visual styling.
- **JavaScript (ES6+)**: Core logic, interaction, and API calls.
- **Parcel**: Module bundler for development and production builds.
- **FontAwesome**: For vector icons and social logos.
- **SASS**: For styling with variables and mixins.
- **Core-js and Regenerator-runtime**: Polyfills to support older browsers.
- **Leaflet.js**: Map functionalities to display weather data locations.

---

## Installation

Before running the project, ensure you have the following software installed:

- **Node.js** (v12 or higher)
- **npm** (comes with Node.js)

### Steps to install:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/weather-gaze.git
   cd weather-gaze
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the project locally**:
   ```bash
   npm start
   ```

---

## API Integration

The application fetches weather data using a weather API. Ensure you have an API key (if required) and replace the placeholder in the JavaScript files.

```javascript
const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
```

## Acknowledgments

- **visualcrossing** for providing weather data.
- **Leaflet.js** for the map functionalities.
- Icons sourced from various open sources.
