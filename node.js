const express = require('express');
const app = express();
const path = require('path');
const connection = require('./database/connection');
const session = require('express-session');
const { connect } = require('http2');
const multer = require('multer');
const storage = require('./cloudinary');
const upload = multer({ storage: storage })

app.use(session({ secret: 'Not a good secret' }));



app.use(express.json())
app.use(express.urlencoded({ extended: true }));

connection.createSchema();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./"));
app.set('view engine', 'ejs');



const middleware = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/')
    }
    else {
        next();
    }
}

app.post('/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect('/');
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get('/dashboard_s', middleware, async (req, res) => {
    let data = await connection.getData(req.session.user_id);
    // data=JSON.parse(data);
    res.render("dashboard_s", { data });
})
app.get("/dashboard_t",async(req,res)=>{
    let data_t = await connection.getData(req.session.user_id);
    let data_s = await connection.getStudentData({})
    res.render("dashboard_t",{data_t,data_s,data_t2:JSON.parse(data_t),data_s2:JSON.parse(data_s)});

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
        if (Desig === "student") {
            await connection.insertStudent(First_name, Last_name, Birth_date, Phone, Email, Password);
        }
        else {
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
    const sAvailable = await connection.studentAvailable(email, password);
    if (sAvailable) {
        let data = await connection.getStudentData({ "Email": email, "Password": password })
        const result = JSON.parse(await connection.StudentId(email));
        req.session.user_id = result["_id"];
        console.log(req.session.user_id);
        res.render('dashboard_s', { data });
    }
    else {
        const tAvailable = await connection.teacherAvailable(email, password);
        if (tAvailable) {
            let data_t = await connection.getTeacherData({ "Email": email, "Password": password })
            let data_s = await connection.getStudentData({})
            const result = JSON.parse(await connection.TeacherId(email));
            req.session.user_id = result["_id"];
            console.log(req.session.user_id);
            res.render('dashboard_t', {data_t,data_s,data_t2:JSON.parse(data_t),data_s2:JSON.parse(data_s)})
        }
        else {
            res.send("No such user found");
        }
    }
})
app.post("/prof_pic", storage.parser.single('img'), async (req, res) => {
    const result = await connection.updateStudentProfPic(req.session.user_id, req.file.path);
    const data = await connection.getData(req.session.user_id);
    // console.log(req.file.path);
    console.log(req.file.path);
    console.log(data);
    // res.render('dashboard_s', { data })
    res.redirect('/dashboard_s');
})

app.post('/teacher_pic',storage.parser.single('img'),async(req,res)=>{
    const result = await connection.updateTeacherProfPic(req.session.user_id, req.file.path);
    const data = await connection.getData(req.session.user_id);
    // console.log(req.file.path);
    console.log(req.file.path);
    // console.log(data);
    // res.render('dashboard_s', { data })
    res.redirect('/dashboard_t');

})
app.listen(3000, () => {
    console.log('Listening at Port 3000');
})