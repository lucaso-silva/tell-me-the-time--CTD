const myApiKey = config.TZ_API_KEY;
const place = "Vancouver"
let latitude;
let longitude;

const url1 = `https://geocode.maps.co/search?q={${place}}`


const placePosition = fetch(url1)

placePosition
.then((response) => {
  if(!response.ok) {
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
})

const timeZone = fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=${myApiKey}&format=json&by=position&lat=${placePosition.latitude}&lng=${placePosition.longitude}`);

timeZone
.then((response) => {
  if(!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  return response.json();
})
.then((data) => {
  const zoneName = data.zoneName;
  
  const currentTime = new Date().toLocaleTimeString("en-US", {timeZone: `${zoneName}`});
  console.log(currentTime);

}) 


// currentPlaceTime.then((response) => {
//   const currentTime = new Date().toLocaleTimeString("en-US", {timeZone: `${zoneName}`});
//   console.log(currentTime);
// })

Promise.all([placePosition, timeZone])
.then((responses) => {
  for (const response of responses) {
    console.log(`${response.url}: ${response.status}`)
  }
})
.catch((error) => {
  console.error(`Falha ao buscar: ${error}`)
});