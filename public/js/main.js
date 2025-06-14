async function signup() {
  console.log("hello");
  const username = document.getElementById("signU").value;
  const password = document.getElementById("signP").value;

  await axios.post(`http://localhost:${BACKEND_PORT}/user/signup`, {
    username,
    password,
  });
  alert("Account created");
}
function login() {}
