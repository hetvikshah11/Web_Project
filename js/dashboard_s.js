document.getElementById('filechooser').onmouseover = function(){
    document.getElementById('blackfill').style.opacity = '0.3'
}
document.getElementById('filechooser').onmouseout= function(){
    document.getElementById('blackfill').style.opacity = '0'
}

let rdata = null;
rdata = JSON.parse(document.getElementById('received_data').innerHTML);
// console.log(rdata[0].Last_name)
// console.log(rdata);
document.getElementById('welcome').innerHTML = 'Welcome '+rdata[0].First_name;

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

console.log(document.getElementById("filechooser").value);
document.getElementById("upload_pic").style.display="none";

document.getElementById("filechooser").addEventListener('input',()=>{
    document.getElementById("upload_pic").style.display="block";
})