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
    let data_s = await connection.getData(req.session.user_id);
    let material=await connection.getAllMaterial()
    material=JSON.parse(material);
    // data=JSON.parse(data);
    let assignment=await connection.getAllAssignment()
    assignment=JSON.parse(assignment);
    res.render('dashboard_s', { data_s, data_s2: JSON.parse(data_s), material,assignment });
})

app.get("/dashboard_t", async (req, res) => {
    let data_t = await connection.getData(req.session.user_id);
    let data_s = await connection.getStudentData({})
    let material=await connection.getMaterial(await connection.getSubjectName(req.session.user_id))
    material=JSON.parse(material);
    let assignment=await connection.getAssignment(await connection.getSubjectName(req.session.user_id))
    assignment=JSON.parse(assignment);
    res.render("dashboard_t", { data_t, data_s, data_t2: JSON.parse(data_t), data_s2: JSON.parse(data_s),material,assignment});
})

app.post('/register', async (req, res) => {
    const First_name = req.body.fname;
    const Last_name = req.body.lname;
    const Birth_date = req.body.birthdate + '';
    const Phone = req.body.phone;
    const Email = req.body.register_email;
    const Password = req.body.register_password;
    const Desig = req.body.register_desig;
    const Subject = req.body.subject_name;
    const Lectures = req.body.lecture_count;
    const sunique = await connection.isStudentUnique(Email);
    const tunique = await connection.isTeacherUnique(Email);
    console.log(Lectures);
    if (sunique && tunique) {
        if (Desig === "student") {
            await connection.insertStudent(First_name, Last_name, Birth_date, Phone, Email, Password);
        }
        else {
            await connection.insertTeacher(First_name, Last_name, Birth_date, Phone, Email, Password, Subject, Lectures)
            await connection.addSubject(Subject, Lectures);

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
        let data_s = await connection.getStudentData({ "Email": email, "Password": password })
        const result = JSON.parse(await connection.StudentId(email));
        req.session.user_id = result["_id"];
        console.log(req.session.user_id);
        let material=await connection.getAllMaterial()
    material=JSON.parse(material);
    let assignment=await connection.getAllAssignment()
    assignment=JSON.parse(assignment);
        res.render('dashboard_s', { data_s, data_s2: JSON.parse(data_s), material,assignment });
    }
    else {
        const tAvailable = await connection.teacherAvailable(email, password);
        if (tAvailable) {
            let data_t = await connection.getTeacherData({ "Email": email, "Password": password })
            let data_s = await connection.getStudentData({});
            const result = JSON.parse(await connection.TeacherId(email));
            req.session.user_id = result["_id"];
            console.log(req.session.user_id);
            let material=await connection.getMaterial(await connection.getSubjectName(req.session.user_id));
            material=JSON.parse(material);
            let assignment=await connection.getAssignment(await connection.getSubjectName(req.session.user_id))
           assignment=JSON.parse(assignment);
            res.render('dashboard_t', { data_t, data_s, data_t2: JSON.parse(data_t), data_s2: JSON.parse(data_s),material,assignment })
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

app.post('/teacher_pic', storage.parser.single('img'), async (req, res) => {
    const result = await connection.updateTeacherProfPic(req.session.user_id, req.file.path);
    const data = await connection.getData(req.session.user_id);
    // console.log(req.file.path);
    console.log(req.file.path);
    // console.log(data);
    // res.render('dashboard_s', { data })
    res.redirect('/dashboard_t');

})


app.post('/grades', async (req, res) => {
    const marks = req.body.marks;
    const id = req.body.id;
    const subject = await connection.getSubjectName(req.session.user_id);
    await connection.addGrades(subject, marks, id);
    res.redirect('/dashboard_t')
})

app.post('/attendance', async (req, res) => {
    await connection.addLectureConducted(req.session.user_id)
    const ifattended = req.body.attended;
    const id = req.body.id;
    // const subject = await connection.getSubjectName(req.session.user_id);/
    // console.log(if_attended,id);
    console.log(typeof (ifattended))
    const subject = await connection.getSubjectName(req.session.user_id);
    if (typeof (ifattended) === "string") 
    {
        await connection.markAttendance(subject,ifattended)
    }
    else if(typeof(ifattended)==="undefined")
    {
        console.log('no attendance')
    }
    else {
        i = 0; // represents if_attended
        j = 0; // represents id
        console.log(typeof (ifattended))
        for (ids of id) {
            if (ifattended[i] === id[j]) {
                await connection.markAttendance(subject,ifattended[i])
                i++;
                j++;
                // console.log('present')
            }
            else {
                j++;
            }
        }
    }
     res.redirect('/dashboard_t')


})

app.post('/material', async (req, res) => {
    const subject = await connection.getSubjectName(req.session.user_id);
    const link=req.body.URL;
    const name=req.body.File_name;
    console.log(link);
   await connection.insertMaterial(subject,link,name);
    res.redirect('/dashboard_t');
})

app.post('/assignment', async (req, res) => {
    const subject = await connection.getSubjectName(req.session.user_id);
    const link=req.body.URL;
    const name=req.body.File_name;
    console.log(link);
   await connection.uploadAssignment(subject,link,name);
    res.redirect('/dashboard_t');
})


app.listen(3000, () => {
    console.log('Listening at Port 3000');
})