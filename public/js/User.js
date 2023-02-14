//entering reservation data 
const reservationFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the new reservation form in dashboard.handlebars
  const name = document.querySelector('#dog-name').value.trim();
  const breed = document.querySelector('#dog-breed').value.trim();
  const age = document.querySelector('#dog-age').value.trim();
  const stayLength = document.querySelector('#dog-stay').value.trim();


  if (name && breed && age && stayLength) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ name, breed, age, stayLength }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the reservation page
      document.location.replace('/user');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.new-reservation')
  .addEventListener('submit', reservationFormHandler);
//need to connect with an api end point that will use reservation model 