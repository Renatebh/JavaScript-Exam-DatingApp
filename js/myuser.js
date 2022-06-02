let infoContainer = document.querySelector(".info-container");
let userContainer = document.querySelector(".user-container");
// add & save image
document.querySelector("#image-input").addEventListener("change", function () {
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    localStorage.setItem("recent-image", reader.result);
    // window.location.href = "myuser.html";
    const recentImageDataUrl = localStorage.getItem("recent-image");
    if (recentImageDataUrl) {
      document
        .querySelector("#user-image")
        .setAttribute("src", recentImageDataUrl);
      document
        .querySelector("#user-image-card")
        .setAttribute("src", recentImageDataUrl);
    }
  });
  reader.readAsDataURL(this.files[0]);
});
document.addEventListener("DOMContentLoaded", () => {
  const recentImageDataUrl = localStorage.getItem("recent-image");
  if (recentImageDataUrl) {
    document
      .querySelector("#user-image")
      .setAttribute("src", recentImageDataUrl);
    document
      .querySelector("#user-image-card")
      .setAttribute("src", recentImageDataUrl);
  }
});

// Show user information

function showInformation() {
  userContainer.classList.remove("hide");
  infoContainer.classList.add("hide");
}

const firstNameInput = document.querySelector("#firstname-input");
const firstName = document.querySelector("#first-name");
const lastNameInput = document.querySelector("#lastname-input");
const lastName = document.querySelector("#last-name");
const ageInput = document.querySelector("#age-input");
const age = document.querySelector("#age");
const genderInput = document.querySelector("#gender-input");
const gender = document.querySelector("#gender");
const cityInput = document.querySelector("#city-input");
const city = document.querySelector("#city");

const saveBtn = document.querySelector("#save-btn");
const storedFirstName = localStorage.getItem("firstname");
const storedLastName = localStorage.getItem("lastname");
const storedGender = localStorage.getItem("gender");
const storedCity = localStorage.getItem("city");
const storedAge = localStorage.getItem("age");

if (firstNameInput) {
  firstName.textContent = storedFirstName;
}

if (lastNameInput) {
  lastName.textContent = storedLastName;
}

if (genderInput) {
  gender.textContent = storedGender;
}

if (cityInput) {
  city.textContent = storedCity;
}
if (ageInput) {
  age.textContent = storedAge;
}

firstNameInput.addEventListener("input", (letter) => {
  firstName.textContent = letter.target.value;
});
lastNameInput.addEventListener("input", (letter) => {
  lastName.textContent = letter.target.value;
});
genderInput.addEventListener("input", (letter) => {
  gender.textContent = letter.target.value;
});
cityInput.addEventListener("input", (letter) => {
  city.textContent = letter.target.value;
});
ageInput.addEventListener("input", (letter) => {
  age.textContent = letter.target.value;
});

const saveToLocalStorage = () => {
  localStorage.setItem("firstname", firstName.textContent);
  localStorage.setItem("lastname", lastName.textContent);
  localStorage.setItem("gender", gender.textContent);
  localStorage.setItem("age", age.textContent);
  localStorage.setItem("city", city.textContent);

  console.log(age);
};

saveBtn.addEventListener("click", saveToLocalStorage);

function editUser() {
  userContainer.classList.add("hide");
  infoContainer.classList.remove("hide");
}
