const register_email = document.getElementById("register_email");
const register_password = document.getElementById("register_password");
const phone = document.getElementById("phone");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const register_email_regex =
  /^[^@$%&_0-9][0-9a-zA-Z]{1,}@(gmail|yahoo)(.com|.in|.co.in)$/;
const phone_regex = /^[6-9][0-9]{9}$/;
register_email.addEventListener("blur", () => {
  const check = register_email.value.match(register_email_regex);
  if (!check) {
    alert("Enter a valid email");
    login_email.value = "";
  }
});
register_password.addEventListener("blur", () => {});

phone.addEventListener("blur", () => {
  const check = phone.value.match(phone_regex);
  if (!check) {
    alert("Please enter a valid a phone number");
    login_email.value = "";
  }
});
