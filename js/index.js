document.getElementById('login').onclick = function () {
    document.getElementsByClassName('login_page')[0].style.display = 'grid'
    document.querySelector('.outer').style.opacity = '0.2'
}
document.getElementById('cancel').onclick = function () {
    document.getElementsByClassName('login_page')[0].style.display = 'none'
    document.querySelector('.outer').style.opacity = '1'
}
document.getElementById('Sign_up').onclick = function () {
    document.getElementsByClassName('register_modal')[0].style.display = 'flex'
    document.querySelector('.outer').style.opacity = '0.2'
}
document.getElementById('cancel_register').onclick = function () {
    document.getElementsByClassName('register_modal')[0].style.display = 'none'
    document.querySelector('.outer').style.opacity = '1'
}
document.getElementById('login_signup').onclick = function(){
    document.getElementsByClassName('login_page')[0].style.display = 'none'
    document.getElementsByClassName('register_modal')[0].style.display = 'flex'
    document.querySelector('.outer').style.opacity = '0.2'
}

const subject_label = document.getElementById('subject_label')
const register_subject = document.getElementById('register_subject')
const lectures_label = document.getElementById('lectures_label')
const register_lectures = document.getElementById('register_lectures')
document.getElementById('register_student').onclick = function(){
    document.getElementById('optional').style.display = 'none'
}
document.getElementById('register_teacher').onfocus = function(){
    document.getElementById('optional').style.display = 'block'
}