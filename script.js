
// ========================================
// PMP ACADEMY - JAVASCRIPT
// ========================================


// COURSE INFORMATION

const courses = [
  {
    id: "math",
    name: "ปรับพื้นฐานคณิตม.ต้น",
    icon: "📐",
    tutor: "พี่อองรี พี่เนติภูมิ",
    description: "Build a strong mathematical foundation through explanations and practice."
  },
  {
    id: "physics",
    name: "ปรับพื้นฐานวิทย์ม.ต้น",
    icon: "⚡",
    tutor: "พี่ภวัต พี่ที พี่ต้นข้าว พี่ฮิม พี่อองรี พี่ภีม พี่กร",
    description: "Explore the principles of the physical world around us."
  },
  {
    id: "chemistry",
    name: "ปรับพื้นฐานภาษาอังกฤษม.ต้น",
    icon: "🧪",
    tutor: "พี่ภูมิ พี่เมเจอร์",
    description: "Understand matter, substances and the world of chemistry."
  },
  {
    id: "biology",
    name: "เตรียมสอบเข้าสอวนดาราศาสตร์ค่าย 1",
    icon: "🧬",
    tutor: "พี่ทีที",
    description: "Discover living organisms, cells and the human body."
  },
  {
    id: "astronomy",
    name: "เตรียมสอบเข้าม.1 โครงการห้องเรียนพิเศษ",
    icon: "🌎",
    tutor: "พี่ๆทุกคน",
    description: "Explore Earth, space, planets and our universe."
  },
  {
    id: "english",
    name: "ตะลุยโจทย์สอบเข้าม.1 โครงการห้องเรียนพิเศษ",
    icon: "📚",
    tutor: "พี่ๆทุกคน",
    description: "Develop English vocabulary, grammar, reading and communication."
  }
];


// NAVIGATION

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");

  document.querySelectorAll("nav a").forEach(link => {
    link.classList.toggle(
      "active",
      link.dataset.page === pageId
    );
  });

  document.getElementById("navigation").classList.remove("open");

  if (pageId === "your-courses") {
    renderEnrolledCourses();
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// MOBILE MENU

function toggleMenu() {
  document.getElementById("navigation").classList.toggle("open");
}


// COURSE CARD

function createCourseCard(course) {
  return `
    <div class="course-card">

      <div class="course-icon">${course.icon}</div>

      <h3>${course.name}</h3>

      <p>${course.description}</p>

      <div class="course-meta">
        Tutor: <strong>${course.tutor}</strong>
      </div>

      <div class="course-price">
        ฿198
        <span style="font-size:12px; color:#6b778c;">
          / semester
        </span>
      </div>

      <button class="btn btn-primary"
        onclick="addCourse('${course.id}')">
        Add to Your Courses
      </button>

    </div>
  `;
}


// DISPLAY COURSES

function renderCourses() {
  document.getElementById("allCourses").innerHTML =
    courses.map(createCourseCard).join("");

  document.getElementById("featuredCourses").innerHTML =
    courses.slice(0, 3).map(createCourseCard).join("");
}


// GET SAVED COURSES

function getEnrolledCourses() {
  try {
    return JSON.parse(
      localStorage.getItem("pmpCourses") || "[]"
    );
  } catch {
    return [];
  }
}


// ADD COURSE

function addCourse(courseId) {
  const selected = getEnrolledCourses();

  if (selected.includes(courseId)) {
    alert("You've already added this course!");
    return;
  }

  selected.push(courseId);

  localStorage.setItem(
    "pmpCourses",
    JSON.stringify(selected)
  );

  alert("Course added successfully!");

  renderEnrolledCourses();
}


// REMOVE COURSE

function removeCourse(courseId) {
  const selected = getEnrolledCourses()
    .filter(id => id !== courseId);

  localStorage.setItem(
    "pmpCourses",
    JSON.stringify(selected)
  );

  renderEnrolledCourses();
}


// DISPLAY STUDENT COURSES

function renderEnrolledCourses() {
  const selected = getEnrolledCourses();

  const container =
    document.getElementById("enrolledCourses");

  if (selected.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="big-icon">📖</div>

        <h3>No courses yet!</h3>

        <p>
          Explore our courses and add your first learning program.
        </p>

        <button class="btn btn-primary"
          onclick="showPage('courses')">
          Explore Courses
        </button>
      </div>
    `;

    return;
  }

  container.innerHTML = selected.map(id => {
    const course = courses.find(c => c.id === id);

    if (!course) return "";

    return `
      <div class="enrolled-item">

        <div>
          <h4>${course.icon} ${course.name}</h4>
          <p>Tutor: ${course.tutor}</p>
        </div>

        <button class="remove-btn"
          onclick="removeCourse('${course.id}')">
          Remove
        </button>

      </div>
    `;
  }).join("");
}


// INITIALIZE WEBSITE

renderCourses();
renderEnrolledCourses();
