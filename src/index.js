function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="card">
  <div class="card-body">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6)
      forecastHTML =
        forecastHTML +
        `
                  <div class="container text-center">
                    <div class="row justify-content-start">
                      <div class="col-4">
                        <small
                          ><span class="weather-forecast-date">${formatDay(
                            forecastDay.dt
                          )}</span> <br />
                          04/17</small
                        >
                      </div>
                    </div>
                    <div class="row justify-content-end">
                      <div class="col-4 weather-cast"><span class="col-4 tempForecast-max">${Math.round(
                        forecastDay.temp.max
                      )}°</span><span class="weather-forecast-min"> ${Math.round(
          forecastDay.temp.min
        )}°</span></div>
                      <div class="col-4 forecast"> 
                      <img src="https://openweathermap.org/img/wn/${
                        forecastDay.weather[0].icon
                      }@2x.png"
                        alt=""
                        width="42" /></div>
                      <hr />
                    </div>
                    <div class="row justify-content-start">
                      <div class="col-4">
                  </div>
                </div>
              </div>
`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let units = "imperial";
  let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  let descriptionelement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  descriptionelement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchEngine(city) {
  let units = "imperial";
  let apiKey = "aa09763d916df0424c840d55bfc2d2c9";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchEngine(city);
}

let dateElement = document.querySelector("#date");
let now = new Date();
let searchForm = document.querySelector("#search-form");
let searching = document.querySelector("#searching");

searchForm.addEventListener("submit", search);

dateElement.innerHTML = formatDate(now);

searchEngine("Lagos");
