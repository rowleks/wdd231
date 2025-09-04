const nav = document.getElementById("nav");
const menu = document.getElementById("menu");
const buttons = document.querySelectorAll(".courses-nav button");
const courseList = document.querySelector(".course-list");

document.getElementById("currentyear").innerHTML = new Date().getFullYear();

document.getElementById(
  "lastModified"
).innerHTML = `Last Modification: ${document.lastModified}`;

menu.addEventListener("click", () => {
  nav.classList.toggle("active");
  menu.classList.toggle("show");
});

const courses = [
  {
    code: "WDD 130",
    credit: 2,
  },
  {
    code: "WDD 131",
    credit: 2,
  },
  {
    code: "WDD 231",
    credit: 2,
  },
  {
    code: "CSE 110",
    credit: 2,
  },
  {
    code: "CSE 111",
    credit: 2,
  },
  {
    code: "CSE 210",
    credit: 2,
  },
];

function displayCourses(filter) {
  courseList.innerHTML = "";
  const filteredCourses =
    filter === "All"
      ? courses
      : courses.filter((course) => course.code.startsWith(filter));
  const totalCredits = filteredCourses.reduce(
    (sum, course) => sum + course.credit,
    0
  );
  filteredCourses.forEach((course) => {
    const courseItem = document.createElement("div");

    courseItem.className = "course-item";
    courseItem.innerHTML = `
      <span class="course-code">${course.code}</span>
        <span class="course-credit">${course.credit} Credits</span>
    `;
    courseList.appendChild(courseItem);
  });

  const totalItem = document.createElement("span");
  totalItem.className = "total-credits";
  totalItem.innerHTML = `Total credits for the courses listed above is: ${totalCredits}`;
  courseList.appendChild(totalItem);
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    buttons.forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
    const filter = button.textContent;
    displayCourses(filter);
  });
});

displayCourses("All");
