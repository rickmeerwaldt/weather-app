const geocode = require('../utils/geocode')
const { forecast } = require('../utils/forecast')

function retrieveWeather(location, callback) {
  if (!location) return callback({ error: 'No location is provided' });

  geocode.geoCode(location, (error, { latitude, longtitude, location } = {}) => {

    if (error) return callback({ error })

    forecast(latitude, longtitude, (error, forecast) => {

      if (error) return callback({ error })

      return callback(undefined, { data: { forecast, location } })
    });
  });
}

module.exports = { retrieveWeather }