// show all courses without login
async function showCourses() {
  const showC = await axios.get(
    `http://localhost:${BACKEND_PORT}/course/courses`
  );
  document.getElementById("Cours").innerHTML = JSON.stringify(showC.data);
}
showCourses();
