// let charactersArray = [];

const loadCharacters = async () => {
  const res = await fetch(
    "https://randomuser.me/api/?results=200&exc=cell,registered,nat"
  );
  charactersArray = await res.json();

  getAllCharacters(charactersArray);
  console.log("charactersarray: ", charactersArray);
};
let allCharacters = [];
function getAllCharacters(array) {
  allCharacters = array.results;

  // console.log("allCharacters", allCharacters);
}

// funksjonen for å vise characters
let matchCounterTxt = document.getElementById("match-counter-txt");
let charactersList = document.querySelector(".charactersList");
function displayCharacters(array) {
  charactersList.innerHTML = "";
  // let numberOfMatches = 0;

  for (let i = 0; i < array.length; i++) {
    //Buttons cards
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerText = "No match";
    deleteBtn.addEventListener("click", () => {
      deleteCharacter(i, array);
    });

    let matchBtn = document.createElement("button");
    matchBtn.classList.add("match-btn");
    matchBtn.innerText = "Match";

    // elemntene i kortene
    let card = document.createElement("div");
    card.classList.add("card");

    let profileTop = document.createElement("div");
    profileTop.classList.add("profile-top");
    let profileBottom = document.createElement("div");
    profileTop.classList.add("profile-bottom");

    let profileImg = document.createElement("img");
    profileImg.classList.add("profile-img");
    profileImg.src = array[i].picture.large;

    let characterName = document.createElement("p");
    characterName.classList.add("character-name");
    characterName.innerText =
      array[i].name.first + " " + array[i].name.last + " | " + array[i].gender;

    let characterAge = document.createElement("p");
    characterAge.classList.add("character-age");
    characterAge.innerText = "Age: " + array[i].dob.age;

    let profileEmail = document.createElement("p");
    profileEmail.classList.add("profile-email");
    profileEmail.innerText = "📧 " + array[i].email;

    let profileLocation = document.createElement("p");
    profileLocation.classList.add("profile-location");
    profileLocation.innerText = "📍 " + array[i].location.city;

    charactersList.append(card);
    card.append(profileTop, profileBottom);
    profileTop.append(profileImg);
    profileBottom.append(
      characterName,
      characterAge,
      profileEmail,
      profileLocation,
      matchBtn,
      deleteBtn
    );
  }

  // Hente match button og sende bruker til matcharray
  let matchBtn = document.querySelectorAll(".match-btn");
  for (let i = 0; i < matchBtn.length; i++) {
    matchBtn[i].addEventListener("click", () => {
      let userAnswear = prompt(
        `Vil du lagre match? ja/nei 
        Dine matcher: ${myMatchArray.length} `
      );
      if (userAnswear.toLowerCase() == "ja") {
        matchCounterTxt.innerHTML = `${myMatchArray.length + 1}`;
        matchCharacter(i, array);
        deleteCharacter(i, array);
        matchBtn[i].classList.add("hide");
      } else if (userAnswear.toLowerCase() == "nei") {
        console.log("matchbtnarray;", array[(i, 1)]);
        // matchBtn[i].classList.add("hide");
      } else {
        alert("Du må skrive ja for å lagre");
      }
    });
  }
}

// function for searching for users

const searchBar = document.querySelector("#searchbar");

searchBar.addEventListener("keyup", (e) => {
  let searchString = e.target.value.toLowerCase();
  if (e.target.value === "") {
    charactersList.innerHTML = "";
  } else {
    let filteredUsers = allCharacters.filter((character) => {
      return (
        character.name.first.toLowerCase().includes(searchString) +
        character.name.last.toLowerCase().includes(searchString)
      );
    });
    // console.log(filteredUsers);
    displayCharacters(filteredUsers);
  }
});

//funskjonene for å filtrere og vise single menn, kvinner og gay

const displayFemaleBtn = document
  .getElementById("btn-female")
  .addEventListener("click", filterGenderFemale);

const displayMaleBtn = document
  .getElementById("btn-male")
  .addEventListener("click", filterGenderMale);

const diplayGay = document
  .getElementById("btn-gay")
  .addEventListener("click", filterRandomGays);

let femaleArray = [];
function filterGenderFemale() {
  femaleArray = allCharacters.filter(function (data) {
    return data.gender == "female";
  });
  displayCharacters(femaleArray);
  // console.log("femalearray", femaleArray);
}

let maleArray = [];
function filterGenderMale() {
  maleArray = allCharacters.filter(function (data) {
    return data.gender == "male";
  });
  displayCharacters(maleArray);
  // console.log("malearray", maleArray);
}

function filterRandomGays() {
  let randomGayArray = [];
  for (let i = 0; i < 50; i++) {
    let randomNumber = Math.floor(Math.random() * allCharacters.length);
    randomGayArray.push(allCharacters[randomNumber]);
  }
  displayCharacters(randomGayArray);
}

//Funksjonen for å matche bruker å vise bruker

let myMatchArray = [];
function matchCharacter(i, array) {
  myMatchArray.unshift(array[i]);

  console.log("myMatchArray:", myMatchArray);
}
let showMatchesBtn = document
  .getElementById("show-matches-btn")
  .addEventListener("click", showMatches);

function showMatches() {
  displayCharacters(myMatchArray);
}

//funksjonen for å slette bruker

function deleteCharacter(i, array) {
  // let userAnswear = prompt(
  //   "Do you want to delete this lover from your list? yes/no"
  // );
  // if (userAnswear.toLowerCase() == "yes") {
  array.splice(i, 1);
  matchCounterTxt.innerHTML = `${myMatchArray.length}`;
  // }
  console.log(array);

  displayCharacters(array);
}
loadCharacters();
