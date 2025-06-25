// show all courses without login
async function showCourses() {
  const showC = await axios.get(
    `http://localhost:${BACKEND_PORT}/course/courses`
  );

  document.getElementById("show-courses").innerHTML = showC.data;
}
showCourses();
