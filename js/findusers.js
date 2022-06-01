let charactersArray = [];
const loadCharacters = async () => {
  const res = await fetch(
    "https://randomuser.me/api/?results=50&exc=cell,registered,nat"
  );

  charactersArray = await res.json();

  getAllCharacters(charactersArray);
};

let allCharacters = [];
function getAllCharacters(charactersArray) {
  allCharacters = charactersArray.results;
}

// funksjonen for å vise characters
let matchCounterTxt = document.getElementById("match-counter-txt");
let charactersList = document.querySelector(".charactersList");
function displayCharacters(array) {
  charactersList.innerHTML = "";

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

    let profileLocation = document.createElement("p");
    profileLocation.classList.add("profile-location");
    profileLocation.innerText = "📍 " + array[i].location.city;

    charactersList.append(card);
    card.append(profileTop, profileBottom);
    profileTop.append(profileImg);
    profileBottom.append(
      characterName,
      characterAge,
      // profileEmail,
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
        `Vil du lagre match? skriv ja 
       Dine matcher: ${myMatchArray.length} `
      );
      if (userAnswear === null) {
        return;
      }
      if (userAnswear.toLowerCase() == "ja") {
        matchCounterTxt.innerHTML = `${myMatchArray.length}`;
        matchCharacter(array, i);
        console.log(myMatchArray);
        deleteCharacter(i, array);
        matchBtn[i].classList.add("hide");
        initMap(myMatchArray, i);
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
        character.name.last.toLowerCase().includes(searchString) +
        character.dob.age.toString().includes(searchString) +
        character.location.city.toLowerCase().includes(searchString)
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
function matchCharacter(array, i) {
  myMatchArray.unshift(array[i]);
  // initMap(myMatchArray);
  // console.log("myMatchArray:", myMatchArray);
}
let showMatchesBtn = document
  .getElementById("show-matches-btn")
  .addEventListener("click", showMatches);

function showMatches() {
  displayMatches(myMatchArray);
  // initMap(myMatchArray);
}

let matchList = document.querySelector(".match-list");

function displayMatches(array) {
  charactersList.innerHTML = "";
  matchList.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    let card = document.createElement("div");
    let profileTop = document.createElement("div");
    let profileBottom = document.createElement("div");
    let profileImg = document.createElement("img");
    let characterName = document.createElement("p");
    let characterAge = document.createElement("p");
    let profileEmail = document.createElement("p");
    let profileLocation = document.createElement("p");
    let profileBtn = document.createElement("button");
    let profileBtnHide = document.createElement("button");
    let profilePhone = document.createElement("p");

    card.classList.add("card");
    profileTop.classList.add("profile-top");
    profileTop.classList.add("profile-bottom");
    profileImg.classList.add("profile-img");
    characterName.classList.add("character-name");
    characterAge.classList.add("character-age");
    profileEmail.classList.add("profile-email");
    profileLocation.classList.add("profile-location");
    profilePhone.classList.add("profile-phone");
    profileBtn.classList.add("profile-btn");
    profileBtnHide.classList.add("profile-btn-hide");

    characterName.innerText =
      array[i].name.first + " " + array[i].name.last + " | " + array[i].gender;
    profileImg.src = array[i].picture.large;
    characterAge.innerText = "Age: " + array[i].dob.age;
    profileEmail.innerText = "📧 " + array[i].email;
    profileLocation.innerText = "📍 " + array[i].location.city;
    profileBtn.innerHTML = "Kart";
    profileBtnHide.innerHTML = "hide";
    profilePhone.innerText = "📞" + array[i].phone;

    charactersList.append(card);
    card.append(profileTop, profileBottom);
    profileTop.append(profileImg);
    profileBottom.append(
      characterName,
      characterAge,
      profileEmail,
      profilePhone,
      profileLocation,
      profileBtn,
      profileBtnHide
    );

    let map = document.querySelector(".map");
    let profileBtns = document.querySelectorAll(".profile-btn");
    profileBtns[i].addEventListener("click", () => {
      initMap();
      map.classList.remove("hide");
    });
  }
  // kart
  let profileBtnHide = document.querySelectorAll(".profile-btn-hide");

  // for (let i = 0; i < profileBtn.length; i++) {
  //   profileBtn[i].addEventListener("click", () => {});
  // }

  for (let i = 0; i < profileBtnHide.length; i++) {
    profileBtnHide[i].addEventListener("click", () => {
      map.classList.add("hide");
    });
  }
}

// få ut kart
function initMap() {
  console.log(myMatchArray);
  // map options

  for (let i = 0; i < myMatchArray.length; i++) {
    //new map
    // let latitude = parseFloat(myMatchArray[i].location.coordinates.latitude);

    // let longitude = parseFloat(myMatchArray[i].location.coordinates.longitude);

    var options = {
      zoom: 6,
      center: {
        lat: parseFloat(myMatchArray[i].location.coordinates.latitude),
        lng: parseFloat(myMatchArray[i].location.coordinates.longitude),
      },
    };

    let map = new google.maps.Map(document.querySelector(".map"), options);
    let marker = new google.maps.Marker({
      position: {
        lat: parseFloat(myMatchArray[i].location.coordinates),
        lng: parseFloat(myMatchArray[i].location.coordinates.longitude),
      },
      map: map,
      icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    });
    console.log(latitude, longitude);
  }
}

//funksjonen for å slette bruker
function deleteCharacter(i, array) {
  // let userAnswear = prompt(
  //   "Do you want to delete this lover from your list? yes/no"
  // );
  // if (userAnswear.toLowerCase() == "yes") {
  array.splice(i, 1);
  matchCounterTxt.innerHTML = `${myMatchArray.length}`;

  displayCharacters(array);
}
loadCharacters();
