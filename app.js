import * as ELEMENTS from './element.js';
import { Http } from './http.js';
import { WeatherData, WEATHER_PROXY_HANDLER  } from './weather-data.js';

const API_KEY = '4f901dbdbce1f834ec7b54ef11265efa';
ELEMENTS.ELEMENT_SEARCH_BUTTON.addEventListener('click', searchWeather);

function searchWeather() {
  const CITY_NAME = ELEMENTS.ELEMENT_SEARCH_CITY.value.trim();
  if (CITY_NAME.length === 0 ) {
    return alert('Please enter a city name');
  }
  // alert(CITY_NAME);

  ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'block';
  ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'none';
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}`;
  Http.fetchData(URL)
  .then(responseData => {
const WEATHER_DATA = new WeatherData(CITY_NAME, responseData.weather[0].description.toUpperCase());
const WEATHER_PROXY = new Proxy(WEATHER_DATA, WEATHER_PROXY_HANDLER);
WEATHER_PROXY.temperature = responseData.main.temp;
updateWeather(WEATHER_PROXY);
  })
  .catch(error => alert(error));
}

function updateWeather(weatherData) {
  ELEMENTS.ELEMENT_WEATHER_CITY.textContent = weatherData.cityName;
  ELEMENTS.ELEMENT_WEATHER_DESCRIPTION.textContent = weatherData.description;
  ELEMENTS.ELEMENT_WEATHER_TEMPERATURE.textContent = weatherData.temperature;
  

  ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'block';
  ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'none';
  
  
}
