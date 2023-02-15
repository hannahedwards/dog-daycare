const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },// will have to look into?
    });

    if (response.ok) {
      // If successful, redirect the browser to the reservation page
      document.location.replace('/user');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => { //when registered, it takes you immediately to /user in homeRoutes
  event.preventDefault(); //user endpoint route is the dashboard.handlebars file 

  const name = document.querySelector('#customer-name-register').value.trim();
  const email = document.querySelector('#customer-email-register').value.trim();
  const password = document.querySelector('#customer-password-register').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/user');
    } else {
      alert(response.statusText);
    }
  }
};

async function showReservation() {
  document.getElementById("reservationForm").add('hide');
  document.getElementById("bookedReservation").remove('hide');
}


document
  .querySelector('.user-login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.register-form')
  .addEventListener('submit', signupFormHandler);