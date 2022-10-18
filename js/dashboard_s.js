// const connection=require('./database/connection');
// import {data} from "../views/dashboard_s.ejs"
const data = require('../views/dashboard_s.ejs')
function change() {
    var input = document.getElementById("filechooser");
    var fReader = new FileReader();
    fReader.readAsDataURL(input.files[0]);
    fReader.onloadend = function (event) {
        var img = document.getElementById("profilepic");
        img.src = event.target.result;
        img.style.width = '150px'
        img.style.height = '150px'
        img.style.display = 'block'
    }
}
document.getElementById('filechooser').onmouseover = function(){
    document.getElementById('blackfill').style.opacity = '0.3'
}
document.getElementById('filechooser').onmouseout= function(){
    document.getElementById('blackfill').style.opacity = '0'
}

// let data1 = "<%- data %>"
console.log(data)