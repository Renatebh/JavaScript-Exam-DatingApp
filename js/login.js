document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login");
  const createAccountForm = document.querySelector("#createAccount");

  document
    .querySelector("#linkCreateAccount")
    .addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.classList.add("form--hidden");
      createAccountForm.classList.remove("form--hidden");
    });

  document.querySelector("#linkLogin").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("form--hidden");
    createAccountForm.classList.add("form--hidden");
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Preform Fetch login
  });
});

const loginBtn = document
  .querySelector("#loginBtn")
  .addEventListener("click", (e) => {
    e.preventDefault();
    console.log("hello");
    const password = document.querySelector("#createPassword").value;
    const confirmPassword = document.querySelector("#confirmPassword").value;

    if (password == confirmPassword) {
      window.location.href = "http://127.0.0.1:5500/index.html";
    }
  });
