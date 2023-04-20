const myApiKey = config.TZ_API_KEY;

const getCurrentPlaceTime = async (place) => {

    const response = await fetch(`https://geocode.maps.co/search?q={${place}}`);
    const data = await response.json()
    
    const latitude = data[0].lat;
    const longitude = data[0].lon;

    return latitude, longitude;
    // console.log("Lat: " + latitude, "long: " + longitude);

}

//     return latitude, longitude

//   } catch (err) {
//     console.log(err);

//   }
// };

const getTimeZone = async(latitude, longitude) => {
    const timeUrl = `https://api.timezonedb.com/v2.1/get-time-zone?key=${myApiKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`
  
    const resp = await fetch(timeUrl);
    const data = await resp.json();
  
    const zoneName = data.zoneName; 
    console.log(zoneName);
  
    return zoneName;
}

const getCurrentTime = (zoneName) => {
    const currentPlaceTime = new Date().toLocaleTimeString("en-US", {timeZone: `${zoneName}`});
    // return currentPlaceTime;
    console.log(currentPlaceTime);
}

getCurrentPlaceTime("Recife").then((response) => {
  if(!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  return response.json();
})

.then((latitude, longitude) =>{
  getTimeZone(latitude,longitude).then((response)=>{
    if(!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    } else {
      return response.json();
    }
  })
})

.then((zoneName)=>{
  getCurrentTime(zoneName);

})