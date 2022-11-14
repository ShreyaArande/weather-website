const request = require('request');

const geocode = (address, callback) => {
    const geocodeURL =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURIComponent(address) +
      ".json?access_token=pk.eyJ1Ijoic2hyZXlhYWEiLCJhIjoiY2xhOWk5Y3ZmMDd2YTNwcGJxZ2d3eGx1cSJ9.ydAptJy2NjKrVmmS7xGw6A&linit=1";
      request({ url: geocodeURL, json: true }, (error, { body }) => {
          console.log(body.features[0])
              if(error){
                  callback('Unable to connect to location services.Please check the internet connectivity and try again', undefined);
              }else if(body.features.length === 0){
                 callback('Unable to find location. Please try another search', undefined)
              }else{
                  callback(undefined, {
                      latitude: body.features[0].center[1],
                      longitude:body.features[0].center[0],
                      location: body.features[0].place_name
                  })
              }
          })
  }

  module.exports = geocode;
  