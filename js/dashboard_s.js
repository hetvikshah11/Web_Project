function menu_item() {
    var element = event.target;
    home.classList.remove("active");
    courses.classList.remove("active");
    grades.classList.remove("active");
    tasks.classList.remove("active");
    materials.classList.remove("active");
    settings.classList.remove("active");
    home_content.style.display = "none";
    courses_content.style.display = "none";
    grades_content.style.display = "none";
    tasks_content.style.display = "none";
    materials_content.style.display = "none";
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
    } else if (element.id == materials.id) {
      materials.classList.add("active");
      materials_content.style.display = "block";
    } else if (element.id == settings.id) {
      settings.classList.add("active");
      settings_content.style.display = "block";
    }
  }
  

document.getElementById('filechooser').onmouseover = function(){
    document.getElementById('blackfill').style.opacity = '0.3'
}
document.getElementById('filechooser').onmouseout= function(){
    document.getElementById('blackfill').style.opacity = '0'
}

let rdata = null;
rdata = JSON.parse(document.getElementById('received_data').innerHTML);

if(rdata[0].Img_url){
    let pic=document.getElementById("profilepic");
    pic.style.width="100%";
    pic.style.height="100%"
    pic.src=rdata[0].Img_url;
}
else{
    let pic=document.getElementById("profilepic")
    pic.style.width="50%";
    pic.src="../images/camera.svg";
}

// console.log(document.getElementById("filechooser").value);
document.getElementById("upload_pic").style.display="none";

document.getElementById("filechooser").addEventListener('input',()=>{
    document.getElementById("upload_pic").style.display="block";
})