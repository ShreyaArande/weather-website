const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const forecastURL =
      "http://api.weatherstack.com/current?access_key=732dd3c0616d57c43271b1528537bf90&query=" +
      latitude +
      " , " +
      longitude +
      "&units=m";
    request({ url: forecastURL, json: true }, (error, {body}) => {
      if (error) {
        callback("Unable to connect to the services", undefined);
      } else if (body.error) {
        callback("Unable to connct to the weather api", undefined);
      } else {
        callback(
          undefined,
          "The current temperature is " +
            body.current.temperature +
            " But it feels like " +
           body.current.feelslike
        );
      }
    });
  };

  module.exports = forecast;