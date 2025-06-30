// show all courses without login
// async function showCourses() {
//   const showC = await axios.get(
//     `http://localhost:${BACKEND_PORT}/course/courses`
//   );

//   document.getElementById("show-courses").innerHTML = showC.data;
// }
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
  const course = showC.data.show[0].courseId;
  const user = showC.data.show[0].userId;
  const id = showC.data.show[0]._id;

  document.getElementById("show-coursess").innerHTML = JSON.stringify(
    " Course ID: " + course + "<br>" + "User ID: " + user + "<br>" + "ID: " + id
  );
}
