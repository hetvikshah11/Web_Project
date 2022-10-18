const express = require('express');
const app = express();
const path = require('path');
const connection = require('./database/connection');
const session = require('express-session');
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
connection.createSchema();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'Not a good secret' }));


app.use(express.static("./"));
app.set('view engine', 'ejs');
app.get('index.html/', (req, res) => {

    res.sendFile("/index.html")
})

app.post('/register', async (req, res) => {
    const First_name = req.body.fname;
    const Last_name = req.body.lname;
    const Birth_date = req.body.birthdate + '';
    const Phone = req.body.phone;
    const email = req.body.register_email;
    const password = req.body.register_password;
    const unique = await connection.isStudentUnique(email);
    if (unique) {
        await connection.insert(First_name, Last_name, Birth_date, Phone, email, password);

        // let result=await connection.showDbs();
        // result=JSON.parse(result);
        // console.log(result);
        res.send("Success");
    }
    else {
        res.send("User already exists")
    }

})
app.get('/dashboard_s', (req, res) => {
    res.sendFile(__dirname + "/dashboard_s.html");
})
app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);
    const result = JSON.parse(await connection.StudentId(email));
    req.session.user_id = result["_id"];
    module.exports.id=req.session.user_id 
    if (result) {
        console.log(req.session.user_id)
        res.redirect('/dashboard_s')
    }
    else {
        res.send("Incorrect email or password");
    }



})














app.listen(3000, () => {
    console.log('Listening at Port 3000');
})