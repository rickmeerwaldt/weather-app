const request = require('request');

const geoCode = (location, callback) => {
  const token = 'pk.eyJ1Ijoicmlja29zIiwiYSI6ImNqemRxaGd6ajAxajgzbXFtNnl2cHZ0cnYifQ.9P23Fs2EHPD9KueeoiH54Q';
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${token}&limit=1`
  request(url, { json: true }, (error, response) => {
    let errorResponse = undefined;
    let dataResponse = undefined
    if (error) {
      errorResponse = 'Unable to connect to geoCoding service'
    } else if (response.body.features.length === 0) {
      errorResponse = 'Unable to find coordinates';
    } else {
      const { features } = response.body;
      const longtitude = features[0].center[0]
      const latitude = features[0].center[1]
      const location = features[0].place_name;
      dataResponse = { longtitude, latitude, location };
    }
    callback(errorResponse, dataResponse)
  })
}

module.exports = { geoCode };
