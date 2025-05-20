const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener('click', () =>{
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', () =>{
    container.classList.remove("sign-up-mode");
});

document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username_register').value;
    const password = document.getElementById('password_register').value;
    const email = document.getElementById('email_register').value;

    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password, email}),
    });

    if (response.status === 200){
      return location.href = response.url
    }
  });

