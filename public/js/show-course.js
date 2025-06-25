// show all courses without login
async function showCourses() {
  const showC = await axios.await(
    `http://localhost:${BACKEND_PORT}./routes/course`
  );

  document.getElementById("cousrses").innerHTML = showC.data;
}
showCourses();
