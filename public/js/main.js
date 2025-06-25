// show signup
function showSignup() {
  document.getElementById("signupSection").style.display = "block";
  document.getElementById("hideLogin").style.display = "none";
  document.getElementById("crb").style.display = "none";
  document.getElementById("arb").style.display = "block";
}
function showLogin() {
  document.getElementById("signupSection").style.display = "none";
  document.getElementById("hideLogin").style.display = "block";
  document.getElementById("arb").style.display = "none";
  document.getElementById("crb").style.display = "block";
}
// login page & signup page
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
    localStorage.setItem("token", token.data.token);
    alert("you are logged in");
    window.location.href = "/user-homepage.html";
    showCourses();
  } else {
    alert("email or paswword is incorrect");
  }
}
// show user courses on homepage
async function showCourses() {
  const showC = await axios.post(
    `http://localhost:${BACKEND_PORT}/user/preview`,
    {},
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
  document.getElementById("show-courses").innerHTML = showC.data;
}
// purchase a courses
async function purchase() {
  await axios.post(
    `http://localhost:${BACKEND_PORT}/course/purchase`,
    {
      courseId: document.getElementById("course-id").value,
    },
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
  alert("course bought successfully");
}
// --------------------------------------ADMIN PAGE---------------------------------------------

// --------signup--------
async function signup() {
  const email = document.getElementById("admin-username").value;
  const password = document.getElementById("admin-password").value;
  const firstName = document.getElementBiId("admin-firstname").value;
  const lastName = document.getElementById("admin-lastname").value;
  await axios.post(`http://localhost:${BACKEND_PORT}/admin/signup`, {
    email,
    password,
    firstName,
    lastName,
  });
}
// -------login--------
async function login() {
  const username = document.getElementById("username").value;
  const password = documednt.getElementById("password").value;
  const token = await axios.fetch(
    `http://localhost${BACKEND_PORT}/admin/login`,
    {
      username,
      password,
    }
  );
  if (token) {
    localStorage.setItem("token", token.data.token);
    alert("You are logged in successfully");
    windows.location.href = "admin-courses";
    showAdminCourses();
  } else {
    alert("email or password is not correct");
  }
}
// create course
async function createCourse() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const imageUrl = document.getElementById("imageURL").value;
  await axios.post(
    `http://localhost:${BACKEND_PORT}/admin/createcourse`,
    {
      headers: localStorage.getItem("token", token.data.token),
    },
    { title, description, price, imageUrl }
  );
  alert("CourseCreated Successfully");
}
async function editCourse() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const imageUrl = document.getElementById("imageURL").value;
  await axios.post(
    `http://localhost:${BACKEND_PORT}/admin/edit`,
    {
      headers: localstorage.getItem("token", token.data.token),
    },
    { title, description, price, imageUrl }
  );
  alert("course edited successfully");
}
