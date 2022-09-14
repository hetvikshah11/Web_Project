function change() {
    var input = document.getElementById("filechooser");
    var fReader = new FileReader();
    fReader.readAsDataURL(input.files[0]);
    fReader.onloadend = function (event) {
        var img = document.getElementById("profilepic");
        img.src = event.target.result;
        img.style.display = 'block'
        input.style.display = 'none'
    }
    
}