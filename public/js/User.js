const reservationsEl = document.getElementsByClassName('btn-delete')

//entering reservation data 
const reservationFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the new reservation form in dashboard.handlebars
  const dog_name = document.querySelector('#dog-name').value.trim();
  const breed = document.querySelector('#dog-breed').value.trim();
  const age = document.querySelector('#dog-age').value.trim();
  const stay_length = document.querySelector('#dog-stay').value.trim();
  const reservation_date = document.querySelector('#reservation-day').value.trim();


  if (dog_name && breed && age && stay_length && reservation_date) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/reservation', {
      method: 'POST',
      body: JSON.stringify({ dog_name, breed, age, stay_length, reservation_date }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the reservation page
      document.location.replace('/user')
    } else {
      alert(response.statusText);
    }
  };
};

function deleteReservation(event) {
  const id = event.target.dataset.id
  fetch('/api/reservation/' + id, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json'},
  }).then(function(response) {
    return response.json()
  }).then(function(data) {
    document.location.reload()
  })
}

document
  .querySelector('.new-reservation')
  .addEventListener('submit', reservationFormHandler);
//need to connect with an api end point that will use reservation model 

for (var i = 0; i < reservationsEl.length; i++ ) {
  var btn = reservationsEl[i]
  btn.addEventListener('click', deleteReservation)
};