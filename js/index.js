document.getElementById('login').onclick = function(){
    document.getElementsByClassName('login_page')[0].style.display = 'grid'
    document.querySelector('.outer').style.opacity = '0.2'
}
document.getElementById('cancel').onclick = function(){
    document.getElementsByClassName('login_page')[0].style.display = 'none'
    document.querySelector('.outer').style.opacity = '1'
}
document.getElementById('Sign_up').onclick = function(){
    document.getElementsByClassName('register_modal')[0].style.display = 'flex'
    document.querySelector('.outer').style.opacity = '0.2'
}
document.getElementById('cancel_register').onclick = function(){
    document.getElementsByClassName('register_modal')[0].style.display = 'none'
    document.querySelector('.outer').style.opacity = '1'
}