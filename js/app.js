function signup(e) {
  event.preventDefault();
  let email = document.getElementById("email").value;
  let username = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  let user = {
    email: email,
    username: username,
    password: pass,
  };

  let json = JSON.stringify(user);
  localStorage.setItem(username, json);
  console.log("user added");
  window.location.href = "index.html";
}

function loginUser(e) {
  event.preventDefault();
  let username = document.getElementById("username").value;
  let pass = document.getElementById("password").value;
  let result = document.getElementById("result");

  let user = localStorage.getItem(username);

  let data = JSON.parse(user);
  console.log(data);

  if ((user = null)) {
    result.innerHTML = "wrong username";
  } else if (username == data.username && pass == data.password) {
    alert("Logg inn success!");
    window.location.href = "myuser.html";
  } else {
    alert("wrong password");
  }
}
