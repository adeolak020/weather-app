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

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
}

function searchEngine(city) {
  let units = "metric";
  let apiKey = "8d9838178b5b401f1b4e7cb5af18e210";
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