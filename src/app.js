const path = require('path');
const express = require('express');
const hbs = require('hbs');
const weather = require('./services/weather');

const app = express();

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Wheather app',
    name: 'Rick'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Rick'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Rick',
    message: 'What to do?'
  })
})

app.get('/weather', (req, res) => {
  const { location } = req.query
  if (!location) return res.send({ error: 'No location provided' })
  weather.retrieveWeather(location, (error, data) => {
    if (error) return res.send(error)
    else if (data) return res.send(data)
    else return res.send(data)
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Rick',
    message: 'Help article not found.'
  })
})

app.get('/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Rick',
    message: 'Page not found.'
  })
})

// app.get('', (req, res) => {
//   res.send('<h1>Weather</h1>')
// })

app.listen(3000, () => {
  console.log('Server started on port 3000')
});