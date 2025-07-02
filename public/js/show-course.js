// show courses ( login )
showCourses();
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

  document.getElementById("show-coursess").innerHTML = JSON.stringify(
    showC.data
  );
}
