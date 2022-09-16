const login_email = document.getElementById("login_email");

// const password_regex = /{6,}/;
const login_email_regex = /^[^@$%&_0-9]{1,}\@(gmail|yahoo)(.com|.in|.co.in)$/;

login_email.addEventListener("blur", () => {
  const check = login_email.value.match(login_email_regex);
  if (!check) {
    alert("Enter a valid email");
    login_email.value = "";
  }
});
login_password.addEventListener("blur", () => {
  if (login_password.value.length < 6) {
    alert("Password length should be atleast 6 characters");
    login_password.value = "";
  }
});