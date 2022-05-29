// add image to page
const imageInput = document.querySelector("#image-input");
var uploaded_image = "";

imageInput.addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploaded_image = reader.result;
    document.querySelector(
      "#display-image"
    ).style.backgroundImage = `url(${uploaded_image})`;
    document.querySelector(
      "#user-image"
    ).style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0]);
});

const deleteImage = document
  .querySelector("#deleteImage")
  .addEventListener("click", () => {
    document.querySelector("#display-image").style.backgroundImage = "none";
  });

// Show user information
const saveBtn = document
  .getElementById("save-btn")
  .addEventListener("click", showInformation);
let infoContainer = document.querySelector(".info-container");
let userContainer = document.querySelector(".user-container");

function showInformation() {
  userContainer.classList.remove("hide");
  infoContainer.classList.add("hide");
  //value from input
  let firstNameInput = document.getElementById("firstname-input").value;
  let lastNameInput = document.getElementById("lastname-input").value;
  let ageInput = document.getElementById("age-input").value;
  let genderInput = document.getElementById("gender-input").value;
  let locationInput = document.getElementById("city-input").value;
  let selectionInput = document.getElementById("interest-input").value;
  // elemnts
  document.getElementById("user-fname").innerText = `Name: ${firstNameInput}`;
  document.getElementById("user-lname").innerText = lastNameInput;
  document.getElementById("user-age").innerText = `Age: ${ageInput}`;
  document.getElementById("user-gender").innerText = `Gender: ${genderInput}`;
  document.getElementById("user-location").innerText = `City: ${locationInput}`;
  document.getElementById(
    "user-location"
  ).innerText = `Interest in: ${selectionInput}`;
}
let editBtn = document
  .getElementById("edit-btn")
  .addEventListener("click", () => {
    userContainer.classList.add("hide");
    infoContainer.classList.remove("hide");
  });
