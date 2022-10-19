function menu_item() {
  var element = event.target;
  home.classList.remove("active");
  courses.classList.remove("active");
  grades.classList.remove("active");
  tasks.classList.remove("active");
  calender.classList.remove("active");
  inbox.classList.remove("active");
  settings.classList.remove("active");
  home_content.style.display = "none";
  courses_content.style.display = "none";
  grades_content.style.display = "none";
  tasks_content.style.display = "none";
  calender_content.style.display = "none";
  inbox_content.style.display = "none";
  settings_content.style.display = "none";
  if (element.id == home.id) {
    home.classList.add("active");
    home_content.style.display = "block";
  } else if (element.id == courses.id) {
    courses.classList.add("active");
    courses_content.style.display = "block";
  } else if (element.id == grades.id) {
    grades.classList.add("active");
    grades_content.style.display = "block";
  } else if (element.id == tasks.id) {
    tasks.classList.add("active");
    tasks_content.style.display = "block";
  } else if (element.id == calender.id) {
    calender.classList.add("active");
    calender_content.style.display = "block";
  } else if (element.id == inbox.id) {
    inbox.classList.add("active");
    inbox_content.style.display = "block";
  } else if (element.id == settings.id) {
    settings.classList.add("active");
    settings_content.style.display = "block";
  }
}
