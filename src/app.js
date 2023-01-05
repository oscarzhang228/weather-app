const locationButton = document.getElementById("locationBtn");
const locations = document.getElementById("location");
const spinner = document.getElementById("loading");
const state = document.getElementById("state");
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
        q: "${locations.value},${state},USA",
        limit: 1,
        appid: apiKey,
      })
  );
  const converted = await latLong.json();
  const lat = converted.lat;
  const long = converted.long;
  alert(lat + long);

  const weather = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?" +
      new URLSearchParams({
        lat: lat,
        lon: long,
        appid: apiKey,
      })
  );
  const weatherJson = await weather.json();
  //take this, add picture weather, and temperature
});
