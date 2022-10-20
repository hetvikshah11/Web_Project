let home = document.getElementById('home')
let grades = document.getElementById('grades')
let attendance = document.getElementById('attendance')
let notes = document.getElementById('notes')
let settings = document.getElementById('settings')

let home_content = document.getElementById('home_content')
let attendance_content = document.getElementById('attendance_content')
let notes_content = document.getElementById('notes_content')
let grades_content = document.getElementById('grades_content')
let settings_content = document.getElementById('settings_content')

function menu_click() {
    var element = event.target;
    home.classList.remove("active");
    grades.classList.remove("active");
    attendance.classList.remove("active");
    notes.classList.remove("active");
    settings.classList.remove("active");
    home_content.style.display = "none";
    attendance_content.style.display = "none";
    notes_content.style.display = "none";
    grades_content.style.display = "none";
    settings_content.style.display = "none";
    if (element.id == home.id) {
        home.classList.add("active");
        home_content.style.display = "flex";
    }
    else if (element.id == attendance.id) {
        attendance.classList.add("active");
        attendance_content.style.display = "flex";
    }
    else if (element.id == notes.id) {
        notes.classList.add("active");
        notes_content.style.display = "flex";
    }
    else if (element.id == grades.id) {
        grades.classList.add("active");
        grades_content.style.display = "flex";
    }
    else if (element.id == settings.id) {
        settings.classList.add("active");
        settings_content.style.display = "flex";
    }
}


document.getElementById('filechooser').onmouseover = function () {
    document.getElementById('blackfill').style.opacity = '0.3'
}
document.getElementById('filechooser').onmouseout = function () {
    document.getElementById('blackfill').style.opacity = '0'
}

let rdata = null;
rdata = JSON.parse(document.getElementById('received_data').innerHTML);
console.log(rdata)
document.getElementById('welcome').innerHTML = 'Welcome ' + rdata.First_name;