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
    const loadCharacters = async () => {
      const res = await fetch(
        "https://randomuser.me/api/?results=200&inc=login"
      );
      charactersArray = await res.json();

      getAllCharacters(charactersArray);
    };
    loadCharacters();
  });
});

let allCharacters = [];
function getAllCharacters(array) {
  allCharacters = array.results;
  console.log(allCharacters);
  const userName = document.querySelector("#user-name").value;
  const password = document.querySelector("#password").value;

  for (let i = 0; i < allCharacters.length; i++) {
    if (
      userName == allCharacters[i].username &&
      password == allCharacters[i].password
    ) {
      window.location.href = "http://127.0.0.1:5500/index.html";
    }
  }
}

// const loginBtn = document
//   .querySelector("#login-btn")
//   .addEventListener("click", (e) => {
//     e.preventDefault();
//     console.log("hello");
//
//   });

const createLoginBtn = document
  .querySelector("#create-login-btn")
  .addEventListener("click", (e) => {
    e.preventDefault();
    console.log("hello");
    const password = document.querySelector("#createPassword").value;
    const confirmPassword = document.querySelector("#confirmPassword").value;

    if (password == confirmPassword) {
      window.location.href = "http://127.0.0.1:5500/index.html";
    }
  });
