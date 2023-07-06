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
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="card">
  <div class="card-body">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5)
      forecastHTML =
        forecastHTML +
        `
                  <div class="container text-center">
                    <div class="row justify-content-start">
                      <div class="col-4">
                        <small
                          ><span class="weather-forecast-date">${formatDay(
                            forecastDay.time
                          )}</span> <br />
                          04/17</small
                        >
                      </div>
                    </div>
                    <div class="row justify-content-end">
                      <div class="col-4 weather-cast"><span class="col-4 tempForecast-max">${Math.round(
                        forecastDay.temperature.maximum
                      )}°</span><span class="weather-forecast-min"> ${Math.round(
          forecastDay.temperature.minimum
        )}°</span></div>
                      <div class="col-4 forecast"> 
                      <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                        forecastDay.condition.icon
                      }.png"
                        alt=""
                        width="42" /></div>
                        ${index !== 4 ? "<hr />" : ""}
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
  let apiKey = "706t692aeb44c9246o4e0036b9396dbf";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.temperature.current
  );
  let descriptionelement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  descriptionelement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

function searchEngine(city) {
  let units = "imperial";
  let apiKey = "706t692aeb44c9246o4e0036b9396dbf";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

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
