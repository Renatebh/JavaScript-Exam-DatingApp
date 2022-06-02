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
  // displayCharacters(allCharacters);
}

// funksjonen for å vise characters
let charactersList = document.querySelector(".charactersList");
let matchCounterTxt = document.getElementById("match-counter-txt");
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
        matchCounterTxt.innerHTML = `${myMatchArray.length + 1}`;
        matchCharacter(array, i);
        deleteUser(i, array);
        initMap(myMatchArray, i);
      }
    });
  }
}

//
function deleteUser(i, array) {
  array.splice(i, 1);
  displayCharacters(array);
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

//funskjonene for å filtrere og vise single menn, kvinner og homofile

const displayFemaleBtn = document
  .getElementById("btn-female")
  .addEventListener("click", () => {
    renderData("female");
  });

const displayMaleBtn = document
  .getElementById("btn-male")
  .addEventListener("click", () => {
    renderData("male");
  });

const displayGay = document
  .getElementById("btn-gay")
  .addEventListener("click", () => {
    let randomGayArray = [];
    for (let i = 0; i < 50; i++) {
      let randomNumber = Math.floor(Math.random() * allCharacters.length);
      randomGayArray.push(allCharacters[randomNumber]);
    }
    displayCharacters(randomGayArray);
  });

const displayAll = document
  .getElementById("btn-all")
  .addEventListener("click", () => {
    displayCharacters(allCharacters);
  });

function renderData(gender) {
  userGender = allCharacters.filter(function (data) {
    return data.gender == gender;
  });
  displayCharacters(userGender);
}

//Funksjonen for å matche bruker å vise bruker

let myMatchArray = [];
function matchCharacter(array, i) {
  myMatchArray.unshift(array[i]);
  localStorage.setItem("myMatches", JSON.stringify(myMatchArray));
  let storedMatches = JSON.parse(localStorage.getItem("myMatches"));
}

let showMatchesBtn = document
  .getElementById("show-matches-btn")
  .addEventListener("click", () => {
    displayMatches(myMatchArray);
  });

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
    let profilePhone = document.createElement("p");
    let profileBtn = document.createElement("button");
    let profileBtnHide = document.createElement("button");
    let profileBtnDelete = document.createElement("button");

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
    profileBtnDelete.classList.add("profile-btn-delete");

    characterName.innerText =
      array[i].name.first + " " + array[i].name.last + " | " + array[i].gender;
    profileImg.src = array[i].picture.large;
    characterAge.innerText = "Age: " + array[i].dob.age;
    profileEmail.innerText = "📧 " + array[i].email;
    profileLocation.innerText = "📍 " + array[i].location.city;
    profilePhone.innerText = "📞" + array[i].phone;
    profileBtn.innerHTML = "Kart";
    profileBtnHide.innerHTML = "hide";
    profileBtnDelete.innerHTML = "Slett";

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
      profileBtnHide,
      profileBtnDelete
    );

    let map = document.querySelector(".map");
    let profileBtns = document.querySelectorAll(".profile-btn");
    profileBtns[i].addEventListener("click", () => {
      initMap();
      map.classList.remove("hide");
    });
    let profileBtnsHide = document.querySelectorAll(".profile-btn-hide");
    profileBtnsHide[i].addEventListener("click", () => {
      map.classList.add("hide");
    });
    let profileBtnsDelete = document.querySelectorAll(".profile-btn-delete");
    profileBtnsDelete[i].addEventListener("click", () => {
      deleteCharacter(i, array);
    });
  }
}

// få ut kart
function initMap() {
  console.log(myMatchArray);
  // map options

  for (let i = 0; i < myMatchArray.length; i++) {
    //new map
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
        lat: parseFloat(myMatchArray[i].location.coordinates.latitude),
        lng: parseFloat(myMatchArray[i].location.coordinates.longitude),
      },
      map: map,
      icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    });
  }
}

//funksjonen for å slette bruker
function deleteCharacter(i, array) {
  const userAnswear = prompt("vil du slette? skriv ja");
  if (userAnswear === "ja") {
    array.splice(i, 1);
    matchCounterTxt.innerHTML = `${myMatchArray.length}`;
  }
  displayCharacters(array);
}

loadCharacters();
