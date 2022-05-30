//Start spill
const quest1 = document.querySelector(".quest-one");
const quest2 = document.querySelector(".quest-two");
const quest3 = document.querySelector(".quest-tree");
const start = document.querySelector(".start-game");
const tryAgain = document.querySelector(".try-again");

//spm 1
document.querySelector(".start-game").addEventListener("click", () => {
  quest1.classList.remove("hide");
});
//spm 2
document.querySelector(".show-quest2").addEventListener("click", () => {
  quest1.classList.add("hide");
  quest2.classList.remove("hide");
});
//spm 3
document.querySelector(".show-quest3").addEventListener("click", () => {
  quest2.classList.add("hide");
  quest3.classList.remove("hide");
});

document
  .getElementById("show-celebrity")
  .addEventListener("click", loadCelebrity);

// vise kjendis
function loadCelebrity() {
  let userName = prompt("hva er ditt navn?");
  if (!userName) {
    userName = "Fyflate";
  }

  // hente json.data
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "./json/celebrity.json", true);

  xhr.onload = function () {
    if (this.status == 200) {
      let celebrity = JSON.parse(this.responseText);

      // få en tilfeldig kjendis
      let randomCelebrity = [];
      for (let i = 0; i < celebrity.length; i++) {
        let random = Math.floor(Math.random() * celebrity.length);
        randomCelebrity.push(celebrity[random]);
      }

      //display kjendis
      var output = "";

      for (var i in celebrity) {
        output = `<div class="celebrity-card">
        <img src= "${randomCelebrity[i].image}" alt="bildet av en kjendis" class="celebrity-img">
        <div class="card-info">
        <h2 class="card-name">${randomCelebrity[i].name}</h2>
        <p class="card-txt">${userName}, ${randomCelebrity[i].text}</p>
        </div>
        </div>`;
      }
      document.querySelector(".celebrity-container").innerHTML = output;
    }
  };

  xhr.send();

  quest3.classList.add("hide");
  tryAgain.classList.remove("hide");
  start.classList.add("hide");
}

//prøv igjen
tryAgain.addEventListener("click", () => {
  window.location.href = "celebritymatch.html";
});
