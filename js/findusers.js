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
let charactersList = document.querySelector(".charactersList");
let matchCounterTxt = document.querySelector("#match-counter-txt");

function displayCharacters(array) {
  charactersList.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    let card = document.createElement("div");
    let profileTop = document.createElement("div");
    let profileImg = document.createElement("img");
    let profileBottom = document.createElement("div");
    let characterName = document.createElement("p");
    let matchBtn = document.createElement("button");
    let characterAge = document.createElement("p");
    let profileLocation = document.createElement("p");

    card.classList.add("card");
    profileTop.classList.add("profile-top");
    profileImg.classList.add("profile-img");
    profileTop.classList.add("profile-bottom");
    characterName.classList.add("character-name");
    characterAge.classList.add("character-age");
    profileLocation.classList.add("profile-location");
    matchBtn.classList.add("match-btn");

    profileImg.src = array[i].picture.large;
    characterName.innerText =
      array[i].name.first + " " + array[i].name.last + " | " + array[i].gender;
    characterAge.innerText = "Age: " + array[i].dob.age;
    profileLocation.innerText = "📍 " + array[i].location.city;
    matchBtn.innerText = "Match";

    charactersList.append(card);
    card.append(profileTop, profileBottom);
    profileTop.append(profileImg);
    profileBottom.append(
      characterName,
      characterAge,
      profileLocation,
      matchBtn
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
      }
    });
  }
}

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
    displayCharacters(filteredUsers);
  }
});

//funskjonene for å filtrere brukere på kjønn
let header = document.querySelector(".header");
const displayFemaleBtn = document
  .getElementById("btn-female")
  .addEventListener("click", () => {
    renderData("female");

    header.innerText = "Single jenter";
  });

const displayMaleBtn = document
  .getElementById("btn-male")
  .addEventListener("click", () => {
    renderData("male");

    header.innerText = "Single gutter";
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
    header.innerText = "Single homofile";
  });

const displayAll = document
  .getElementById("btn-all")
  .addEventListener("click", () => {
    displayCharacters(allCharacters);
    header.innerText = "Easydate";
  });

function renderData(gender) {
  userGender = allCharacters.filter(function (data) {
    return data.gender == gender;
  });
  displayCharacters(userGender);
}

//Funksjonene for å matche bruker å vise bruker
const myMatchArray = JSON.parse(localStorage.getItem("myMatches")) || [];
function matchCharacter(array, i) {
  myMatchArray.unshift(array[i]);
  localStorage.setItem("myMatches", JSON.stringify(myMatchArray));
  // initMap(array);
}

let showMatchesBtn = document
  .getElementById("show-matches-btn")
  .addEventListener("click", () => {
    displayMatches(myMatchArray);
  });

let matchList = document.querySelector(".match-list");
function displayMatches(array) {
  matchCounterTxt.innerHTML = `${myMatchArray.length}`;
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
    let mapBtn = document.createElement("button");
    let hideMapBnt = document.createElement("button");
    let deleteMatchBtn = document.createElement("button");

    card.classList.add("card");
    profileTop.classList.add("profile-top");
    profileTop.classList.add("profile-bottom");
    profileImg.classList.add("profile-img");
    characterName.classList.add("character-name");
    characterAge.classList.add("character-age");
    profileEmail.classList.add("profile-email");
    profileLocation.classList.add("profile-location");
    profilePhone.classList.add("profile-phone");
    mapBtn.classList.add("map-btn", "buttons");
    hideMapBnt.classList.add("hide-map-btn", "buttons");
    deleteMatchBtn.classList.add("profile-btn-delete", "buttons");

    characterName.innerText =
      array[i].name.first + " " + array[i].name.last + " | " + array[i].gender;
    profileImg.src = array[i].picture.large;
    characterAge.innerText = "Age: " + array[i].dob.age;
    profileEmail.innerText = "📧 " + array[i].email;
    profileLocation.innerText = "📍 " + array[i].location.city;
    profilePhone.innerText = "📞" + array[i].phone;
    mapBtn.innerHTML = "Se kart";
    hideMapBnt.innerHTML = "Gjem Kart";
    deleteMatchBtn.innerHTML = "Slett Match";

    charactersList.append(card);
    card.append(profileTop, profileBottom);
    profileTop.append(profileImg);
    profileBottom.append(
      characterName,
      characterAge,
      profileEmail,
      profilePhone,
      profileLocation,
      mapBtn,
      hideMapBnt,
      deleteMatchBtn
    );

    let map = document.querySelector(".map");
    let mapBtns = document.querySelectorAll(".map-btn");
    mapBtns[i].addEventListener("click", () => {
      for (let i = 0; i < array.length; i++) {
        initMap(array, i);
      }
      map.classList.remove("hide");
    });
    let hideMapBnts = document.querySelectorAll(".hide-map-btn");
    hideMapBnts[i].addEventListener("click", () => {
      map.classList.add("hide");
    });
    let deleteMatchBtns = document.querySelectorAll(".profile-btn-delete");
    deleteMatchBtns[i].addEventListener("click", () => {
      deleteCharacter(i, array);
    });
  }
}

// få ut kart
function initMap(array) {
  console.log(myMatchArray);
  for (let i = 0; i < myMatchArray.length; i++) {
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
    localStorage.setItem("myMatches", JSON.stringify(myMatchArray));

    // matchCounterTxt.innerHTML = `${myMatchArray.length}`;
  }
  displayMatches(array);
}

loadCharacters();
displayMatches(myMatchArray);
