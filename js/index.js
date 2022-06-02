function signup(e) {
  event.preventDefault();
  let email = document.getElementById("email").value;
  let username = document.getElementById("username").value;
  let pass = document.getElementById("password").value;
  let conPass = document.getElementById("con-password").value;
  let errorMessage = document.getElementById("error-message");

  let user = {
    email: email,
    username: username,
    password: pass,
  };

  let json = JSON.stringify(user);
  localStorage.setItem(username, json);
  console.log("user added");
  if (pass === conPass) {
    alert("Success, du kan nå logge inn!");
    window.location.href = "index.html";
  } else if (pass !== conPass) {
    errorMessage.innerText = "Passwords must be the same";
  }
}

function loginUser(e) {
  event.preventDefault();
  let username = document.getElementById("username").value;
  let pass = document.getElementById("password").value;
  let errorMessage = document.getElementById("error-message-login");

  let user = localStorage.getItem(username);

  let data = JSON.parse(user);
  console.log(data);

  if ((user = null)) {
    alert("wrong username");
  } else if (username == data.username && pass == data.password) {
    window.location.href = "findusers.html";
  } else {
    errorMessage.innerText = "Feil passord";
  }
}
