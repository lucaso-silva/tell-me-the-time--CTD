const input = document.querySelector(".input");
const search = document.querySelector(".search");
const place = document.querySelector(".place");
const inputField = document.querySelector(".input-field");
const mainField = document.querySelector(".main-field");
const time = document.querySelector(".time-info");
const moreInfo = document.querySelector(".more-info");
const newSearch = document.querySelector(".new-search");
// let latitude;
// let longitude;
// let timeInfo;

// const myApiKey = config.TZ_API_KEY;

function getTimeInformation(inputValue) {
  const url1 = `https://geocode.maps.co/search?q={${inputValue}}`;
  const url2 = `https://api.timezonedb.com/v2.1/get-time-zone?key=${myApiKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`;
  const placePosition = fetch(url1);

  placePosition
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      latitude = data[0].lat;
      longitude = data[0].lon;

      console.log(latitude, longitude);
      return latitude, longitude;
    })
    .catch((error) => {
      console.error(`Não foi possivel obter produtos: ${error}`);
    });

  const timeZone = fetch(url2);

  timeZone
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const zoneName = data.zoneName;

      const currentTime = new Date().toLocaleTimeString("en-US", {
        timeZone: `${zoneName}`,
      });
      console.log(currentTime);
      const timeInfo = currentTime;
      console.log(typeof timeInfo);
      return timeInfo;
    });

  Promise.all([placePosition, timeZone])
    .then((responses) => {
      for (const response of responses) {
        console.log(`${response.url}: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error(`Falha ao buscar: ${error}`);
    });
}

async function replaceInfo(inputValue, timeInfo) {
  place.innerHTML = await inputValue;
  time.innerHTML = await timeInfo;
  input.setAttribute("placeholder", "Input a place");
  input.classList.remove("input-error");
  inputField.classList.add("hide");
  mainField.classList.remove("hide");
  moreInfo.classList.remove("hide");
};

//Events
search.addEventListener("click", (e) => {
  e.preventDefault();
  const inputValue = input.value;

  if (inputValue == "") {
    input.classList.add("input-error");
    input.setAttribute("placeholder", "Put a valid place!");
  } else {
    getTimeInformation(inputValue);
    replaceInfo(inputValue, timeInfo);

    input.value = "";
  }
});

newSearch.addEventListener("click", () => {
  place.innerHTML = "";

  inputField.classList.remove("hide");
  mainField.classList.add("hide");
  moreInfo.classList.add("hide");
});
