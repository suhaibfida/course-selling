function showSignup() {
  document.getElementById("signupSection").style.display = "block";
  document.getElementById("hideLogin").style.display = "none";
  document.getElementById("crb").style.display = "none";
  document.getElementById("arb").style.display = "block";

  // Login page
}
function showLogin() {
  document.getElementById("signupSection").style.display = "none";
  document.getElementById("hideLogin").style.display = "block";
  document.getElementById("arb").style.display = "none";
  document.getElementById("crb").style.display = "block";
}

async function signup() {
  const email = document.getElementById("signU").value;
  const password = document.getElementById("signP").value;
  const firstName = document.getElementById("signF").value;
  const lastName = document.getElementById("signL").value;

  await axios.post(`http://localhost:${BACKEND_PORT}/user/signup`, {
    email,
    password,
    firstName,
    lastName,
  });
  alert("Account created");
}
async function login() {
  const email = document.getElementById("loginU").value;
  const password = document.getElementById("loginP").value;

  const token = await axios.post(
    `http://localhost:${BACKEND_PORT}/user/login`,
    {
      email,
      password,
    }
  );
  if (token) {
    const tok = localStorage.setItem("token", token.data.token);
    alert("you are logged in");
    window.location.href = "/homepage.html";
  } else {
    alert("email or paswword is incorrect");
  }
}
// Purchases page
