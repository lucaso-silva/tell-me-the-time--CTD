# Tell-me-the-time--CTD

https://github.com/lucaso-silva/tell-me-the-time--CTD/assets/97140968/7b2e7027-7541-4d32-b1b8-2972dd9dbab1

## Overview
This application was developed to improve my HTML, CSS, and JavaScript abilities. 
Through this it's possible to know about the current time at any place, it also displays the current local time.

> Status: Concluded

---

### Objectives
- Build the optimal layout for the app depending on the device's screen size ✅
- Integrate the application with the TimeZones API ✅
- Receive an error message when the input is submitted empty ✅
- Show information about the time in the searched place ✅
- Show information about current local time ✅
- Display as background some picture related to the place searched ✅  

## Built with
- Semantic HTML5 markup
- CSS custom properties
- JavaScript
- Flexbox
- CSS-grid

## What I learned 💡
This project was challenging, and I could practice more about asynchronous programming in JavaScript.

The main difficulty was finding an API that provides accurate time information about a place inputted. This wasn’t possible using only one free online API, so I needed to work with two different ones.

The first API used was [MAPS – Free Geocoding API]( https://geocode.maps.co/), which returned me with the place searched latitude and longitude. 

Using the latitude and longitude info received, the second API - [TimeZoneDB]( https://timezonedb.com/) - provided me with the TimeZone name. 

```JavaScript
async function getPlacePosition(placeName) {
  const url1 = `https://geocode.maps.co/search?q={${placeName}}`;
  const response = await fetch(url1);
  const data = await response.json();
  
  return data;
}

async function getTimeZoneName(data) {
  const newData = await data;
  const latitude = newData[0].lat;
  const longitude = newData[0].lon;

  const url2 = `https://api.timezonedb.com/v2.1/get-time-zone?key=${myApiKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`;
  const resp = await fetch(url2);
  const data2 = await resp.json();

  const placeName = data2.cityName;
  const zoneName = data2.zoneName;

  place.innerHTML = placeName;

  changeBackgroundImage(placeName);

  return zoneName;
}
```
Knowing the timeZoneName was possible to discover the current time in the place searched, using the JavaScript method `Date.prototype.toLocaleTimeString()`

```JavaScript
async function getPlaceTime(zoneName) {
  const timeZone = await zoneName;
  const currentPlaceTime = new Date().toLocaleTimeString("en-US", {
    timeZone: `${timeZone}`,
  });

  localTimeSpan.innerHTML = getLocalTime();

  return currentPlaceTime;
}
```
Still using JavaScritp `Date` method was possible to obtain the current local time. 
```JavaScript 
function getLocalTime() {
  const time = new Date();
  const localHours = time.getHours();
  const localMinutes = time.getMinutes();
  const localTime = `${localHours}:${localMinutes}`;

  // console.log(localTime);

  return localTime;
}
```

The background image was changed using the photos provided by the [Unsplash API](https://unsplash.com/documentation).
```JavaScript 
function changeBackgroundImage(term) {
  const photo = `https://source.unsplash.com/1280x720/?${term}`

  // console.log(photo); 

  backgroundImgContainer.style.backgroundImage = `url("${photo}")`
}
```
---
### 🛠️ Continued development

The next steps will be focused on coding refactoring.

Implement a method to hide my TimeZone API KEY in the BackEnd, turning this application able to be used by anyone.
