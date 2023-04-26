const display = document.querySelector(".display");
const input = document.querySelector(".input");
const search = document.querySelector(".search");
const place = document.querySelector(".place");
const inputField = document.querySelector(".input-field");
const mainField = document.querySelector(".main-field");
const time = document.querySelector(".time-info");
const localTimeSpan = document.querySelector(".local-time");
const moreInfo = document.querySelector(".more-info");
const newSearch = document.querySelector(".new-search");
const backgroundImgContainer = document.querySelector(".container")

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

  changeBackgroundImage(placeName);

  return zoneName;
}

async function getPlaceTime(zoneName) {
  const timeZone = await zoneName;
  const currentPlaceTime = new Date().toLocaleTimeString("en-US", {
    timeZone: `${timeZone}`,
  });

  localTimeSpan.innerHTML = getLocalTime();

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

function changeBackgroundImage(term) {
  const photo = `https://source.unsplash.com/1280x720/?${term}`

  // console.log(photo); 

  backgroundImgContainer.style.backgroundImage = `url("${photo}")`
}

function getLocalTime() {
  const time = new Date();
  const localHours = time.getHours();
  const localMinutes = time.getMinutes();
  const localTime = `${localHours}:${localMinutes}`;

  // console.log(localTime);

  return localTime;
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
      const currentPlaceTime = resp;

      replaceInfo(currentPlaceTime);
      // console.log(currentPlaceTime);
    });

    display.style.backgroundColor = "#cac4c471";
    input.value = "";
  }
});

newSearch.addEventListener("click", () => {
  place.innerHTML = "";

  display.style.backgroundColor = "transparent";
  inputField.classList.remove("hide");
  mainField.classList.add("hide");
  moreInfo.classList.add("hide");
});
