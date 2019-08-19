console.log('Client side JS file is loaded')

// fetch('http://localhost:3000/weather?location=zaandam').then((response) => {
//   response.json().then(({ data, error }) => {
//     if (error) console.log(error)
//     else console.log(data)
//   })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input');

// const msg1 = document.querySelector('#msg1');
// const msg2 = document.querySelector('#msg2');

// successMessage.textContent = ''
// errorMessage.textContent = ''


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value

  msg1.textContent = 'Loading...'
  msg2.textContent = ''

  fetch(`/weather?location=${location}`).then((response) => {
    response.json().then(({ data, error }) => {
      if (error) {
        msg1.textContent = '';
        msg2.textContent = error;
      }
      else {
        msg1.textContent = data.location;
        msg2.textContent = data.forecast;

      }
    })
  })

})