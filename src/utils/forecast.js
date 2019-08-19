const request = require('request');

const forecast = (latitude, longtitude, callback) => {
  const url = `https://api.darksky.net/forecast/71dad4e96d425aed8432a04a06532147/${encodeURIComponent(latitude)},${encodeURIComponent(longtitude)}?lang=nl&units=si`;

  request(url, { json: true }, (error, { body } = {}) => {
    if (error) callback('unable to connect to weather service');
    else if (body.error) callback('Unable to find location');
    else {
      const { currently } = body;
      callback(undefined, `It is currently ${currently.temperature} degrees out. There is a ${currently.precipProbability}% chance of rain.`);
    }
  })
}

module.exports = { forecast }