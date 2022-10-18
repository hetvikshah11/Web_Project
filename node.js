const express = require('express');
const app = express();
const path = require('path');
const connection = require('./database/connection');
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

connection.createSchema();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./"));
app.set('view engine', 'ejs');
app.get('index.html/', (req, res) => {
    res.sendFile("index.html")
})


app.post('/register', async (req, res) => {
    const First_name = req.body.fname;
    const Last_name = req.body.lname;
    const Birth_date = req.body.birthdate + '';
    const Phone = req.body.phone;
    const Email = req.body.register_email;
    const Password = req.body.register_password;
    const Desig = req.body.register_desig;
    const sunique = await connection.isStudentUnique(Email);
    const tunique = await connection.isTeacherUnique(Email);
    if (sunique && tunique) {
        if(Desig==="student")
        {
            await connection.insertStudent(First_name, Last_name, Birth_date, Phone, Email, Password);
        }
        else
        {
            await connection.insertTeacher(First_name, Last_name, Birth_date, Phone, Email, Password)
        }
        res.send("Success");
    }
    else {
        res.send("User already exists")
    }
})

app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const sAvailable = await connection.studentAvailable(email,password);
    if (sAvailable) 
    {
        console.log('function called')
        const data1 = await connection.getStudentData({ "Email": email, "Password": password })
        res.render('dashboard_s.ejs', { data1 })
    }
    else
    {
        const tAvailable = await connection.teacherAvailable(email,password);
        if(tAvailable)
        {
            const data2 = await connection.getTeacherData({"Email":email, "Password":password})
            res.render('dashboard_t.ejs', { data2 })
        }
        else{
            res.send("No such user found");
        }
    }
})



app.listen(3000, () => {
    console.log('Listening at Port 3000');
})