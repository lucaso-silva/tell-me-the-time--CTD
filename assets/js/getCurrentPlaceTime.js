// const myApiKey = config.TZ_API_KEY;
const place = "Maceio"
let latitude = 51.5072
let longitude = -0.1275

const url1 = `https://geocode.maps.co/search?q={${place}}`
const url2 = `https://api.timezonedb.com/v2.1/get-time-zone?key=${myApiKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`

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

const timeZone = fetch(url2);

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

Promise.all([placePosition, timeZone])
.then((responses) => {
  for (const response of responses) {
    console.log(`${response.url}: ${response.status}`)
  }
})
.catch((error) => {
  console.error(`Falha ao buscar: ${error}`)
});