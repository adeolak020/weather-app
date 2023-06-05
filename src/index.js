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
  console.log(response.data);
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
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  forecastElement.innerHTML = `            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <div class="container text-center">
                    <div class="row justify-content-start">
                      <div class="col-4">
                        <small
                          >MON <br />
                          04/17</small
                        >
                      </div>
                    </div>
                    <div class="row justify-content-end">
                      <div class="col-4">67°</div>
                      <div class="col-4 forecast">🌧</div>
                      <hr />
                    </div>
                    <div class="row justify-content-start">
                      <div class="col-4">
                        <small
                          >TUE <br />
                          04/18</small
                        >
                      </div>
                    </div>
                    <div class="row justify-content-end">
                      <div class="col-4">75°</div>
                      <div class="col-4 forecast">🌦</div>
                      <hr />
                    </div>
                    <div class="row justify-content-start">
                      <div class="col-4">
                        <small
                          >WED <br />
                          04/19</small
                        >
                      </div>
                    </div>
                    <div class="row justify-content-end">
                      <div class="col-4">83°</div>
                      <div class="col-4 forecast">🌥</div>
                      <hr />
                    </div>
                    <div class="row justify-content-start">
                      <div class="col-4">
                        <small
                          >THU <br />
                          04/20</small
                        >
                      </div>
                    </div>
                    <div class="row justify-content-end">
                      <div class="col-4">86°</div>
                      <div class="col-4 forecast">🌤</div>
                      <hr />
                    </div>
                    <div class="row justify-content-start">
                      <div class="col-4">
                        <small
                          >FRI <br />
                          04/21</small
                        >
                      </div>
                    </div>
                    <div class="row justify-content-end">
                      <div class="col-4">82°</div>
                      <div class="col-4 forecast">🌤</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
`;
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

displayForecast();

let dateElement = document.querySelector("#date");
let now = new Date();
let searchForm = document.querySelector("#search-form");
let searching = document.querySelector("#searching");

searchForm.addEventListener("submit", search);

dateElement.innerHTML = formatDate(now);

searchEngine("Lagos");
