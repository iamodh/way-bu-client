const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const CITY_ID = 1838519;
const API_KEY = "4c520b7c67d720e53bc4dbf7903d8f3c";

export function getWeather() {
  return fetch(
    `${BASE_URL}?id=${CITY_ID}&appid=${API_KEY}&lang=kr&units=metric`
  ).then((response) => response.json());
}
