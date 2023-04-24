const input = document.querySelector(".input");
const search = document.querySelector(".search");
const place = document.querySelector(".place");
const inputField = document.querySelector(".input-field");
const mainField = document.querySelector(".main-field");
const time = document.querySelector(".time-info");
const moreInfo = document.querySelector(".more-info");
const newSearch = document.querySelector(".new-search");

const myApiKey = config.TZ_API_KEY;

//Functions
async function getPlacePosition(placeName) {
  const url1 = `https://geocode.maps.co/search?q={${placeName}}`;

  const response = await fetch(url1);
  const data = await response.json();
  // console.log(data);
  return data;
}

async function getTimeZoneName(data) {
  const newData = await data;
  const latitude = newData[0].lat;
  const longitude = newData[0].lon;

  // console.log(latitude, longitude);

  const url2 = `https://api.timezonedb.com/v2.1/get-time-zone?key=${myApiKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`;
  const resp = await fetch(url2);
  const data2 = await resp.json();
  
  const placeName = data2.cityName;
  const zoneName = data2.zoneName;
  
  // console.log(placeName)
  place.innerHTML = placeName;
  // console.log(zoneName);
  return zoneName;
}

async function getPlaceTime(zoneName) {
  const timeZone = await zoneName;
  const currentPlaceTime = new Date().toLocaleTimeString("en-US", {
    timeZone: `${timeZone}`,
  });
  return currentPlaceTime;
}

async function replaceInfo(timeInfo) {
  
  time.innerHTML = await timeInfo;
  input.setAttribute("placeholder", "Input a place");
  input.classList.remove("input-error");
  inputField.classList.add("hide");
  mainField.classList.remove("hide");
  moreInfo.classList.remove("hide");
}

//Events
search.addEventListener("click", (e) => {
  e.preventDefault();
  const inputValue = input.value;

  if (inputValue == "") {
    input.classList.add("input-error");
    input.setAttribute("placeholder", "Put a valid place!");
  } else {
    getPlaceTime(getTimeZoneName(getPlacePosition(inputValue))).then((resp) => {
      const currentTime = resp;
      
      replaceInfo(currentTime);
      console.log(currentTime);
    });

    input.value = "";
  }
});

newSearch.addEventListener("click", () => {
  place.innerHTML = "";

  inputField.classList.remove("hide");
  mainField.classList.add("hide");
  moreInfo.classList.add("hide");
});
