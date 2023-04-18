const input = document.querySelector(".input");
const search = document.querySelector(".search");
const place = document.querySelector(".place");
const inputField = document.querySelector(".input-field");
const mainField = document.querySelector(".main-field");
const moreInfo = document.querySelector(".more-info");
const newSearch = document.querySelector(".new-search");

// const myApiKey = config.TZ_API_KEY;


//Functions
async function getPositionInfo(place) {
  const url = `https://geocode.maps.co/search?q={${place}}`

  const response = await fetch(url);

  const data = await response.json();

  const latitude = data[0].lat;
  const longitude = data[0].lon;
  console.log(latitude)
  console.log(longitude);

  return latitude, longitude;
};

async function getTimeZone(latitude, longitude) {
  const timeUrl = `https://api.timezonedb.com/v2.1/get-time-zone?key=${myApiKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`
  
  const resp = await fetch(timeUrl);
  const data = await resp.json();

  const timeZone = data.zoneName; 
  console.log(timeZone);
}


//Events
search.addEventListener("click", (e) => {
  e.preventDefault();
  const inputValue = input.value;

  if (inputValue == "") {
    input.classList.add("input-error");
    input.setAttribute("placeholder", "Put a valid place!")
  } else {

    getPositionInfo(inputValue);
    getTimeZone(latitude, longitude);

    place.innerHTML = inputValue;
    input.setAttribute("placeholder", "Input a place");
    input.classList.remove("input-error")
    inputField.classList.add("hide");
    mainField.classList.remove("hide");
    moreInfo.classList.remove("hide");

    input.value = "";
  }
});

newSearch.addEventListener("click", () => {
  place.innerHTML = "";

  inputField.classList.remove("hide");
  mainField.classList.add("hide");
  moreInfo.classList.add("hide");
});

// const currentDate = new Date();

// console.log(currentDate);
// console.log(currentDate.getTime());
// console.log(currentDate.getTimezoneOffset());

// const brzDate = new Date().toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"})
// console.log("I'ts " + brzDate + " in Brazil");

// const newYorkDate = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
// console.log("I'ts " + newYorkDate + " in NY City.");