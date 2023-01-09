const locationButton = document.getElementById("locationBtn");
const locations = document.getElementById("location");
const spinner = document.getElementById("loading");
const state = document.getElementById("state");
const card = document.getElementById("theCard");
card.style.display = "none";
//probably shouldn't do this but prob won't use it that much
const apiKey = "ba019c1ac4809c860e9857f1d38f39c7";
spinner.style.display = "none";

locationButton.addEventListener("click", async () => {
  if (locations.value === "" || state.value == "") {
    alert("Please enter a location");
    return;
  }
  spinner.style.display = "flex";

  const latLong = await fetch(
    "http://api.openweathermap.org/geo/1.0/direct?" +
      new URLSearchParams({
        q: locations.value,
        limit: 1,
        appid: apiKey,
      })
  );
  const converted = await latLong.json();

  const lat = converted[0].lat;
  const long = converted[0].lon;

  const weather = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?" +
      new URLSearchParams({
        lat: lat,
        lon: long,
        appid: apiKey,
      })
  );
  const weatherJson = await weather.json();
  let temperature = 1.8 * (weatherJson.main.temp - 273) + 32;
  temperature = Math.round(temperature);
  const description = weatherJson.weather[0].main;
  console.log(temperature + " " + description);
  const date = new Date();
  let time = date.getHours() + ":" + date.getMinutes();
  const cardTime = document.getElementById("cardTime");
  cardTime.textContent = time;
  const cardTemp = document.getElementById("cardTemp");
  cardTemp.textContent = temperature + "\u00B0";
  const cardDescription = document.getElementById("cardDescription");
  cardDescription.textContent = description;
  const cardLocation = document.getElementById("cardLocation");
  cardLocation.textContent =
    locations.value.charAt(0).toUpperCase() + locations.value.slice(1);
  const cardImg = document.getElementById("cardPic");
  cardImg.src = `./images/${description}.png`;
  card.style.display = "flex";
  spinner.style.display = "none";
});
