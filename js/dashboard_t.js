let home = document.getElementById("home");
let grades = document.getElementById("grades");
let attendance = document.getElementById("attendance");
let notes = document.getElementById("notes");
let assignment = document.getElementById("assignment");

let home_content = document.getElementById("home_content");
let attendance_content = document.getElementById("attendance_content");
let notes_content = document.getElementById("notes_content");
let grades_content = document.getElementById("grades_content");
let assignment_content = document.getElementById("assignment_content");

function menu_click() {
  var element = event.target;
  home.classList.remove("active");
  grades.classList.remove("active");
  attendance.classList.remove("active");
  notes.classList.remove("active");
  assignment.classList.remove("active");
  home_content.style.display = "none";
  attendance_content.style.display = "none";
  notes_content.style.display = "none";
  grades_content.style.display = "none";
  assignment_content.style.display = "none";
  if (element.id == home.id) {
    home.classList.add("active");
    home_content.style.display = "flex";
    // home_content.classList.add('flex_class');
  } else if (element.id == attendance.id) {
    attendance.classList.add("active");
    attendance_content.style.display = "flex";
    attendance_content.classList.add('flex_class');
  } else if (element.id == notes.id) {
    notes.classList.add("active");
    notes_content.style.display = "flex";
    notes_content.classList.add('flex_class');
    
  } else if (element.id == grades.id) {
    grades.classList.add("active");
    grades_content.style.display = "flex";
    grades_content.classList.add('flex_class');

  } else if (element.id == assignment.id) {
    assignment.classList.add("active");
    assignment_content.style.display = "flex";
    assignment_content.classList.add('flex_class');

  }
}

document.getElementById("filechooser").onmouseover = function () {
  document.getElementById("blackfill").style.opacity = "0.3";
};
document.getElementById("filechooser").onmouseout = function () {
  document.getElementById("blackfill").style.opacity = "0";
};

let tdata = null;
tdata = JSON.parse(document.getElementById("teacher_data").innerHTML);
// console.log(tdata)

let sdata = null;
sdata = JSON.parse(document.getElementById("student_data").innerHTML);
// console.log(sdata)

if (tdata.Img_url) {
  let pic = document.getElementById("profilepic");
  pic.style.width = "100%";
  pic.style.height = "100%";
  pic.src = tdata.Img_url;
} else {
  let pic = document.getElementById("profilepic");
  pic.style.width = "50%";
  pic.src = "../images/camera.svg";
}
document.getElementById("upload_pic").style.display = "none";

document.getElementById("filechooser").addEventListener("input", () => {
  document.getElementById("upload_pic").style.display = "block";
});
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}
