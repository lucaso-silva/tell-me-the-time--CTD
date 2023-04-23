const myApiKey = config.TZ_API_KEY;
let latInfo;
let longInfo;

async function getPlacePosition(placeName) {
    const url1 = `https://geocode.maps.co/search?q={${placeName}}`;
    const response = await fetch(url1);
    const data = await response.json();
    const latInfo = data[0].lat;
    const longInfo = data[0].lon;
    
    return latInfo;
}

async function getTimeZoneInfo(lat, long) {
    const url2 = `https://api.timezonedb.com/v2.1/get-time-zone?key=${myApiKey}&format=json&by=position&lat=${lat}&lng=${long}`;
    const resp = await fetch(url2);
    const data = await resp.json();
}

getPlacePosition("Recife")
.then((response) => {
    console.log(latInfo, longInfo);
    getTimeZoneInfo(latInfo, longInfo);
})
.catch((err) => {
    console.log("error: " + err);
})
